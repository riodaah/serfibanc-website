import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CreditoPyme from './pages/CreditoPyme';
import CreditoHipotecario from './pages/CreditoHipotecario';
import CreditoAutomotriz from './pages/CreditoAutomotriz';
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

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/credito-pyme" element={<CreditoPyme />} />
            <Route path="/credito-hipotecario" element={<CreditoHipotecario />} />
            <Route path="/credito-automotriz" element={<CreditoAutomotriz />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

