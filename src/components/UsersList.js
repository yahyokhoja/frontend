import React, { useEffect, useState } from 'react';

const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Получение данных с вашего бэкенда
    fetch('https://your-backend-url.onrender.com/api/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data); // Сохранение данных в state
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []); // Эффект сработает один раз при монтировании компонента

  return (
    <div>
      <h1>Users List</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li> // Отображение каждого пользователя
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
