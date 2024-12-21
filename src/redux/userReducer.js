// src/redux/reducers/userReducer.js
const initialState = {
    user: null,
    loading: false,
    error: null,
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_USER':
        return {
          ...state,
          user: action.payload,
          loading: false,
        };
      case 'SET_USER_LOADING':
        return {
          ...state,
          loading: true,
        };
      case 'SET_USER_ERROR':
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
  