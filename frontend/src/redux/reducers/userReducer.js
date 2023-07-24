const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const ADD_COMIC_TO_USERLIST = 'ADD_COMIC_TO_USERLIST'
const REMOVE_COMIC_FROM_USERLIST = 'REMOVE_COMIC_FROM_USERLIST'

const initialState = {
  readComics: [],
}

function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN: {
      return { ...state, readComics: [...state.readComics, action.payload] }
    }

    case LOGOUT: {
      return { ...state, readComics: [] }
    }

    case ADD_COMIC_TO_USERLIST: {
      return {
        ...state,
        readComics: [...state.readComics, action.payload],
      }
    }

    case REMOVE_COMIC_FROM_USERLIST:
      return {
        ...state,
        readComics: state.readComics.filter(
          comic => comic._id !== action.payload
        ),
      }

    default:
      return state
  }
}

export default userReducer

export const loginAC = payload => {
  return dispatch => {
    dispatch({
      type: LOGIN,
      payload: payload,
    })
  }
}

export const logoutAC = () => {
  return dispatch => {
    dispatch({
      type: LOGOUT,
    })
  }
}

export const addComicToUserListAC = (userId, comicId) => {
  return async dispatch => {
    try {
      const response = await fetch(
        `http://localhost:3000/users/${userId}/comics/${comicId}`,
        {
          method: 'PUT',
        }
      )

      if (!response.ok) {
        throw new Error('Failed to add comic to user list')
      }

      dispatch({ type: ADD_COMIC_TO_USERLIST, payload: comicId })
    } catch (error) {
      console.error(error)
    }
  }
}

export const removeComicFromUserListAC = (userId, comicId) => {
  return async dispatch => {
    try {
      const response = await fetch(
        `http://localhost:3000/users/${userId}/comics/${comicId}`,
        {
          method: 'DELETE',
        }
      )

      if (!response.ok) {
        throw new Error('Failed to remove comic from user list')
      }

      dispatch({ type: REMOVE_COMIC_FROM_USERLIST, payload: comicId })
    } catch (error) {
      console.error(error)
    }
  }
}
