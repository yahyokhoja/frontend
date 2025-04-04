const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

// Миддлвары
app.use(cors());
app.use(express.json());

// Пример маршрута для получения списка блюд
app.get('/api/dishes', (req, res) => {
  const dishes = [
    { id: 1, name: 'Пицца Маргарита', description: 'Томатный соус, моцарелла', image: 'https://example.com/pizza.jpg' },
    { id: 2, name: 'Суши', description: 'Рис, рыба, водоросли', image: 'https://example.com/sushi.jpg' },
  ];
  res.json(dishes);
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
