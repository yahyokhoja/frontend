// src/pages/Menu.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Row, Col, Spinner } from 'react-bootstrap'; // Импортируем компоненты из react-bootstrap
import '../styles/Menu.css';

function Menu() {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Замените на ваш API
    axios.get('http://localhost:5000/api/food')
      .then(response => {
        setFoodItems(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Ошибка при загрузке меню', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center mt-5"><Spinner animation="border" variant="primary" /></div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Меню</h1>
      <Row>
        {foodItems.map(item => (
          <Col md={4} key={item.id} className="mb-4">
            <Card>
              <Card.Img variant="top" src={item.imageUrl} />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
                <Card.Text><strong>Цена: ${item.price}</strong></Card.Text>
                <Button variant="primary">Добавить в корзину</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Menu;
