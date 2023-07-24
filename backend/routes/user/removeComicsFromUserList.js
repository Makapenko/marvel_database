const User = require('../../db/models/user')

async function removeComicsFromUserList(req, res) {
  const { userId, comicId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    if (!user.readComics.includes(comicId)) {
      return res.status(404).send('Comic not found in user comics');
    }

    user.readComics.pull(comicId);
    await user.save();

    res.status(200).send('Comic removed from user successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
}

module.exports = { removeComicsFromUserList }
