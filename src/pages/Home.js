import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Container className="text-center mt-5">
      <h1>Добро пожаловать в систему доставки еды!</h1>
      <Row className="mt-4">
        <Col md={6} lg={3} className="mb-3">
          <Link to="/admin">
            <Button variant="primary" className="w-100">Админка</Button>
          </Link>
        </Col>
        <Col md={6} lg={3} className="mb-3">
          <Link to="/login">
            <Button variant="success" className="w-100">Авторизация</Button>
          </Link>
        </Col>
        <Col md={6} lg={3} className="mb-3">
          <Link to="/register">
            <Button variant="warning" className="w-100">Регистрация</Button>
          </Link>
        </Col>
        <Col md={6} lg={3} className="mb-3">
          <Link to="/menu">
            <Button variant="danger" className="w-100">Меню</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
