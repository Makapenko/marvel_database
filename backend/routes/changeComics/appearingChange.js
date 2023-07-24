const modelComics = require('../../db/models/comics')

async function changeComicsInfo(req, res) {
  const allComics = await modelComics.find()
  
  for (const comic of allComics) {
    let appearancesArr = []

    allComics.categories.forEach(el =>
      appearancesArr.push(el.startsWith('Appearing in ')).slice(13).slice(1, -1)
      )



    await modelComics.updateOne(
      { _id: comic.id },
      {
        ...comicData,
        yearandmonth: yearAndMonth,
      }
    )
  }
}
module.exports = { changeComicsInfo }

// function parseSections(data) {
//   return data.parse.sections
//     .filter(section => section.line.startsWith('Appearing in '))
//     .map(section => section.line.slice(13))
// }

// Удаляем кавычки в sections
// for (const comic of allComics) {
//   const cleanedSections = comic.sections.map(section => {
//     return section.slice(1, -1)
//   })
//   await modelComics.updateOne(
//     { _id: comic.id },
//     { sections: cleanedSections }
//   )
// }
