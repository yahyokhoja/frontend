import React, { useEffect, useState } from "react";
import {
  Container,
  Carousel,
  Row,
  Col,
  Card,
  Button,
} from "react-bootstrap";
import axios from "axios";
import "../styles/Home.css";

function Home() {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    axios
      .get("https://yahuokhoja.pythonanywhere.com/food/api/foods/")
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
      description: "Отличный выбор для дружеской встречи",
    },
  ];

  return (
    <Container className="home-container">
      <h1 className="mt-4 text-center">Добро пожаловать в систему доставки!</h1>

      {/* Главный слайдер еды */}
      <Carousel className="my-4">
        {slides.map((slide, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src={slide.image}
              alt={slide.title}
              style={{ height: "250px", objectFit: "cover" }}
            />
            <Carousel.Caption>
              <h4>{slide.title}</h4>
              <p>{slide.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Популярные товары */}
      <h2 className="mt-5 mb-3">Популярные товары</h2>
      <Row>
        {foods.map((food) => (
          <Col md={4} key={food.id} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={food.image || "https://via.placeholder.com/400x300?text=Еда"}
                style={{ height: "250px", objectFit: "cover" }}
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
