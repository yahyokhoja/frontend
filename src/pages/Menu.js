import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Spinner, Card } from 'react-bootstrap';
import axios from 'axios';

function Menu() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Загрузка блюд
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/dishes');
        setDishes(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Ошибка при получении данных о блюдах', error);
        setLoading(false);
      }
    };

    fetchDishes();
  }, []);

  // Функция для скачивания изображения
  const downloadImage = (imageUrl) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = imageUrl.split('/').pop(); // Имя файла будет взято из URL
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container mt-5">
      <h1>Меню</h1>

      {/* Загрузка блюд */}
      {loading ? (
        <div className="text-center mt-4">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2">Загрузка блюд...</p>
        </div>
      ) : (
        <Row className="mt-4">
          {dishes.map((dish) => (
            <Col key={dish.id} md={4} className="mb-4">
              <Card style={{ borderRadius: '15px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                <Card.Img variant="top" src={dish.image} alt={dish.name} style={{ height: '200px', objectFit: 'cover' }} />
                <Card.Body>
                  <Card.Title>{dish.name}</Card.Title>
                  <Card.Text>{dish.description}</Card.Text>
                  <Button variant="primary" className="w-100 mb-2">
                    Добавить в корзину
                  </Button>
                  {/* Кнопка для скачивания изображения */}
                  <Button
                    variant="secondary"
                    className="w-100"
                    onClick={() => downloadImage(dish.image)}
                  >
                    Скачать фото
                  </Button>
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
