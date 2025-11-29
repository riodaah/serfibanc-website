import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import config from '../config.json';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [simuladoresOpen, setSimuladoresOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const menuItems = [
    { label: 'Inicio', section: 'inicio' },
    { label: 'Quiénes Somos', section: 'quienes-somos' },
    { label: 'Créditos', section: 'creditos' },
    { label: 'Servicios', section: 'servicios' },
    { label: 'Contacto', section: 'contacto' },
  ];

  const simuladores = [
    { label: 'Crédito PYME', link: '/credito-pyme' },
    { label: 'Crédito Hipotecario', link: '/credito-hipotecario' },
    { label: 'Crédito Automotriz', link: '/credito-automotriz' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gradient-to-b from-[#020617] to-[#0a1628] shadow-lg shadow-blue-500/10' : 'bg-gradient-to-b from-[#020617]/98 to-[#0a1628]/98 backdrop-blur-md'
      } border-b border-blue-500/20`}
    >
      <div className="container-custom px-4 md:px-6">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 rounded-full blur-xl group-hover:blur-2xl transition-all"></div>
            <div className="relative bg-white/95 backdrop-blur-sm rounded-full p-1 shadow-lg border border-white/20 group-hover:shadow-xl transition-all">
              <img
                src="/imagenes/logo.webp"
                alt="Serfibanc Logo"
                className="h-16 w-auto"
              />
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.section}
                onClick={() => scrollToSection(item.section)}
                className="text-white hover:text-gray-200 font-medium transition-colors duration-200 uppercase text-sm"
              >
                {item.label}
              </button>
            ))}
            
            {/* Dropdown Simuladores */}
            <div 
              className="relative"
              onMouseEnter={() => setSimuladoresOpen(true)}
              onMouseLeave={() => setSimuladoresOpen(false)}
            >
              <button
                className="text-white hover:text-gray-200 font-medium transition-colors duration-200 uppercase text-sm flex items-center gap-1"
              >
                Simuladores
                <svg className={`w-4 h-4 transition-transform ${simuladoresOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <AnimatePresence>
                {simuladoresOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100"
                  >
                    {simuladores.map((sim) => (
                      <Link
                        key={sim.link}
                        to={sim.link}
                        className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm font-medium"
                        onClick={() => setSimuladoresOpen(false)}
                      >
                        {sim.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link
              to="/credito-pyme"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-6 py-3 rounded-lg transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 uppercase text-sm inline-block"
            >
              Simula tu Crédito
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors text-white"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden py-4 border-t border-white/10 bg-gradient-to-b from-[#020617] to-[#0a1628]"
          >
            {menuItems.map((item) => (
              <button
                key={item.section}
                onClick={() => scrollToSection(item.section)}
                className="block w-full text-left px-4 py-3 text-white hover:bg-white/10 transition-colors uppercase text-sm"
              >
                {item.label}
              </button>
            ))}
            
            {/* Simuladores en mobile */}
            <div className="border-t border-white/10 mt-2 pt-2">
              <p className="px-4 py-2 text-gray-400 text-xs uppercase tracking-wider">Simuladores</p>
              {simuladores.map((sim) => (
                <Link
                  key={sim.link}
                  to={sim.link}
                  className="block w-full text-left px-6 py-3 text-white hover:bg-white/10 transition-colors text-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {sim.label}
                </Link>
              ))}
            </div>
            
            <div className="px-4 pt-4">
              <Link
                to="/credito-pyme"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-6 py-3 rounded-lg transition-all duration-300 shadow-lg shadow-blue-500/30 uppercase text-sm w-full text-center block"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Simula tu Crédito
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
