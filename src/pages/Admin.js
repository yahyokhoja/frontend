import React, { useEffect, useState } from "react";
import { Container, Table, Button, Form } from "react-bootstrap";
import axios from "axios";
import "../styles/Admin.css"; // Подключаем стили

function Admin() {
  const [users, setUsers] = useState([]);
  const [video, setVideo] = useState(null);
  const [videos, setVideos] = useState([]);

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
        console.error('Error fetching users: ', error);
      });

    // Получение списка загруженных видео
    fetch('https://your-backend-url.onrender.com/api/videos')
      .then(response => response.json())
      .then(data => {
        setVideos(data); // Загружаем список видео
      })
      .catch(error => {
        console.error('Error fetching videos: ', error);
      });
  }, []);

  // Обработчик изменения видео файла
  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);
  };

  // Отправка видео на сервер
  const handleVideoUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('video', video);

    try {
      const response = await axios.post('https://your-backend-url.onrender.com/api/upload-video', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Видео успешно загружено:', response.data);
      
      // После загрузки обновляем список видео
      fetch('https://your-backend-url.onrender.com/api/videos')
        .then(response => response.json())
        .then(data => {
          setVideos(data); // Загружаем обновленный список видео
        })
        .catch(error => {
          console.error('Error fetching videos: ', error);
        });
    } catch (error) {
      console.error('Ошибка при загрузке видео:', error);
    }
  };

  // Обработчик добавления видео в базу данных
  const handleAddVideoToDatabase = async (videoId) => {
    try {
      const response = await axios.post('https://your-backend-url.onrender.com/api/add-video-to-db', { videoId });

      console.log('Видео добавлено в базу данных:', response.data);

      // Обновляем список видео
      fetch('https://your-backend-url.onrender.com/api/videos')
        .then(response => response.json())
        .then(data => {
          setVideos(data);
        })
        .catch(error => {
          console.error('Error fetching videos after adding to db: ', error);
        });
    } catch (error) {
      console.error('Ошибка при добавлении видео в базу данных:', error);
    }
  };

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

      {/* Форма для загрузки видео */}
      <h3>Загрузить видео:</h3>
      <Form onSubmit={handleVideoUpload}>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Выберите видео файл</Form.Label>
          <Form.Control 
            type="file" 
            accept="video/*"
            onChange={handleVideoChange} 
          />
        </Form.Group>
        <Button variant="primary" type="submit">Загрузить видео</Button>
      </Form>

      {/* Таблица видео */}
      <h3>Загруженные видео:</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Название видео</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {videos.length > 0 ? (
            videos.map((video, index) => (
              <tr key={index}>
                <td>{video.id}</td>
                <td>{video.name}</td>
                <td>
                  <Button variant="success" onClick={() => handleAddVideoToDatabase(video.id)}>Добавить в базу</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">Загружаем виде...</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}

export default Admin;
