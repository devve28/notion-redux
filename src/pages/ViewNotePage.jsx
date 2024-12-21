import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";


const ViewNotePage = () => {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/notes/${id}`);
        if (response.data) {
          setNote(response.data);
        } else {
          throw new Error("Заметка не найдена");
        }
      } catch (error) {
        console.error("Ошибка при загрузке заметки:", error);
        setNote({ error: "Заметка не найдена" });
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    const confirmed = window.confirm("Вы уверены, что хотите удалить эту заметку?");
    if (!confirmed) return;

    try {
      await axios.delete(`http://localhost:5000/notes/${id}`);
      navigate("/notes");
    } catch (error) {
      console.error("Ошибка при удалении заметки:", error);
      alert("Произошла ошибка при удалении заметки. Попробуйте позже.");
    }
  };

  if (note === null) return <div className="text-center text-xl">Загрузка...</div>;

  if (note?.error) return <div className="text-center text-red-500">{note.error}</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-gray-800 mb-4">{note.title || "Без названия"}</h1>
      <div className="flex justify-between items-center mb-4">
        <a
          href={`/edit-note/${id}`}
          className="text-blue-500 hover:text-blue-700 text-lg"
          title="Редактировать"
        >
          ✍️ Редактировать
        </a>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 focus:outline-none"
          title="Удалить"
        >
          🗑 Удалить
        </button>
      </div>
      <div className="mb-6">
        <pre className="whitespace-pre-wrap break-words text-gray-700">{note.body || "Пустое содержание"}</pre>
      </div>
      <div className="mt-6">
        <a
          href="/notes"
          className="text-blue-500 hover:text-blue-700 text-lg"
        >
          Назад
        </a>
      </div>
    </div>
  );
};

export default ViewNotePage;
