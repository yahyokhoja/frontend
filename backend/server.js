const path = require('path');

const express = require('express');
const multer = require('multer');
const { Video } = require('./models'); // Предположим, что у вас есть модель Video
const app = express();

// Настройка Multer для загрузки файлов
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/videos');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

app.post('/api/upload-video', upload.single('video'), async (req, res) => {
  try {
    const newVideo = await Video.create({
      name: req.file.filename,
      path: req.file.path
    });
    res.status(200).json({ message: 'Видео загружено и добавлено в базу', video: newVideo });
  } catch (error) {
    console.error('Ошибка при загрузке видео', error);
    res.status(500).json({ message: 'Ошибка при загрузке видео' });
  }
});

app.post('/api/add-video-to-db', async (req, res) => {
  const { videoId } = req.body;

  try {
    const video = await Video.findByPk(videoId);
    if (video) {
      await video.update({ isInDatabase: true });
      res.status(200).json({ message: 'Видео добавлено в базу данных' });
    } else {
      res.status(404).json({ message: 'Видео не найдено' });
    }
  } catch (error) {
    console.error('Ошибка при добавлении видео в базу данных', error);
    res.status(500).json({ message: 'Ошибка при добавлении видео' });
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
