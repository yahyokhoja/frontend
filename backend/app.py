from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)

# Настройка строки подключения к базе данных на Render
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://delivery_db_qr17_user:nX57W4fr3Iqi4PoUdpMOe95lPS4HhAR8@dpg-cvoctr3uibrs73bodhng-a.frankfurt-postgres.render.com/delivery_db_qr17'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Подключаем SQLAlchemy
db = SQLAlchemy(app)

# Разрешаем запросы с любого домена
CORS(app)

# Пример модели
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))

# Создаем таблицы, если их нет
with app.app_context():
    db.create_all()

# Маршрут для получения данных
@app.route('/api/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([{'id': user.id, 'name': user.name} for user in users])

# Запуск приложения
if __name__ == '__main__':
    app.run(debug=True)
