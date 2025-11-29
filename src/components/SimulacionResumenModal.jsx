import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatearMonto } from '../services/simulacionApi';
import { enviarEmailSimulacion } from '../services/emailService';
import config from '../config.json';

const SimulacionResumenModal = ({ simulacion, datosFormulario, onClose }) => {
  const [paso, setPaso] = useState('contacto'); // 'contacto' o 'resultado'
  const [datosContacto, setDatosContacto] = useState({
    nombre: '',
    email: '',
    telefono: ''
  });

  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setDatosContacto({
      ...datosContacto,
      [e.target.name]: e.target.value
    });
  };

  const handleContinuarAResultado = (e) => {
    e.preventDefault();
    // Validar que los campos estén completos
    if (!datosContacto.nombre || !datosContacto.email || !datosContacto.telefono) {
      setError('Por favor completa todos los campos');
      return;
    }
    // Pasar al paso de resultado
    setPaso('resultado');
    setError(null);
  };

  const handleEnviar = async () => {
    setEnviando(true);
    setError(null);

    try {
      const datosCompletos = {
        // Datos de contacto
        nombre: datosContacto.nombre,
        email: datosContacto.email,
        telefono: datosContacto.telefono,
        // Datos de la simulación
        tipoCredito: simulacion.tipo,
        monto: simulacion.monto,
        cuotas: simulacion.cuotas,
        tasaInteres: simulacion.tasa,
        cuotaMensual: simulacion.cuotaMensual,
        ingresoMensual: datosFormulario.ingresoMensual,
        antiguedad: datosFormulario.antiguedad
      };

      // Enviar vía EmailJS
      const resultado = await enviarEmailSimulacion(datosCompletos);
      
      if (resultado.success) {
        setEnviado(true);
        // Cerrar modal después de 3 segundos
        setTimeout(() => {
          onClose();
        }, 3000);
      } else {
        throw new Error('Error al enviar');
      }
    } catch (err) {
      setError('Hubo un error al enviar la simulación. Por favor, intenta nuevamente.');
      setEnviando(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          {!enviado ? (
            <div className="p-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-dark mb-2">
                    {paso === 'contacto' ? 'Completa tus datos' : 'Resumen de tu Simulación'}
                  </h2>
                  <p className="text-gray-600">
                    {paso === 'contacto' 
                      ? 'Ingresa tu información para ver el resultado de tu simulación' 
                      : 'Revisa los datos de tu simulación'}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Formulario de contacto */}
              <form onSubmit={handleContinuarAResultado} className="space-y-4 mb-6">
                {paso === 'contacto' && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800">
                      ℹ️ Necesitamos tus datos para enviarte el resultado de la simulación
                    </p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nombre Completo <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    required
                    disabled={paso === 'resultado'}
                    value={datosContacto.nombre}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-medium focus:ring-2 focus:ring-primary-light/50 outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="Juan Pérez"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    disabled={paso === 'resultado'}
                    value={datosContacto.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-medium focus:ring-2 focus:ring-primary-light/50 outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="juan@ejemplo.cl"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Teléfono / WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    required
                    disabled={paso === 'resultado'}
                    value={datosContacto.telefono}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-medium focus:ring-2 focus:ring-primary-light/50 outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="+56 9 1234 5678"
                  />
                </div>

                {paso === 'contacto' && (
                  <>
                    {error && (
                      <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                        {error}
                      </div>
                    )}

                    <div className="flex gap-4 pt-4">
                      <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 btn-secondary"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300"
                      >
                        Ver Resultado →
                      </button>
                    </div>
                  </>
                )}
              </form>

              {/* Resultado - aparece después de completar datos */}
              {paso === 'resultado' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  {/* Resumen de simulación */}
                  <div className="bg-gradient-to-br from-[#1e3a8a] to-[#3730a3] text-white rounded-xl p-6">
                    <h3 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Resultado de tu Simulación
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-200 mb-1">Tipo de Crédito</p>
                        <p className="text-lg font-semibold">Crédito {simulacion.tipo}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-200 mb-1">Monto Solicitado</p>
                        <p className="text-lg font-semibold">{formatearMonto(simulacion.monto)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-200 mb-1">Plazo</p>
                        <p className="text-lg font-semibold">{simulacion.cuotas} meses</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-200 mb-1">Tasa de Interés</p>
                        <p className="text-lg font-semibold">{simulacion.tasa}% mensual</p>
                      </div>
                    </div>
                    
                    <div className="border-t border-white/20 pt-4">
                      <p className="text-sm text-gray-200 mb-1">Valor Cuota Estimada</p>
                      <p className="text-4xl font-bold">{formatearMonto(simulacion.cuotaMensual)}</p>
                      <p className="text-xs text-gray-300 mt-2">
                        *Valor referencial, sujeto a aprobación de la institución financiera
                      </p>
                    </div>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                      {error}
                    </div>
                  )}

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setPaso('contacto')}
                      className="flex-1 btn-secondary"
                    >
                      ← Editar Datos
                    </button>
                    <button
                      onClick={handleEnviar}
                      disabled={enviando}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {enviando ? 'Enviando...' : 'Confirmar y Enviar'}
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          ) : (
            /* Mensaje de éxito */
            <div className="p-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>

              <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-dark mb-4">
                ¡Simulación Enviada!
              </h2>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                Hemos recibido tu simulación de <strong>Crédito {simulacion.tipo}</strong>.
                <br />
                Un asesor de Serfibanc se contactará contigo en breve para ayudarte con el proceso.
              </p>

              <div className="bg-primary-light/10 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-700">
                  También enviamos un resumen de tu simulación a <strong>{datosContacto.email}</strong>
                </p>
              </div>

              <a
                href={config.contacto.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-600 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 1.856.001 3.598.723 4.907 2.034 1.31 1.311 2.031 3.054 2.03 4.908-.001 3.825-3.113 6.938-6.937 6.938z"/>
                </svg>
                Chatear por WhatsApp
              </a>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SimulacionResumenModal;

