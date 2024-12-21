// src/redux/rootReducer.js
import { combineReducers } from 'redux';
import userReducer from './userReducer';
import noteReducer from './noteReducer';  

const rootReducer = combineReducers({
  user: userReducer,
  notes: noteReducer,  
});

export default rootReducer;
