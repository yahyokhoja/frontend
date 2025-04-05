// backend/scripts/createSuperUser.js
const bcrypt = require('bcrypt');
const { User } = require('../models'); // Путь должен быть ../models, а не к отдельному файлу

async function createSuperUser() {
  const phone = 'your-phone-number';
  const password = 'your-password';

  try {
    const existingUser = await User.findOne({ where: { phone } });

    if (existingUser) {
      console.log('Суперпользователь уже существует');
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const superUser = await User.create({
      phone,
      password: hashedPassword,
      role: 'admin',
    });

    console.log('Суперпользователь успешно создан:', superUser);
  } catch (error) {
    console.error('Ошибка при создании суперпользователя:', error);
  }
}

createSuperUser();
