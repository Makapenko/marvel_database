// Извлекает основное название комикса (без "Vol")
const extractBaseComicTitle = title => title.slice(0, title.indexOf(' Vol '));

// Проверяет, соответствует ли комикс заданным имени и месяцу
const comicMatchesNameAndMonth = (comic, name, month) =>
  extractBaseComicTitle(comic.title) === name && comic.yearandmonth === month;

// Фильтрует комиксы по имени и месяцу
const filterComicsByNameAndMonth = (comics, name, month) =>
  comics.filter(comic => comicMatchesNameAndMonth(comic, name, month));

// Возвращает уникальные названия комиксов и уникальные месяцы
export const collectUniqueNamesAndMonths = (comList) => {
  const nonUniqueValues = comList.reduce(
    (acc, comic) => {
      acc.nonUniqueComicsNames.push(extractBaseComicTitle(comic.title));
      acc.nonUniqueMonths.push(comic.yearandmonth);
      return acc;
    },
    { nonUniqueComicsNames: [], nonUniqueMonths: [] }
  );

  return {
    nonUniqueComicsNames: [...new Set(nonUniqueValues.nonUniqueComicsNames)],
    uniqueMonths: [...new Set(nonUniqueValues.nonUniqueMonths)].sort(),
  };
};

// Возвращает информацию о комиксах с максимальным количеством выпусков в месяц
export const calculateMaxComicsPerMonth = (
  nonUniqueComicsNames,
  comList,
  uniqueMonths
) => {
  return Array.from(new Set(nonUniqueComicsNames)).reduce((acc, name) => {
    const comicsWithName = comList.filter(
      comic => extractBaseComicTitle(comic.title) === name
    );

    const comicsPerMonth = uniqueMonths.map(month =>
      filterComicsByNameAndMonth(comicsWithName, name, month)
    );

    const maxComicsPerMonth = Math.max(
      ...comicsPerMonth.map(month => month.length)
    );

    acc.push({ name, maxComicsPerMonth });
    return acc;
  }, []);
};

// Возвращает двумерный массив комиксов сгруппированных по месяцам и названиям
export const createComicsMatrixByMonthAndName = (
  uniqueMonths,
  uniqueComicsNames,
  comList
) => {
  return uniqueMonths.map(month =>
    uniqueComicsNames.map(({ name }) =>
      filterComicsByNameAndMonth(comList, name, month)
    )
  );
};
