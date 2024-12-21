import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setNotes, setError } from '../redux/actions';

const NotesPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user); 
  const { notes = [], error } = useSelector((state) => state.notes); 
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const notesPerPage = 5;

  
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

 
  useEffect(() => {
    if (user) {
      
      const savedNotes = JSON.parse(localStorage.getItem(`notes_${user.id}`));

      if (savedNotes) {
        dispatch(setNotes(savedNotes)); 
      } else {
        fetchNotes(); 
      }
    }
  }, [user]);

 
  useEffect(() => {
    if (user && notes.length > 0) {
      localStorage.setItem(`notes_${user.id}`, JSON.stringify(notes));
    }
  }, [notes, user]);

  const fetchNotes = async () => {
    if (!user) return; 
    try {
      const response = await fetch(`http://localhost:5000/notes?userId=${user.id}`);
      if (!response.ok) throw new Error('Ошибка загрузки заметок');
      const data = await response.json();
      const sortedNotes = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      dispatch(setNotes(sortedNotes)); 
    } catch (error) {
      dispatch(setError('Не удалось загрузить заметки. Попробуйте позже.'));
      console.error('Ошибка загрузки заметок:', error.message);
    }
  };

  const handleDelete = async (noteId) => {
    const confirmed = window.confirm('Вы уверены, что хотите удалить эту заметку?');
    if (confirmed) {
      try {
        await fetch(`http://localhost:5000/notes/${noteId}`, {
          method: 'DELETE',
        });
        fetchNotes(); 
      } catch (error) {
        dispatch(setError('Ошибка удаления заметки.'));
        console.error('Ошибка удаления заметки:', error.message);
      }
    }
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= Math.ceil(filteredNotes.length / notesPerPage)) {
      setCurrentPage(page);
    }
  };

  const totalPages = Math.ceil(filteredNotes.length / notesPerPage);

  const getPaginatedNotes = () => {
    const startIndex = (currentPage - 1) * notesPerPage;
    return filteredNotes.slice(startIndex, startIndex + notesPerPage);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-6">Заметки</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Поиск по названию заметок..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <Link to="/create-note">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Создать новую заметку
          </button>
        </Link>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="space-y-4">
        {getPaginatedNotes().length > 0 ? (
          getPaginatedNotes().map((note, index) => (
            <div key={`${note.id}-${index}`} className="p-4 border border-gray-200 rounded-md shadow-sm hover:shadow-md">
              <h3 className="text-xl font-semibold mb-2">{note.title}</h3>
              <p className="text-gray-600 text-sm mb-4">Дата создания: {new Date(note.createdAt).toLocaleDateString()}</p>
              <div className="space-x-4">
                <Link to={`/edit-note/${note.id}`} className="text-blue-500 hover:underline">
                  ✍️ Редактировать
                </Link>
                <button onClick={() => handleDelete(note.id)} className="text-red-500 hover:underline">
                  🗑 Удалить
                </button>
                <Link to={`/view-note/${note.id}`} className="text-blue-500 hover:underline">
                  Просмотр
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Нет заметок для отображения</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            ← Назад
          </button>
          <span className="text-gray-700">
            Страница {currentPage} из {totalPages}
          </span>
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Вперед →
          </button>
        </div>
      )}
    </div>
  );
};

export default NotesPage;
