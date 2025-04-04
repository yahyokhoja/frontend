import React from "react";
import { Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import "../styles/Home.css"; // Подключаем стили

function Home() {
  return (
    <Container className="home-container">
      <h1>Добро пожаловать в систему доставки еды!</h1>

      <div className="home-buttons mt-4">
        <Link to="/menu">
          <Button variant="primary" className="home-button">Меню</Button>
        </Link>
        <Link to="/login">
          <Button variant="success" className="home-button">Авторизация</Button>
        </Link>
        <Link to="/register">
          <Button variant="warning" className="home-button">Регистрация</Button>
        </Link>
      </div>
    </Container>
  );
}

export default Home;
