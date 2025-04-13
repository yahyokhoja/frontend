import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin"; // Импортируем страницу логина
import Register from "./pages/Register";
import Login from "./pages/Login";
import Menu from "./pages/Menu";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./styles/App.css"; // Подключаем стили

import VideoPage from './pages/VideoPage'; // Импортируем компонент видеокамеры
function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin-login" element={<AdminLogin />} /> {/* Добавляем маршрут для страницы входа */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/video" component={VideoPage} /> {/* Страница видеокамеры */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
