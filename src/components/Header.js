// src/components/Header.js
import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaSignInAlt, FaUserPlus, FaHamburger } from 'react-icons/fa'; // Импортируем иконки

function Header() {
  return (
    <Navbar bg="dark" variant="dark">
      {/* Навигационная панель */}
      <Nav className="ml-auto">
        {/* Иконка и кнопка для Админки */}
        <Nav.Item>
          <Link to="/admin">
            <Button variant="outline-light" className="mr-2">
              <FaHamburger className="mr-2" /> Админка
            </Button>
          </Link>
        </Nav.Item>
        
        {/* Иконка и кнопка для Авторизации */}
        <Nav.Item>
          <Link to="/login">
            <Button variant="outline-light" className="mr-2">
              <FaSignInAlt className="mr-2" /> Авторизация
            </Button>
          </Link>
        </Nav.Item>
        
        {/* Иконка и кнопка для Регистрации */}
        <Nav.Item>
          <Link to="/register">
            <Button variant="outline-light" className="mr-2">
              <FaUserPlus className="mr-2" /> Регистрация
            </Button>
          </Link>
        </Nav.Item>
        
        {/* Иконка и кнопка для Меню */}
        <Nav.Item>
          <Link to="/menu">
            <Button variant="outline-light">
              <FaHamburger className="mr-2" /> Меню
            </Button>
          </Link>
        </Nav.Item>
      </Nav>
    </Navbar>
  );
}

export default Header;
