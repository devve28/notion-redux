
import React from "react";
import { Link } from "react-router-dom";  
import useAuth from "../hooks/useAuth";  

const NotFoundPage = () => {
  const { user } = useAuth();  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Страница не найдена</h1>
      
      {user ? (
        <p className="text-lg text-gray-700 mb-4">Добро пожаловать, {user.email}</p>
      ) : (
        <p className="text-lg text-gray-700 mb-4">Пожалуйста, войдите в систему.</p>
      )}
      
   
      <Link
        to="/"
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
      >
        Вернуться на главную
      </Link>
    </div>
  );
};

export default NotFoundPage;
