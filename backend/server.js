const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');

const app = express();
app.use(cors());
app.use(express.json());

// Инициализация Sequelize
const sequelize = new Sequelize('food_db', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

// Тест соединения
sequelize.authenticate()
  .then(() => console.log('База подключена'))
  .catch(err => console.error('Ошибка подключения:', err));

// Синхронизация моделей
sequelize.sync()
  .then(() => console.log('Модели синхронизированы'))
  .catch(err => console.error('Ошибка sync:', err));

// Простой маршрут
app.get('/', (req, res) => {
  res.send('Backend работает!');
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
