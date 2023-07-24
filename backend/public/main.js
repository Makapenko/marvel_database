document
  .getElementById('count-comics-btn')
  .addEventListener('click', async () => {
    try {
      const response = await fetch('/comics-count')
      const data = await response.json()
      document.getElementById('comics-count').value = data.totalComics
    } catch (error) {
      console.error('Ошибка при получении количества комиксов:', error)
    }
  })

// const input = document.querySelector('input')
// const select = document.querySelector('select').selectedIndex.value;

// function getValue(value) {
//   alert(value);
// }

// input.addEventListener('click', async (event) => {
//   event.preventDefault();
//   let year = '';

//   const listOptions = document.querySelectorAll('option');
//   listOptions.forEach(el => {
//     if(el.selected) {
//       year = el.text
//     }
//   })
//   const response = await fetch(`/showComics?year=${year}`, )
//   const data = await response.text()
//   document.querySelector('#forComicsTable').innerHTML = data;
// })

// const preResult = await fetch(`/emo`, {
//   method: 'POST',
//   headers: {
//       'Content-Type': 'application/json'
//   },
//   // формируем тело POST запроса, ключ 'code', значение 'emoCode'
//   body: JSON.stringify({ code: emoCode })
// })
