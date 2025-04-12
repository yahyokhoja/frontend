import React, { useState, useEffect, useRef } from 'react';
import { Card, Row, Col, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';

function Menu() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Камера
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [recording, setRecording] = useState(false);
  const [cameraLoading, setCameraLoading] = useState(true);
  const [cameraError, setCameraError] = useState(null);

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

  // Подключение камеры
  useEffect(() => {
    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setCameraLoading(false);
      } catch (err) {
        console.error('Ошибка доступа к камере:', err);
        setCameraError('Не удалось подключиться к камере. Пожалуйста, проверьте разрешения.');
        setCameraLoading(false);
      }
    };

    initCamera();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Начать запись
  const startRecording = () => {
    const stream = streamRef.current;
    if (!stream || !(stream instanceof MediaStream)) {
      console.error('Камера ещё не готова или поток недоступен');
      return;
    }

    setRecordedChunks([]);
    const options = { mimeType: 'video/webm' };
    const mediaRecorder = new MediaRecorder(stream, options);

    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        setRecordedChunks(prev => [...prev, e.data]);
      }
    };

    mediaRecorder.start();
    setRecording(true);
  };

  // Остановить запись
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setRecording(false);
  };

  // Скачать видео
  const downloadVideo = () => {
    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'recorded_video.webm';
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
  };

  // Запрос разрешений для камеры и микрофона
  const requestCameraPermissions = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      // Если доступ получен, показываем алерт
      alert('Доступ к камере и микрофону разрешен!');
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      streamRef.current = stream;
    } catch (err) {
      // Если доступ отклонен, показываем алерт
      alert('Не удалось подключиться к камере и микрофону. Пожалуйста, проверьте разрешения.');
    }
  };

  return (
    <div className="container mt-5">
      <h1>Меню</h1>

      {/* Видеоплеер промо */}
      <div className="my-4 text-center">
        <video width="80%" controls style={{ borderRadius: '12px', boxShadow: '0 0 20px rgba(0,0,0,0.2)' }}>
          <source src="/videos/promo.mp4" type="video/mp4" />
          Ваш браузер не поддерживает воспроизведение видео.
        </video>
      </div>

      {/* Видео с камеры */}
      <div className="my-5 text-center">
        <h4>Видео с вашей камеры</h4>

        {cameraLoading ? (
          <div className="mt-4">
            <Spinner animation="border" variant="primary" />
            <p className="mt-2">Камера загружается...</p>
          </div>
        ) : cameraError ? (
          <div className="mt-4 text-danger">
            <p>{cameraError}</p>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              style={{ width: '80%', maxWidth: '600px', borderRadius: '12px', border: '2px solid #333' }}
            />
            <div className="mt-3">
              {!recording ? (
                <Button variant="success" className="me-2" onClick={startRecording}>
                  Начать запись
                </Button>
              ) : (
                <Button variant="danger" className="me-2" onClick={stopRecording}>
                  Остановить
                </Button>
              )}
              {recordedChunks.length > 0 && (
                <Button variant="primary" onClick={downloadVideo}>
                  Скачать видео
                </Button>
              )}
            </div>
          </>
        )}

        {/* Кнопка для запроса разрешений на камеру и микрофон */}
        <div className="mt-4">
          <Button variant="warning" onClick={requestCameraPermissions}>
            Разрешить доступ к камере и микрофону
          </Button>
        </div>
      </div>

      {/* Загрузка блюд */}
      {loading ? (
        <div className="text-center mt-4">
          <p>Загрузка блюд...</p>
        </div>
      ) : (
        <Row className="mt-4">
          {dishes.map((dish) => (
            <Col key={dish.id} md={4} className="mb-4">
              <Card>
                <Card.Img variant="top" src={dish.image} alt={dish.name} />
                <Card.Body>
                  <Card.Title>{dish.name}</Card.Title>
                  <Card.Text>{dish.description}</Card.Text>
                  <Button variant="primary">Добавить в корзину</Button>
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
