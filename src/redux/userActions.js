// src/redux/actions/userActions.js
export const SET_USER = 'SET_USER';
export const SET_USER_LOADING = 'SET_USER_LOADING';
export const SET_USER_ERROR = 'SET_USER_ERROR';


export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});


export const loadUser = (userData) => ({
  type: SET_USER,
  payload: userData,
});
