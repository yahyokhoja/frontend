
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const HomePage = () => {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/dishes")
      .then((response) => response.json())
      .then((data) => setDishes(data))
      .catch((error) => console.error("Ошибка загрузки:", error));
  }, []);

  return (
    <Container className="mt-4">
      <h1 className="text-center">Меню</h1>
      <Row>
        {dishes.map((dish) => (
          <Col key={dish.id} md={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src={dish.image} alt={dish.name} />
              <Card.Body>
                <Card.Title>{dish.name}</Card.Title>
                <Card.Text>Цена: {dish.price} сум</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HomePage;

