import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../common/context/AuthContext';
import { LoginPage } from '../pages/LoginPage/LoginPage';
import { DocumentsPage } from '../pages/DocumentsPage/DocumentsPage';

const App = () => {
  const { token } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={token ? <Navigate to="/data" /> : <LoginPage />} />
        <Route path="/data" element={token ? <DocumentsPage /> : <Navigate to="/login" />} />
        <Route path="/*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
