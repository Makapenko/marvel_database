  //// Для удаления из бд всех комиксов за 2019 год
  let i = await modelComics.find({ categories: { $elemMatch: { $eq: '2019' } } })
  console.log(i)
  for (let k = 0; k < i.length; k++) {
    console.log(i[k].id)
    await modelComics.deleteOne({ _id: i[k].id }, function (err, result) {
      console.log(result);
    });
  }
