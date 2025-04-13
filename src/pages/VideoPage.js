// src/pages/VideoPage.js
import React, { useState, useRef } from 'react';
import axios from 'axios';

function VideoRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  // Функция для начала записи
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      videoRef.current.srcObject = stream;

      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        chunksRef.current.push(event.data);
      };
      mediaRecorderRef.current.onstop = handleStopRecording;
      mediaRecorderRef.current.start();

      setIsRecording(true);
    } catch (error) {
      console.error('Не удалось подключиться к камере и микрофону:', error);
    }
  };

  // Функция для остановки записи
  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  // Обработка остановки записи и отправки видео на сервер
  const handleStopRecording = async () => {
    const blob = new Blob(chunksRef.current, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    setVideoUrl(url);

    // Отправка видео на сервер
    const formData = new FormData();
    formData.append('video', blob, 'recorded-video.webm'); // 'video' - это имя поля

    try {
      await axios.post('http://localhost:5000/upload-video', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Видео успешно отправлено на сервер!');
    } catch (error) {
      console.error('Ошибка при отправке видео на сервер', error);
    }
  };

  // Функция для скачивания видео на клиенте
  const downloadVideo = () => {
    const blob = new Blob(chunksRef.current, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'recorded-video.webm'; // Имя файла для сохранения
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h1>Запись видео</h1>
      <video ref={videoRef} autoPlay muted style={{ width: '100%', maxHeight: '400px' }}></video>
      <div>
        {isRecording ? (
          <button onClick={stopRecording}>Остановить запись</button>
        ) : (
          <button onClick={startRecording}>Начать запись</button>
        )}
      </div>
      {videoUrl && (
        <div>
          <video src={videoUrl} controls style={{ marginTop: '20px' }} />
          <div>
            {/* Кнопка для сохранения на сервер */}
            <button onClick={handleStopRecording}>Сохранить на сервер</button>
            {/* Кнопка для скачивания видео на клиенте */}
            <button onClick={downloadVideo}>Сохранить видео на диск</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoRecorder;
