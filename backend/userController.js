const User = require('./db/models/user');

// Функция поиска или создания пользователя
async function findOrCreateUser(profile) {
  try {
    // Ищем пользователя с указанным googleId
    let user = await User.findOne({ googleId: profile.id });

    // Если пользователь не найден, создаем нового
    if (!user) {
      user = new User({
        email: profile.email,
        password: null, // Google-пользователи не имеют пароля
        googleId: profile.id,
        readComics: [],
      });

      // Сохраняем нового пользователя
      await user.save();
    }

    return user;
  } catch (error) {
    console.error('Ошибка при поиске или создании пользователя:', error);
    throw error;
  }
}

// Функция получения пользователя по идентификатору
async function getUserById(id) {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    console.error('Ошибка при получении пользователя по ID:', error);
    throw error;
  }
}

module.exports = {
  findOrCreateUser,
  getUserById,
};
