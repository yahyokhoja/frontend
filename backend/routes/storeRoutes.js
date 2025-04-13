const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');

// Роут для создания магазина
router.get('/create', storeController.createStorePage); // Показывает страницу для создания магазина
router.post('/create', storeController.createStore);    // Обрабатывает создание магазина

module.exports = router;
