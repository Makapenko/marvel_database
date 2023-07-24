const COMICS_FROM_DB = 'COMICS_FROM_DB'
const COMICS_FILTERED = 'COMICS_FILTERED'
const COMICS_REPRINTS_FILTER = 'COMICS_REPRINTS_FILTER'
const COMICS_NOT_MARVEL_FILTER = 'COMICS_NOT_MARVEL_FILTER'
const CLEAR_FILTERED_COMICS = 'CLEAR_FILTERED_COMICS'

const initialState = {
  selectedFilters: [],
  comicsList: [],
  comicsListFiltered: [],
  showReprints: false,
  showNotMarvel: false,
}

function applyFilters(state, newFilter) {
  const { comicsList, showReprints, showNotMarvel } = state
  return comicsList.filter(comic => {
    const filterMatches = newFilter.every(f => comic.appearances.includes(f))
    const reprintsFilter = showReprints || !comic.reprints
    const notMarvelFilter = showNotMarvel || !comic.notMarvel

    return filterMatches && reprintsFilter && notMarvelFilter
  })
}

function comicsReducer(state = initialState, action) {
  switch (action.type) {
    case COMICS_FROM_DB: {
      const newComicsList = [...state.comicsList, ...action.payload]
      const comicsListFiltered = applyFilters(
        { ...state, comicsList: newComicsList },
        state.selectedFilters
      )

      return {
        ...state,
        comicsList: newComicsList,
        comicsListFiltered: comicsListFiltered,
      }
    }

    case CLEAR_FILTERED_COMICS: {
      return {
        ...state,
        comicsList: [],
        comicsListFiltered: [],
      }
    }

    case COMICS_FILTERED:
    case COMICS_REPRINTS_FILTER:
    case COMICS_NOT_MARVEL_FILTER: {
      const newState = { ...state }

      if (action.type === COMICS_FILTERED) {
        newState.selectedFilters = action.payload
      } else if (action.type === COMICS_REPRINTS_FILTER) {
        newState.showReprints = action.payload
      } else {
        newState.showNotMarvel = action.payload
      }

      newState.comicsListFiltered = applyFilters(newState, newState.selectedFilters)

      return newState
    }

    default:
      return state
  }
}

export const fetchYear = year => {
  return dispatch => {
    fetch(`http://localhost:3001/showComics?year=${year}`)
      .then(res => res.json())
      .then(data => {
        dispatch({
          type: COMICS_FROM_DB,
          payload: data,
        })
      })
  }
}

export const clearYears = () => {
  return dispatch => {
    dispatch({
      type: CLEAR_FILTERED_COMICS,
    })
  }
}

export const filterComics = filters => {
  return (dispatch, getState) => {
    dispatch({
      type: COMICS_FILTERED,
      payload: filters,
    })
  }
}

export const toggleReprintsFilter = isChecked => {
  return (dispatch, getState) => {
    dispatch({
      type: COMICS_REPRINTS_FILTER,
      payload: isChecked,
    })
  }
}

export const toggleNotMarvelFilter = isChecked => {
  return (dispatch, getState) => {
    dispatch({
      type: COMICS_NOT_MARVEL_FILTER,
      payload: isChecked,
    })
  }
}

export default comicsReducer
