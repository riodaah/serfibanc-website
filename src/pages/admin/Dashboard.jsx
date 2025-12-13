import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { usuario, logout, isAuthenticated } = useAuth();
  const [tasas, setTasas] = useState({
    pyme: 1.2,
    hipotecario: 0.8,
    automotriz: 1.0
  });

  // Proteger ruta
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  // Cargar tasas guardadas
  useEffect(() => {
    const tasasGuardadas = localStorage.getItem('serfibanc_tasas');
    if (tasasGuardadas) {
      try {
        setTasas(JSON.parse(tasasGuardadas));
      } catch (e) {
        console.error('Error cargando tasas:', e);
      }
    }
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#020617] to-[#1e1b4b] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="bg-white rounded-lg p-1.5">
                <img
                  src="/imagenes/logo.webp"
                  alt="Serfibanc"
                  className="h-8 w-auto"
                />
              </div>
              <div>
                <h1 className="text-lg font-semibold">Panel de Administración</h1>
                <p className="text-xs text-gray-300">Serfibanc SpA</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-300">
                Hola, <strong>{usuario?.nombre}</strong>
              </span>
              <button
                onClick={handleLogout}
                className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm transition-colors"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Contenido */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Bienvenida */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-md p-6 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Bienvenido al Panel de Administración
          </h2>
          <p className="text-gray-600">
            Desde aquí puedes configurar las tasas de interés y gestionar la configuración del sitio.
          </p>
        </motion.div>

        {/* Cards de acciones */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Configurar Tasas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Link
              to="/admin/tasas"
              className="block bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-blue-500"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Tasas de Interés</h3>
                  <p className="text-sm text-gray-500">Configurar tasas por tipo de crédito</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">PYME:</span>
                  <span className="font-medium text-blue-600">{tasas.pyme}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Hipotecario:</span>
                  <span className="font-medium text-blue-600">{tasas.hipotecario}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Automotriz:</span>
                  <span className="font-medium text-blue-600">{tasas.automotriz}%</span>
                </div>
              </div>

              <div className="mt-4 text-blue-600 text-sm font-medium flex items-center gap-1">
                Configurar →
              </div>
            </Link>
          </motion.div>

          {/* Estadísticas (futuro) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-md p-6 border-l-4 border-gray-300 opacity-60"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-600">Estadísticas</h3>
                <p className="text-sm text-gray-400">Próximamente</p>
              </div>
            </div>
            <p className="text-sm text-gray-400">
              Visualiza métricas de simulaciones y contactos.
            </p>
          </motion.div>

          {/* Leads (futuro) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-md p-6 border-l-4 border-gray-300 opacity-60"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-600">Leads</h3>
                <p className="text-sm text-gray-400">Próximamente</p>
              </div>
            </div>
            <p className="text-sm text-gray-400">
              Gestiona los contactos y simulaciones recibidas.
            </p>
          </motion.div>
        </div>

        {/* Info rápida */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-blue-800 mb-2">
            ℹ️ Información
          </h3>
          <p className="text-blue-700 text-sm">
            Las tasas de interés que configures aquí se aplicarán automáticamente en los simuladores del sitio web.
            Los cambios son inmediatos y se guardan en el navegador. Para persistencia permanente, considera integrar
            con AWS DynamoDB.
          </p>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;







