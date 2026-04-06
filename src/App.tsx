import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { SoundProvider } from './contexts/SoundContext';
import AuthGuard from './components/auth/AuthGuard';
import Navbar from './components/ui/Navbar';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import UnitPage from './pages/UnitPage';

function Footer() {
  return (
    <footer
      className="border-t border-midnight-600/40 text-gray-500 py-5 mt-auto"
      style={{ background: 'linear-gradient(180deg, #060818, #040610)' }}
    >
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs opacity-60">This website is a prototype. You may encounter bugs or errors.</p>
        <div className="text-center sm:text-right">
          <p className="text-xs opacity-60">Copyright &copy; KSM Engineering 2025-2026</p>
          <p className="text-xs opacity-40">Designed by McDonagh, Sophia, and Kelly</p>
        </div>
      </div>
    </footer>
  );
}

function AppLayout() {
  const location = useLocation();
  const isGamePage = location.pathname.startsWith('/unit/');
  const isHomePage = location.pathname === '/home';
  const hideFooter = isGamePage || isHomePage;

  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{ backgroundColor: '#060818' }}>
      {!isGamePage && <Navbar />}
      <main className="flex-1 flex flex-col overflow-auto">
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
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SoundProvider>
          <AppLayout />
        </SoundProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
