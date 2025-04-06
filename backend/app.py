from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime


app = Flask(__name__)

# Подключение к БД Render
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://delivery_db_qr17_user:nX57W4fr3Iqi4PoUdpMOe95lPS4HhAR8@dpg-cvoctr3uibrs73bodhng-a.frankfurt-postgres.render.com/delivery_db_qr17'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
CORS(app, origins="http://localhost:3000")  # Разрешаем доступ только с этого адреса

# 📦 Модель пользователя
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(20), nullable=True)

with app.app_context():
    db.create_all()

# 📥 Регистрация
@app.route('/api/register', methods=['POST'])
def register_user():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    phone = data.get('phone')

    # Проверка полей
    if not name or not email or not password:
        return jsonify({'message': 'Имя, email и пароль обязательны'}), 400

    # Проверка на существующий email
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({'message': 'Пользователь с таким email уже существует'}), 409

    # Хеширование пароля перед сохранением в БД
    hashed_password = generate_password_hash(password)

    new_user = User(name=name, email=email, password=hashed_password, phone=phone)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'Пользователь зарегистрирован', 'user_id': new_user.id})

# 👥 Получение списка пользователей

# Секретный ключ для генерации JWT токенов
SECRET_KEY = 'your_secret_key'  # Лучше использовать более сложный и безопасный ключ

@app.route('/api/login', methods=['POST'])
def login_user():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'message': 'Email и пароль обязательны'}), 400

    # Находим пользователя по email
    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({'message': 'Пользователь не найден'}), 404

    # Проверка пароля
    if not check_password_hash(user.password, password):
        return jsonify({'message': 'Неверный пароль'}), 401

    # Создание JWT токена с сроком действия 1 час
    token = jwt.encode({
        'user_id': user.id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    }, SECRET_KEY, algorithm='HS256')

    return jsonify({'message': 'Авторизация успешна', 'token': token})
  
 