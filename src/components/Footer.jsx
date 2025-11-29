import { Link } from 'react-router-dom';
import { useState } from 'react';
import config from '../config.json';
import PoliticasModal from './PoliticasModal';

const Footer = () => {
  const [modalAbierto, setModalAbierto] = useState(null);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const abrirModal = (tipo) => {
    setModalAbierto(tipo);
  };

  return (
    <footer className="bg-primary-dark text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo y descripción */}
          <div>
            <img
              src="/imagenes/logo.webp"
              alt="Serfibanc Logo"
              className="h-12 w-auto mb-4 brightness-0 invert"
            />
            <p className="text-gray-300 text-sm leading-relaxed">
              Serfibanc SpA – Asesoría financiera para personas y empresas.
              Te ayudamos a conseguir tu crédito con instituciones reguladas.
            </p>
          </div>

          {/* Menú */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Menú</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('servicios')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Servicios
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('quienes-somos')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Nosotros
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contacto')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Contacto
                </button>
              </li>
              <li>
                <Link
                  to="/credito-pyme"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Crédito PYME
                </Link>
              </li>
              <li>
                <Link
                  to="/credito-hipotecario"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Crédito Hipotecario
                </Link>
              </li>
              <li>
                <Link
                  to="/credito-automotriz"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Crédito Automotriz
                </Link>
              </li>
            </ul>
          </div>

          {/* Datos de contacto */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">En Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <a href={`tel:${config.contacto.telefono}`} className="text-gray-300 hover:text-white">
                  {config.contacto.telefono}
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <a href={`mailto:${config.contacto.email}`} className="text-gray-300 hover:text-white">
                  {config.contacto.email}
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 1.856.001 3.598.723 4.907 2.034 1.31 1.311 2.031 3.054 2.03 4.908-.001 3.825-3.113 6.938-6.937 6.938z"/>
                </svg>
                <a
                  href={config.contacto.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white"
                >
                  WhatsApp
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <a
                  href={`https://instagram.com/${config.contacto.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white"
                >
                  {config.contacto.instagram}
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
                <a
                  href={`https://facebook.com/${config.contacto.facebook.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white"
                >
                  {config.contacto.facebook}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer legal */}
        <div className="border-t border-gray-700 pt-8">
          <p className="text-gray-400 text-sm text-center">
            © {new Date().getFullYear()} Serfibanc SpA. Todos los derechos reservados.
          </p>
          
          {/* Enlaces a políticas */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-4 mb-4">
            <button
              onClick={() => abrirModal('privacidad')}
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Políticas de Privacidad
            </button>
            <span className="text-gray-600">•</span>
            <button
              onClick={() => abrirModal('terminos')}
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Términos y Condiciones
            </button>
            <span className="text-gray-600">•</span>
            <button
              onClick={() => abrirModal('cookies')}
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Política de Cookies
            </button>
          </div>

          <p className="text-gray-500 text-xs text-center mt-2">
            Serfibanc SpA no es banco ni institución financiera. Las operaciones se gestionan
            con instituciones reguladas en Chile. Las simulaciones son referenciales y pueden
            variar según evaluación final de la entidad financiera.
          </p>
        </div>
      </div>

      {/* Modales de políticas */}
      {modalAbierto && (
        <PoliticasModal
          tipo={modalAbierto}
          onClose={() => setModalAbierto(null)}
        />
      )}
    </footer>
  );
};

export default Footer;


