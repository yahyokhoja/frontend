// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Button, Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';  // Импортируем axios для запросов к серверу
import '../styles/Home.css';

function Home() {
  const [dishes, setDishes] = useState([]);  // Состояние для хранения списка блюд
  const [loading, setLoading] = useState(true);  // Состояние загрузки

  // Функция для получения данных о блюдах
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/dishes');  // Замените URL на ваш API
        setDishes(response.data);  // Устанавливаем полученные данные в состояние
        setLoading(false);  // Убираем состояние загрузки
      } catch (error) {
        console.error('Ошибка при получении данных о блюдах', error);
        setLoading(false);
      }
    };

    fetchDishes();
  }, []);  // Пустой массив означает, что запрос выполняется один раз при монтировании компонента

  return (
    <div>
      <Navbar bg="dark" variant="dark">
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
        <h1>Добро пожаловать в систему доставка еды!</h1>
        {loading ? (
          <p>Загрузка...</p>  // Показываем текст "Загрузка", пока данные не будут получены
        ) : (
          <Row className="mt-4">
            {/* Отображаем блюда в виде карточек */}
            {dishes.map((dish) => (
              <Col key={dish.id} md={4} className="mb-4">
                <Card>
                  <Card.Img variant="top" src={dish.image} alt={dish.name} />
                  <Card.Body>
                    <Card.Title>{dish.name}</Card.Title>
                    <Card.Text>{dish.description}</Card.Text>
                    <Button variant="primary">Добавить в корзину</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}

export default Home;
