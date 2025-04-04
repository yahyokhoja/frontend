// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Nav, Navbar } from 'react-bootstrap'; // Импортируем компоненты из react-bootstrap
import '../styles/Home.css';

function Home() {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Доставка еды</Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Item>
            <Link to="/admin">
              <Button variant="outline-light" className="mr-2">Админка</Button>
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/login">
              <Button variant="outline-light" className="mr-2">Авторизация</Button>
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/register">
              <Button variant="outline-light" className="mr-2">Регистрация</Button>
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/menu">
              <Button variant="outline-light">Меню</Button>
            </Link>
          </Nav.Item>
        </Nav>
      </Navbar>

      <div className="text-center mt-5">
        <h1>Добро пожаловать в систему доставки еды!</h1>
      </div>
    </div>
  );
}

export default Home;
