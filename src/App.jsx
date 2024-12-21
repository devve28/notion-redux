// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store"; // Импортируем Redux store
import { AuthProvider } from "./context/AuthContext"; 
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotesPage from "./pages/NotesPage";
import CreateNotePage from "./pages/CreateNotePage";
import EditNotePage from "./pages/EditNotePage";
import NotFoundPage from "./pages/NotFoundPage";
import ViewNotePage from "./pages/ViewNotePage";
import Header from "./components/Header";
import './App.css';

const App = () => {
  return (
    <Provider store={store}> 
      <AuthProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/notes" element={<NotesPage />} />
            <Route path="/create-note" element={<CreateNotePage />} />
            <Route path="/edit-note/:id" element={<EditNotePage />} />
            <Route path="/view-note/:id" element={<ViewNotePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </Provider>
  );
};

export default App;
