import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';  
import { setUser } from '../redux/userActions';  

const HomePage = ({ user, loading, error, dispatch }) => {
  const navigate = useNavigate();  

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const response = await fetch('http://localhost:5000/users');
        const data = await response.json();
        
        if (data && data.length > 0) {
          dispatch(setUser(data[0]));  
        }
      } catch (err) {
        console.error('Ошибка загрузки пользователя:', err);
      }
    };

    loadUserData();
  }, [dispatch]);

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center mt-4">Ошибка: {error}</p>;
  }

  if (!user) {
    return <p className="text-red-500 text-center mt-4">Пользователь не авторизован</p>;
  }

  const registrationDate = user.registrationDate
    ? new Date(user.registrationDate).toLocaleDateString()
    : 'Дата не указана';

 
  const handleGoToNotes = () => {
    navigate('/notes');  
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Добро пожаловать, {user.name || 'Пользователь'}!</h1>
      <p className="text-gray-600 mb-2">Дата регистрации: {registrationDate}</p>
      
      {user.nickname && <p className="text-gray-600 mb-2">Никнейм: {user.nickname}</p>}
      {user.age && <p className="text-gray-600 mb-2">Возраст: {user.age}</p>}
      {user.gender && <p className="text-gray-600 mb-2">Пол: {user.gender}</p>}
      {user.avatar && <p className="mb-4"><img src={user.avatar} alt="Avatar" className="rounded-full" width="100" /></p>}

      <div className="flex justify-center">
        <button
          onClick={handleGoToNotes}  
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Перейти к заметкам
        </button>
      </div>
    </div>
  );
};


const mapStateToProps = (state) => ({
  user: state.user.user,
  loading: state.user.loading,
  error: state.user.error,
});

export default connect(mapStateToProps)(HomePage);
