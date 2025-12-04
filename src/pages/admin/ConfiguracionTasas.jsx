import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const ConfiguracionTasas = () => {
  const navigate = useNavigate();
  const { usuario, isAuthenticated } = useAuth();
  
  const [tasas, setTasas] = useState({
    pyme: 1.2,
    hipotecario: 0.8,
    automotriz: 1.0
  });
  const [guardando, setGuardando] = useState(false);
  const [guardado, setGuardado] = useState(false);

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

  const handleChange = (tipo, valor) => {
    const valorNumerico = parseFloat(valor) || 0;
    setTasas(prev => ({
      ...prev,
      [tipo]: valorNumerico
    }));
    setGuardado(false);
  };

  const handleGuardar = async () => {
    setGuardando(true);
    
    // Simular guardado (en producción sería a DynamoDB)
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Guardar en localStorage
    localStorage.setItem('serfibanc_tasas', JSON.stringify(tasas));
    
    // También actualizar el evento para que los simuladores se enteren
    window.dispatchEvent(new CustomEvent('tasasActualizadas', { detail: tasas }));
    
    setGuardando(false);
    setGuardado(true);
    
    // Quitar mensaje después de 3 segundos
    setTimeout(() => setGuardado(false), 3000);
  };

  if (!isAuthenticated) {
    return null;
  }

  const tiposCredito = [
    {
      id: 'pyme',
      nombre: 'Crédito PYME',
      descripcion: 'Financiamiento para empresas y emprendedores',
      color: 'blue',
      tipoTasa: 'mensual', // Tasa mensual para PYME
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      id: 'hipotecario',
      nombre: 'Crédito Hipotecario',
      descripcion: 'Financiamiento para vivienda (tasa ANUAL)',
      color: 'green',
      tipoTasa: 'anual', // Tasa anual para Hipotecario
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      id: 'automotriz',
      nombre: 'Crédito Automotriz',
      descripcion: 'Financiamiento para vehículos',
      color: 'purple',
      tipoTasa: 'mensual', // Tasa mensual para Automotriz
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        icon: 'text-blue-600 bg-blue-100',
        input: 'focus:ring-blue-500 focus:border-blue-500'
      },
      green: {
        bg: 'bg-green-50',
        border: 'border-green-200',
        icon: 'text-green-600 bg-green-100',
        input: 'focus:ring-green-500 focus:border-green-500'
      },
      purple: {
        bg: 'bg-purple-50',
        border: 'border-purple-200',
        icon: 'text-purple-600 bg-purple-100',
        input: 'focus:ring-purple-500 focus:border-purple-500'
      }
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#020617] to-[#1e1b4b] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link to="/admin/dashboard" className="text-gray-300 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
              <div>
                <h1 className="text-lg font-semibold">Configuración de Tasas</h1>
                <p className="text-xs text-gray-300">Administrar tasas de interés</p>
              </div>
            </div>

            <span className="text-sm text-gray-300">
              {usuario?.email}
            </span>
          </div>
        </div>
      </header>

      {/* Contenido */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Título */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Tasas de Interés</h2>
            <p className="text-gray-600 mt-1">
              Configura las tasas que se aplicarán en los simuladores de crédito.
            </p>
            <p className="text-sm text-amber-600 mt-2">
              ⚠️ Nota: PYME y Automotriz usan tasa <strong>mensual</strong>, Hipotecario usa tasa <strong>anual</strong>.
            </p>
          </div>

          {/* Cards de tasas */}
          <div className="space-y-6">
            {tiposCredito.map((tipo, index) => {
              const colorClasses = getColorClasses(tipo.color);
              return (
                <motion.div
                  key={tipo.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`${colorClasses.bg} ${colorClasses.border} border rounded-xl p-6`}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    {/* Info */}
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`${colorClasses.icon} p-3 rounded-xl`}>
                        {tipo.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{tipo.nombre}</h3>
                        <p className="text-sm text-gray-600">{tipo.descripcion}</p>
                      </div>
                    </div>

                    {/* Input */}
                    <div className="flex items-center gap-3">
                      <label className="text-sm font-medium text-gray-700">
                        Tasa {tipo.tipoTasa}:
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          max="100"
                          value={tasas[tipo.id]}
                          onChange={(e) => handleChange(tipo.id, e.target.value)}
                          className={`w-24 px-3 py-2 border border-gray-300 rounded-lg text-center font-semibold ${colorClasses.input} transition-all`}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                          %
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Botón guardar */}
          <div className="mt-8 flex items-center justify-between">
            <Link
              to="/admin/dashboard"
              className="text-gray-600 hover:text-gray-800 transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver al Dashboard
            </Link>

            <div className="flex items-center gap-4">
              {guardado && (
                <motion.span
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-green-600 font-medium flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Cambios guardados
                </motion.span>
              )}

              <button
                onClick={handleGuardar}
                disabled={guardando}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/30 flex items-center gap-2"
              >
                {guardando ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Guardando...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Guardar Cambios
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Nota informativa */}
          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <div className="flex gap-3">
              <svg className="w-6 h-6 text-yellow-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h4 className="font-semibold text-yellow-800">Nota importante</h4>
                <p className="text-sm text-yellow-700 mt-1">
                  Las tasas son referenciales y se aplican en los simuladores del sitio. 
                  La tasa final dependerá de la evaluación de la institución financiera.
                  Los cambios se aplican inmediatamente en el sitio web.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default ConfiguracionTasas;




