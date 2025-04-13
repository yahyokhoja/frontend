const express = require('express');
const path = require('path');
const multer = require('multer');
const bodyParser = require('body-parser');
const { Video } = require('./models'); // Предположим, что у вас есть модель Video
const fs = require('fs');

const app = express();

// Настройка EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Указываем папку для шаблонов

// Подключаем body-parser для работы с POST-запросами
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Убедитесь, что папка для хранения видео существует
const videoDir = path.join(__dirname, 'public', 'videos');
if (!fs.existsSync(videoDir)) {
  fs.mkdirSync(videoDir, { recursive: true });
}

// Настройка Multer для загрузки файлов
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, videoDir); // Путь для хранения видео
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname); // Уникальное имя для каждого файла
    cb(null, uniqueName);
  }
});

const upload = multer({ storage: storage });

// Маршрут для загрузки видео
app.post('/api/upload-video', upload.single('video'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Видео не было загружено' });
  }

  try {
    const newVideo = await Video.create({
      name: req.file.filename,
      path: req.file.path
    });
    res.status(200).json({ message: 'Видео загружено и добавлено в базу', video: newVideo });
  } catch (error) {
    console.error('Ошибка при загрузке видео:', error);
    res.status(500).json({ message: 'Ошибка при загрузке видео' });
  }
});

// Маршрут для добавления видео в базу данных
app.post('/api/add-video-to-db', async (req, res) => {
  const { videoId } = req.body;

  if (!videoId) {
    return res.status(400).json({ message: 'ID видео не передан' });
  }

  try {
    const video = await Video.findByPk(videoId);
    if (video) {
      await video.update({ isInDatabase: true });
      res.status(200).json({ message: 'Видео добавлено в базу данных' });
    } else {
      res.status(404).json({ message: 'Видео не найдено' });
    }
  } catch (error) {
    console.error('Ошибка при добавлении видео в базу данных:', error);
    res.status(500).json({ message: 'Ошибка при добавлении видео' });
  }
});

// Главная страница с использованием EJS
app.get('/', (req, res) => {
  res.render('index', { title: 'Видео Удалённое приложение' });
});

// Запуск сервера
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
