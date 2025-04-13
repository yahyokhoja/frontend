const Store = require('../models/Store'); // Модель магазина

// Страница для создания магазина
exports.createStorePage = (req, res) => {
  res.render('createStore'); // Отправляем страницу для создания магазина
};

// Логика создания магазина
exports.createStore = async (req, res) => {
  try {
    const { name, description, category } = req.body;
    
    // Создание нового магазина
    const newStore = new Store({
      name,
      description,
      category,
      owner: req.user._id, // Предположим, что пользователь авторизован
    });

    // Сохранение магазина в базе данных
    await newStore.save();

    // Перенаправление на страницу успешного создания
    res.redirect('/stores');
  } catch (error) {
    console.error(error);
    res.status(500).send('Ошибка при создании магазина');
  }
};
