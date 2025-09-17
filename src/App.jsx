import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MobileHome from './components/MobileHome.jsx';
import Home from './components/Home.jsx';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}


function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
      <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isMobile ? <Navigate to="/home" replace /> : <Home />}
        />

        <Route
          path="/home"
          element={isMobile ? <MobileHome /> : <Home />}
        />
      </Routes>     
      </BrowserRouter>
  );
}

export default App;
