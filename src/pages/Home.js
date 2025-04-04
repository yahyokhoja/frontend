// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Добро пожаловать в систему доставки еды!</h1>
      <nav>
        <ul>
          <li><Link to="/admin">Админка</Link></li>
          <li><Link to="/login">Авторизация</Link></li>
          <li><Link to="/register">Регистрация</Link></li>
          <li><Link to="/menu">Меню</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Home;
