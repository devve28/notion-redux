import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-blue-600 text-white py-4 px-6">
      <nav>
        <ul className="flex space-x-4">
          {location.pathname === "/login" ? (
            <li>
              <Link to="/register" className="hover:text-blue-300">Регистрация</Link>
            </li>
          ) : location.pathname === "/register" ? (
            <li>
              <Link to="/login" className="hover:text-blue-300">Войти</Link>
            </li>
          ) : (
            <>
              {user ? (
                <>
                  <li>
                    <Link to="/home" className="hover:text-blue-300">Профиль</Link>
                  </li>
                  <li>
                    <Link to="/notes" className="hover:text-blue-300">Заметки</Link>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="hover:text-blue-300">Выйти</button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login" className="hover:text-blue-300">Войти</Link>
                  </li>
                  <li>
                    <Link to="/register" className="hover:text-blue-300">Регистрация</Link>
                  </li>
                </>
              )}
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
