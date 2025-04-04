import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';  // Импортируем axios для запросов к серверу

function Menu() {
  const [dishes, setDishes] = useState([]);  // Состояние для хранения списка блюд
  const [loading, setLoading] = useState(true);  // Состояние загрузки

  // Функция для получения данных о блюдах
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/dishes');  // URL вашего API
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
    <div className="container mt-5">
      <h1>Меню</h1>

      {/* Загрузка */}
      {loading ? (
        <div className="text-center mt-4">
          <p>Загрузка...</p>
        </div>
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
  );
}

export default Menu;
