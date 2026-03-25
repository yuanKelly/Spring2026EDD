import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { SoundProvider } from './contexts/SoundContext';
import AuthGuard from './components/auth/AuthGuard';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import UnitPage from './pages/UnitPage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SoundProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route
              path="/home"
              element={
                <AuthGuard>
                  <HomePage />
                </AuthGuard>
              }
            />
            <Route
              path="/unit/:unitId"
              element={
                <AuthGuard>
                  <UnitPage />
                </AuthGuard>
              }
            />
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </SoundProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
