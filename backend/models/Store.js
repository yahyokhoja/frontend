const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Предполагаем, что есть модель User
  },
});

const Store = mongoose.model('Store', storeSchema);

module.exports = Store;
