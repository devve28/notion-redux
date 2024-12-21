export const SET_NOTES = 'SET_NOTES';
export const SET_ERROR = 'SET_ERROR';
export const SET_LOADING = 'SET_LOADING';

// Действие для установки заметок
export const setNotes = (notes) => ({
  type: SET_NOTES,
  payload: notes,
});

// Действие для установки ошибки
export const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
});

// Действие для установки состояния загрузки
export const setLoading = () => ({
  type: SET_LOADING,
});
