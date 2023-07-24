const modelComics = require('../../db/models/comics')

async function changeComicsInfo(req, res) {
  const allComics = await modelComics.find()

  const months = [
    ',_January',
    ',_February',
    ',_March',
    ',_April',
    ',_May',
    ',_June',
    ',_July',
    ',_August',
    ',_September',
    ',_October',
    ',_November',
    ',_December',
  ]

  const categoryTypes = {
    '/Appearances': 'appearances',
    '/Minor_Appearances': 'minorAppearances',
    '/Mentions': 'mentions',
    '/Cover_Artist': 'coverArtist',
    '/Editor-in-Chief': 'editorInChief',
    '/Writer': 'writer',
    '/Penciler': 'penciler',
    '/Inker': 'inker',
    '/Letterer': 'letterer',
    '/Editor': 'editor',
    '/Colorist': 'colorist',
    '/Reprints': 'reprintsArr',
  }

  for (const comic of allComics) {
    const comicData = {
      appearances: [],
      minorAppearances: [],
      mentions: [],
      coverArtist: [],
      editorInChief: [],
      writer: [],
      penciler: [],
      inker: [],
      letterer: [],
      editor: [],
      colorist: [],
      reprintsArr: [],
    }

    let yearAndMonth

    const filteredCategories = comic.categories.filter(category => {
      let categoryProcessed = false

      for (const categoryType in categoryTypes) {
        if (category.includes(categoryType)) {
          comicData[categoryTypes[categoryType]].push(
            category.slice(0, -categoryType.length)
          )
          categoryProcessed = true
          break
        }
      }

      for (const [index, month] of months.entries()) {
        if (
          category.includes(month) &&
          category.length === month.length + 4 + 11
        ) {
          const zero = index < 9 ? '0' : ''
          yearAndMonth = category.slice(0, 4) + zero + String(index + 1)
          categoryProcessed = true
          break
        }
      }

      return !categoryProcessed
    })

    await modelComics.updateOne(
      { _id: comic.id },
      {
        ...comicData,
        yearandmonth: yearAndMonth,
        // categories: filteredCategories, //!!!! Отключил, чтобы не удалялись данные сохраненные в других строках
      }
    )
  }

  // await modelComics.aggregate([
  //   {
  //     $addFields: {
  //       reprints: {
  //         $cond: [
  //           {
  //             $and: [
  //               { $in: ['Reprints', '$categories'] },
  //               { $eq: ['$appearances', []] },
  //             ],
  //           },
  //           true,
  //           false,
  //         ],
  //       },
  //     },
  //   },
  //   {
  //     $out: 'comics',
  //   },
  // ])

  res.redirect('/')
}

module.exports = { changeComicsInfo }
