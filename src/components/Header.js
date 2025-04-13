import React from 'react';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import '../styles/Header.css';

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="position-relative">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <FaHome size={24} className="text-light" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">

            {/* Мега-меню: Еда */}
            <Dropdown className="mega-dropdown">
              <Dropdown.Toggle variant="dark" id="mega-food">
                Еда
              </Dropdown.Toggle>
              <Dropdown.Menu className="mega-menu">
                <div className="d-flex flex-wrap">
                  <div className="p-3">
                    <h6>Быстрое питание</h6>
                    <Dropdown.Item as={Link} to="/food/pizza">Пицца</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/food/burgers">Бургеры</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/food/shaurma">Шаурма</Dropdown.Item>
                  </div>
                  <div className="p-3">
                    <h6>Домашняя еда</h6>
                    <Dropdown.Item as={Link} to="/food/shashlik">Шашлык</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/food/plov">Плов</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/food/soups">Супы</Dropdown.Item>
                  </div>
                  <div className="p-3">
                    <h6>Напитки</h6>
                    <Dropdown.Item as={Link} to="/food/tea">Чай</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/food/coffee">Кофе</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/food/juice">Соки</Dropdown.Item>
                  </div>
                </div>
              </Dropdown.Menu>
            </Dropdown>

            {/* Мега-меню: Одежда */}
            <Dropdown className="mega-dropdown">
              <Dropdown.Toggle variant="dark" id="mega-clothing">
                Одежда
              </Dropdown.Toggle>
              <Dropdown.Menu className="mega-menu">
                <div className="d-flex flex-wrap">
                  <div className="p-3">
                    <h6>Мужская</h6>
                    <Dropdown.Item as={Link} to="/clothing/men/tshirts">Футболки</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/clothing/men/jackets">Куртки</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/clothing/men/pants">Брюки</Dropdown.Item>
                  </div>
                  <div className="p-3">
                    <h6>Женская</h6>
                    <Dropdown.Item as={Link} to="/clothing/women/dresses">Платья</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/clothing/women/blouses">Блузки</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/clothing/women/skirts">Юбки</Dropdown.Item>
                  </div>
                </div>
              </Dropdown.Menu>
            </Dropdown>

            {/* Мега-меню: Обувь */}
            <Dropdown className="mega-dropdown">
              <Dropdown.Toggle variant="dark" id="mega-shoes">
                Обувь
              </Dropdown.Toggle>
              <Dropdown.Menu className="mega-menu">
                <div className="d-flex flex-wrap">
                  <div className="p-3">
                    <h6>Мужская обувь</h6>
                    <Dropdown.Item as={Link} to="/shoes/men/sneakers">Кроссовки</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/shoes/men/boots">Ботинки</Dropdown.Item>
                  </div>
                  <div className="p-3">
                    <h6>Женская обувь</h6>
                    <Dropdown.Item as={Link} to="/shoes/women/heels">Туфли</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/shoes/women/flats">Балетки</Dropdown.Item>
                  </div>
                </div>
              </Dropdown.Menu>
            </Dropdown>

            {/* Мега-меню: Техника */}
            <Dropdown className="mega-dropdown">
              <Dropdown.Toggle variant="dark" id="mega-tech">
                Техника
              </Dropdown.Toggle>
              <Dropdown.Menu className="mega-menu">
                <div className="d-flex flex-wrap">
                  <div className="p-3">
                    <h6>Смартфоны</h6>
                    <Dropdown.Item as={Link} to="/tech/phones/android">Android</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/tech/phones/iphone">iPhone</Dropdown.Item>
                  </div>
                  <div className="p-3">
                    <h6>Планшеты и ПК</h6>
                    <Dropdown.Item as={Link} to="/tech/tablets">Планшеты</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/tech/laptops">Ноутбуки</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/tech/pcs">Компьютеры</Dropdown.Item>
                  </div>
                </div>
              </Dropdown.Menu>
            </Dropdown>

            {/* Мега-меню: Развлечения */}
            <Dropdown className="mega-dropdown">
              <Dropdown.Toggle variant="dark" id="mega-entertainment">
                Развлечения
              </Dropdown.Toggle>
              <Dropdown.Menu className="mega-menu">
                <div className="d-flex flex-wrap">
                  <div className="p-3">
                    <h6>Фильмы и ТВ</h6>
                    <Dropdown.Item as={Link} to="/entertainment/movies">Фильмы</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/entertainment/tv">Сериалы</Dropdown.Item>
                  </div>
                  <div className="p-3">
                    <h6>Игры</h6>
                    <Dropdown.Item as={Link} to="/entertainment/games/pc">Игры на ПК</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/entertainment/games/console">Консоли</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/entertainment/games/mobile">Мобильные</Dropdown.Item>
                  </div>
                </div>
              </Dropdown.Menu>
            </Dropdown>

            {/* Остальные ссылки */}
            <Nav.Link as={Link} to="/menu">Меню</Nav.Link>
            <Nav.Link as={Link} to="/login">Вход</Nav.Link>
            <Nav.Link as={Link} to="/register">Регистрация</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
