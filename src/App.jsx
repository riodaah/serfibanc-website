import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CreditoPyme from './pages/CreditoPyme';
import CreditoHipotecario from './pages/CreditoHipotecario';
import CreditoAutomotriz from './pages/CreditoAutomotriz';

// Páginas de Admin
import { AuthProvider } from './context/AuthContext';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ConfiguracionTasas from './pages/admin/ConfiguracionTasas';

import './styles/globals.css';

// Componente para scroll al top en cambio de ruta
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

// Layout para páginas públicas (con Navbar y Footer)
function PublicLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}

// Layout para páginas de admin (sin Navbar ni Footer)
function AdminLayout({ children }) {
  return <>{children}</>;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/credito-pyme" element={<PublicLayout><CreditoPyme /></PublicLayout>} />
          <Route path="/credito-hipotecario" element={<PublicLayout><CreditoHipotecario /></PublicLayout>} />
          <Route path="/credito-automotriz" element={<PublicLayout><CreditoAutomotriz /></PublicLayout>} />
          
          {/* Rutas de Admin */}
          <Route path="/admin" element={<AdminLayout><Login /></AdminLayout>} />
          <Route path="/admin/dashboard" element={<AdminLayout><Dashboard /></AdminLayout>} />
          <Route path="/admin/tasas" element={<AdminLayout><ConfiguracionTasas /></AdminLayout>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;


