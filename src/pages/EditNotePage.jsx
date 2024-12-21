import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";  

const EditNotePage = () => {
  const { id } = useParams();
  const [note, setNote] = useState(null); 
  const [title, setTitle] = useState(""); 
  const [body, setBody] = useState(""); 
  const [errors, setErrors] = useState({}); 
  const navigate = useNavigate();
  const { user } = useAuth(); 


  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/notes/${id}`);
        if (response.data) {
          setNote(response.data);
          setTitle(response.data.title);
          setBody(response.data.body);
        } else {
          throw new Error("Заметка не найдена");
        }
      } catch (error) {
        console.error("Ошибка при загрузке заметки:", error);
        navigate("/notes"); 
      }
    };

    fetchNote();
  }, [id, navigate]);


  const validate = () => {
    const errors = {};
    if (!title) {
      errors.title = "Название заметки не может быть пустым";
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

    const updatedNote = {
      ...note,
      title,
      body,
      updatedAt: new Date().toISOString(), 
    };

    try {

      await axios.put(`http://localhost:5000/notes/${id}`, updatedNote);
      navigate(`/view-note/${id}`); 
    } catch (error) {
      console.error("Ошибка при обновлении заметки:", error);
      alert("Произошла ошибка при обновлении заметки. Попробуйте позже.");
    }
  };


  if (!note) return <div>Загрузка...</div>;

  return (
    <div className="container mx-auto p-4 max-w-2xl">
    <h1 className="text-2xl font-semibold text-center mb-6">Редактировать заметку</h1>
    <form onSubmit={handleSubmit} className="space-y-4">

      <div>
        <label htmlFor="title" className="block text-lg font-medium text-gray-700">Название заметки:</label>
        <input
          id="title"
          type="text"
          placeholder="Введите название заметки"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.title && <span className="text-red-600 text-sm">{errors.title}</span>}
      </div>
  
 
      <div>
        <label htmlFor="body" className="block text-lg font-medium text-gray-700">Тело заметки:</label>
        <textarea
          id="body"
          placeholder="Введите содержание заметки"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
  

      <div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300">
          Сохранить изменения
        </button>
      </div>
    </form>
  

    <div className="mt-4">
      <a href={`/view-note/${id}`} className="text-blue-500 hover:underline">
        Назад
      </a>
    </div>
  </div>
  
  );
};

export default EditNotePage;
