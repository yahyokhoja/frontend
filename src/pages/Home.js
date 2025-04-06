import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Button, Carousel, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import "../styles/Home.css";

function Home() {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    axios.get("https://yahuokhoja.pythonanywhere.com/food/api/foods/")
      .then((res) => setFoods(res.data))
      .catch((err) => console.error("Ошибка при загрузке еды:", err));
  }, []);

  const slides = [
    {
      image: "/images/shashlik1.jpg",
      title: "Классический шашлык",
      description: "Сочный шашлык на углях с луком и зеленью",
    },
    {
      image: "/images/shashlik2.jpg",
      title: "Шашлык с гарниром",
      description: "Идеальное сочетание мяса и овощей",
    },
    {
      image: "/images/shashlik3.jpg",
      title: "Шашлык для компании",
      description: "Большая порция для всей семьи или друзей",
    },
  ];

  return (
    <Container className="home-container">
      <h1 className="mt-4">Добро пожаловать в систему доставки еды!</h1>

      {/* Слайдер с шашлыками */}
      <Carousel className="my-4">
        {slides.map((slide, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src={slide.image}
              alt={slide.title}
              style={{ maxHeight: "400px", objectFit: "cover" }}
            />
            <Carousel.Caption>
              <h3>{slide.title}</h3>
              <p>{slide.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Кнопки */}
      <div className="home-buttons mb-4">
        <Link to="/menu">
          <Button variant="primary" className="me-2">Меню</Button>
        </Link>
        <Link to="/login">
          <Button variant="success" className="me-2">Авторизация</Button>
        </Link>
        <Link to="/register">
          <Button variant="warning">Регистрация</Button>
        </Link>
      </div>

      {/* Популярные блюда */}
      <h2 className="mt-4">Популярные блюда</h2>
      <Row>
        {foods.map((food) => (
          <Col md={4} key={food.id} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={food.image || "https://via.placeholder.com/300x200?text=Еда"}
              />
              <Card.Body>
                <Card.Title>{food.name}</Card.Title>
                <Card.Text>{food.description}</Card.Text>
                <Button variant="outline-primary">В корзину</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Home;
