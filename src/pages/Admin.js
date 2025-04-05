import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import "../styles/Admin.css"; // Подключаем стили

function Admin() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("adminAuthenticated");

    if (!isAuthenticated) {
      window.location.href = "/admin-login"; // Перенаправляем на страницу входа, если не авторизован
    }

    // Запрос к API для получения данных о пользователях
    fetch('https://your-backend-url.onrender.com/api/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data); // Заполняем состояние users полученными данными
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  return (
    <Container className="admin-container">
      <h1>Страница администратора</h1>

      {/* Таблица пользователей */}
      <h3>Список пользователей:</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Имя</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">Загружаем пользователей...</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}

export default Admin;
