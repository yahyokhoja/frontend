// src/pages/Login.js
import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap'; // Импортируем компоненты из react-bootstrap
import '../styles/Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Авторизация пользователя', username, password);
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Авторизация</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Имя пользователя</Form.Label>
          <Form.Control
            type="text"
            placeholder="Введите имя пользователя"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            type="password"
            placeholder="Введите пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Войти
        </Button>
      </Form>
    </Container>
  );
}

export default Login;
