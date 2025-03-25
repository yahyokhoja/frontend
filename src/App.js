import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/dishes')
      .then((response) => response.json())
      .then((data) => setDishes(data))
      .catch((error) => console.error('Error fetching dishes:', error));
  }, []);

  return (
    <div className="App">
      <h1>Меню</h1>
      <ul>
        {dishes.map((dish) => (
          <li key={dish.id}>
            <img src={dish.image} alt={dish.name} />
            <h2>{dish.name}</h2>
            <p>{dish.price} руб.</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
