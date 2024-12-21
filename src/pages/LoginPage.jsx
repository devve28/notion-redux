
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../index.css';

// Адрес API
const API_URL = 'http://localhost:5000/users';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    
      const response = await axios.get(API_URL, {
        params: { email: formData.email }, 
      });

      const user = response.data[0]; 

      if (!user) {
        setErrors({ email: 'Пользователь не найден' });
        return;
      }

  
      if (user.password === formData.password) {
        login(user); 
        navigate('/home'); 
      } else {
        setErrors({ password: 'Неверный пароль' });
      }
    } catch (error) {
      console.error('Ошибка при входе:', error);
      setErrors({ general: 'Произошла ошибка при попытке входа. Попробуйте позже.' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">Вход</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.email && <p className="text-sm text-red-500 mt-2">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Пароль</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.password && <p className="text-sm text-red-500 mt-2">{errors.password}</p>}
          </div>

          {errors.general && <p className="text-sm text-red-500 mt-2">{errors.general}</p>}

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
