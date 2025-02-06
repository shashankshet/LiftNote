import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Trackworkout from './components/Trackworkout';
import { authService } from './services/auth.service';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/track"
          element={
            <ProtectedRoute>
              <Trackworkout />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/track" replace />} />
      </Routes>
    </Router>
  );
}

export default App;