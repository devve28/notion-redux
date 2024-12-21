import React, { useState } from 'react';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../index.css';


const API_URL = 'http://localhost:5000/users';


const registerSchema = z.object({
  email: z.string().email('Введите корректный email').min(1, 'Email обязателен'),
  password: z
    .string()
    .min(8, 'Пароль должен содержать не менее 8 символов')
    .regex(/[A-Z]/, 'Пароль должен содержать хотя бы одну заглавную букву')
    .regex(/[a-z]/, 'Пароль должен содержать хотя бы одну строчную букву')
    .regex(/\d/, 'Пароль должен содержать хотя бы одну цифру'),
  confirmPassword: z.string().min(1, 'Повторите пароль'),
  name: z.string().min(1, 'Имя обязательно'),
  nickname: z.string().min(1, 'Никнейм обязателен'),
  age: z.string().refine(val => !isNaN(val) && parseInt(val) > 0, 'Возраст должен быть положительным числом'),
  gender: z.string().min(1, 'Пол обязателен'),
});


const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    nickname: '',
    age: '',
    gender: '',
    avatarUrl: '',
  });
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
     
      registerSchema.parse(formData);

   
      if (formData.password !== formData.confirmPassword) {
        setErrors({ confirmPassword: 'Пароли не совпадают' });
        return;
      }

     
      const newUser = {
        ...formData,
        id: Date.now(), 
        createdAt: new Date().toISOString(), 
        registrationDate: new Date().toISOString(), 
      };

    
      await axios.post(API_URL, newUser);

     
      navigate('/home');
    } catch (error) {
      if (error instanceof z.ZodError) {
       
        const newErrors = {};
        error.errors.forEach((err) => {
          newErrors[err.path[0]] = err.message;
        });
        setErrors(newErrors);
      } else {
        console.error('Ошибка при отправке данных на сервер:', error);
      }
    }
  };

  return (
    <div className="prose container mx-auto p-6 max-w-md bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Регистрация</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Пароль</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Повторите пароль</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Имя</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="nickname" className="block text-sm font-medium text-gray-700">Никнейм</label>
          <input
            type="text"
            id="nickname"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
          {errors.nickname && <p className="text-red-500 text-sm mt-1">{errors.nickname}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="age" className="block text-sm font-medium text-gray-700">Возраст</label>
          <input
            type="text"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
          {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Пол</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          >
            <option value="">Выберите пол</option>
            <option value="male">Мужской</option>
            <option value="female">Женский</option>
          </select>
          {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
        </div>

        <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mt-4">Зарегистрироваться</button>
      </form>
    </div>
  );
};

export default RegisterPage;
