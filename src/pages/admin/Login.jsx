import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login, recuperarPassword } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const [modoRecuperacion, setModoRecuperacion] = useState(false);
  const [mensajeRecuperacion, setMensajeRecuperacion] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setError('');

    const resultado = await login(formData.email, formData.password);

    if (resultado.success) {
      navigate('/admin/dashboard');
    } else {
      setError(resultado.error);
    }
    
    setCargando(false);
  };

  const handleRecuperarPassword = async (e) => {
    e.preventDefault();
    if (!formData.email) {
      setError('Ingresa tu email para recuperar la contraseña');
      return;
    }

    setCargando(true);
    setError('');
    setMensajeRecuperacion('');

    const resultado = await recuperarPassword(formData.email);

    if (resultado.success) {
      setMensajeRecuperacion(resultado.message);
    } else {
      setError(resultado.error);
    }

    setCargando(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0a1628] to-[#1e1b4b] flex items-center justify-center p-4">
      {/* Efectos de fondo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="bg-white rounded-xl p-3 w-fit mx-auto mb-4 shadow-lg">
            <img
              src="/imagenes/logo.webp"
              alt="Serfibanc Logo"
              className="h-12 w-auto"
            />
          </div>
          <h1 className="text-2xl font-bold text-white">Panel de Administración</h1>
          <p className="text-gray-400 mt-2">
            {modoRecuperacion ? 'Recuperar Contraseña' : 'Inicia sesión para continuar'}
          </p>
        </div>

        {/* Formulario */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl">
          <form onSubmit={modoRecuperacion ? handleRecuperarPassword : handleSubmit}>
            {/* Email */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="admin@serfibanc.cl"
              />
            </div>

            {/* Password - Solo si no está en modo recuperación */}
            {!modoRecuperacion && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Contraseña
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
              </div>
            )}

            {/* Mensajes */}
            {error && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-sm">
                {error}
              </div>
            )}

            {mensajeRecuperacion && (
              <div className="mb-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg text-green-300 text-sm">
                {mensajeRecuperacion}
              </div>
            )}

            {/* Botón principal */}
            <button
              type="submit"
              disabled={cargando}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/30"
            >
              {cargando ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Procesando...
                </span>
              ) : modoRecuperacion ? (
                'Enviar Email de Recuperación'
              ) : (
                'Iniciar Sesión'
              )}
            </button>
          </form>

          {/* Link de recuperación */}
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setModoRecuperacion(!modoRecuperacion);
                setError('');
                setMensajeRecuperacion('');
              }}
              className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
            >
              {modoRecuperacion ? '← Volver al login' : '¿Olvidaste tu contraseña?'}
            </button>
          </div>
        </div>

        {/* Volver al sitio */}
        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-gray-400 hover:text-white text-sm transition-colors inline-flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver al sitio web
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;







