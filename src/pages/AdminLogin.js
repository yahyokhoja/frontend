import React, { useState } from "react"; // Подключаем useState для работы с состоянием
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Импортируем useNavigate
import "../styles/AdminLogin.css"; // Подключаем стили

function AdminLogin() {
  const [password, setPassword] = useState(""); // Состояние для пароля
  const [error, setError] = useState(""); // Состояние для ошибки
  const navigate = useNavigate(); // Хук для навигации

  const correctPassword = "admin123"; // Пример пароля для администратора

  const handleSubmit = (e) => {
    e.preventDefault(); // Останавливаем стандартное поведение формы

    if (password === correctPassword) {
      localStorage.setItem("adminAuthenticated", "true"); // Сохраняем информацию о том, что админ вошел
      navigate("/admin"); // Перенаправляем на страницу администратора
    } else {
      setError("Неверный пароль, попробуйте снова."); // Если пароль неверный, показываем ошибку
    }
  };

  return (
    <Container>
      <h1>Вход в панель администратора</h1>
      {error && <Alert variant="danger">{error}</Alert>} {/* Отображаем ошибку */}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formPassword">
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            type="password"
            placeholder="Введите пароль"
            value={password} // Привязываем значение к состоянию
            onChange={(e) => setPassword(e.target.value)} // Обработчик изменения поля
          />
        </Form.Group>
        <Button variant="primary" type="submit">Войти</Button>
      </Form>
    </Container>
  );
}

export default AdminLogin;
