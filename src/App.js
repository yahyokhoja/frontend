import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Menu from "./pages/Menu";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./styles/App.css"; // Подключаем стили

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/menu" element={<Menu />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
