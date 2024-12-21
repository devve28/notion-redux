import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'; 
import { useAuth } from '../context/AuthContext';  

const CreateNotePage = () => {
  const { user } = useAuth();  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const errors = {};
    if (!title) {
      errors.title = 'Название заметки не может быть пустым';
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newNote = {
      id: uuidv4(), 
      title,
      body: content, 
      createdAt: new Date().toISOString(), 
      userId: user.id, 
    };

    try {
      await fetch('http://localhost:5000/notes', {
        method: 'POST',
        body: JSON.stringify(newNote),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      navigate(`/view-note/${newNote.id}`);
    } catch (error) {
      console.error('Ошибка при создании заметки:', error);
      alert('Произошла ошибка при создании заметки. Попробуйте позже.');
    }
  };

  return (
    <div className="container">
      <h1>Создать новую заметку</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Название заметки:</label>
          <input
            type="text"
            placeholder="Введите название заметки"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>

        <div>
          <label>Тело заметки:</label>
          <input
            type="text"
            placeholder="Введите содержание заметки (необязательно)"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
         
        </div>

        <button type="submit">Создать</button>
      </form>

      <div>
        <a href="/notes">Назад</a>
      </div>
    </div>
  );
};

export default CreateNotePage;