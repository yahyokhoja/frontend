// src/pages/Menu.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Menu() {
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    // Замените URL на URL вашего бэкенда
    axios.get('http://localhost:5000/api/food')
      .then(response => {
        setFoodItems(response.data);
      })
      .catch(error => {
        console.error('Ошибка при загрузке меню', error);
      });
  }, []);

  return (
    <div>
      <h1>Меню</h1>
      <ul>
        {foodItems.map(item => (
          <li key={item.id}>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p>Цена: ${item.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Menu;
