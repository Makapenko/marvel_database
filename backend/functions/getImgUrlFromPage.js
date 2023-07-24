const axios = require('axios');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

async function fetchComicCoverUrl(comicName) {
  const url = `https://marvel.fandom.com/wiki/${encodeURIComponent(comicName)}`;

  try {
    const response = await axios.get(url);
    const dom = new JSDOM(response.data);
    const coverImageUrl = dom.window.document.querySelector('.pi-item.pi-image[data-source="Image1"] a').href;

    return coverImageUrl;
  } catch (err) {
    console.error(err);
  }
}

module.exports = { fetchComicCoverUrl }
