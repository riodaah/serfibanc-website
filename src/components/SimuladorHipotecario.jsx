import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import config from '../config.json';
import { formatearMonto, calcularCuotaMensual } from '../services/simulacionApi';
import SimulacionResumenModal from './SimulacionResumenModal';
import { firestoreTasasService } from '../services/firestoreTasasService';

const SimuladorHipotecario = () => {
  const configSimulacion = config.simulacion.hipotecario;
  
  const [formData, setFormData] = useState({
    monto: configSimulacion.opcionesMonto[2] || configSimulacion.opcionesMonto[0],
    cuotas: configSimulacion.opcionesCuotas[2] || configSimulacion.opcionesCuotas[0], // En años
    aceptaWhatsapp: false,
    aceptaCondiciones: false
  });

  const [cuotaCalculada, setCuotaCalculada] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [errores, setErrores] = useState({});
  const [tasaDinamica, setTasaDinamica] = useState(config.simulacion.tasaInteresPorDefecto);

  // Cargar tasas desde Firestore (configuradas por admin)
  useEffect(() => {
    const cargarTasas = async () => {
      try {
        console.log('📥 [Hipotecario] Cargando tasas desde Firestore...');
        const tasas = await firestoreTasasService.obtenerTasas();
        console.log('✅ [Hipotecario] Tasas obtenidas:', tasas);
        
        if (tasas.hipotecario) {
          console.log('✅ [Hipotecario] Aplicando tasa:', tasas.hipotecario);
          setTasaDinamica(tasas.hipotecario);
        }
      } catch (e) {
        console.error('❌ [Hipotecario] Error cargando tasas:', e);
      }
    };

    cargarTasas();

    // Suscribirse a cambios en tiempo real
    const unsubscribe = firestoreTasasService.suscribirCambios((tasas) => {
      if (tasas.hipotecario) {
        console.log('🔄 [Hipotecario] Tasa actualizada en tiempo real:', tasas.hipotecario);
        setTasaDinamica(tasas.hipotecario);
      }
    });

    // Escuchar cambios de tasas (cuando admin las actualiza en la misma pestaña)
    const handleTasasActualizadas = (event) => {
      const tasas = event.detail;
      if (tasas.hipotecario) {
        console.log('📡 [Hipotecario] Actualizando tasa desde evento:', tasas.hipotecario);
        setTasaDinamica(tasas.hipotecario);
      }
    };

    window.addEventListener('tasasActualizadas', handleTasasActualizadas);
    
    return () => {
      unsubscribe();
      window.removeEventListener('tasasActualizadas', handleTasasActualizadas);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    // Limpiar error del campo
    if (errores[name]) {
      setErrores({ ...errores, [name]: null });
    }
  };

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!formData.monto) nuevosErrores.monto = 'Selecciona un monto';
    if (!formData.cuotas) nuevosErrores.cuotas = 'Selecciona cantidad de años';
    if (!formData.aceptaWhatsapp) nuevosErrores.aceptaWhatsapp = 'Debes aceptar contacto por WhatsApp';
    if (!formData.aceptaCondiciones) nuevosErrores.aceptaCondiciones = 'Debes aceptar las condiciones';

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSimular = (e) => {
    e.preventDefault();
    
    if (!validarFormulario()) {
      return;
    }

    // Para crédito hipotecario, la tasa configurada es ANUAL
    const tasaAnual = tasaDinamica;
    const años = parseInt(formData.cuotas);
    const meses = años * 12; // Convertir años a meses para el cálculo
    
    // Convertir tasa anual a mensual para el cálculo del Sistema Francés
    const tasaMensual = tasaAnual / 12;
    
    const cuota = calcularCuotaMensual(
      parseInt(formData.monto),
      tasaMensual,
      meses
    );

    setCuotaCalculada({
      monto: parseInt(formData.monto),
      cuotas: meses, // Guardamos en meses para el cálculo
      cuotasAnios: años, // Guardamos años para mostrar
      tasa: tasaAnual, // Mostramos la tasa anual
      tasaAnual: true, // Flag para indicar que es tasa anual
      cuotaMensual: cuota,
      tipo: 'Hipotecario'
    });

    setMostrarModal(true);
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="mb-8">
          <h3 className="font-display text-2xl md:text-3xl font-bold text-primary-dark mb-2">
            Simulador de Crédito Hipotecario
          </h3>
          <p className="text-gray-600">
            Completa los datos para obtener una simulación referencial
          </p>
        </div>

        <form onSubmit={handleSimular} className="space-y-6">
          {/* Monto del Crédito */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Monto del Crédito <span className="text-red-500">*</span>
            </label>
            <select
              name="monto"
              value={formData.monto}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border ${errores.monto ? 'border-red-500' : 'border-gray-300'} focus:border-primary-medium focus:ring-2 focus:ring-primary-light/50 outline-none transition-all`}
            >
              <option value="">Seleccionar valor</option>
              {configSimulacion.opcionesMonto.map((monto) => (
                <option key={monto} value={monto}>
                  {formatearMonto(monto)}
                </option>
              ))}
            </select>
            {errores.monto && <p className="text-red-500 text-sm mt-1">{errores.monto}</p>}
          </div>

          {/* Cantidad de Años (no meses) */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Plazo del Crédito <span className="text-red-500">*</span>
            </label>
            <select
              name="cuotas"
              value={formData.cuotas}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border ${errores.cuotas ? 'border-red-500' : 'border-gray-300'} focus:border-primary-medium focus:ring-2 focus:ring-primary-light/50 outline-none transition-all`}
            >
              <option value="">Seleccionar valor</option>
              {configSimulacion.opcionesCuotas.map((años) => (
                <option key={años} value={años}>
                  {años} {años === 1 ? 'año' : 'años'}
                </option>
              ))}
            </select>
            {errores.cuotas && <p className="text-red-500 text-sm mt-1">{errores.cuotas}</p>}
          </div>

          {/* Tasa de Interés - Para hipotecario es ANUAL */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tasa de interés anual promedio
            </label>
            <div className="bg-gray-50 px-4 py-3 rounded-lg border border-gray-300">
              <span className="text-gray-700">
                {tasaDinamica}% anual
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Tasa referencial anual, puede variar según institución financiera
            </p>
          </div>

          {/* Checkboxes */}
          <div className="space-y-3">
            <label className={`flex items-start cursor-pointer ${errores.aceptaWhatsapp ? 'text-red-500' : ''}`}>
              <input
                type="checkbox"
                name="aceptaWhatsapp"
                checked={formData.aceptaWhatsapp}
                onChange={handleChange}
                className="mt-1 w-4 h-4 text-primary-medium focus:ring-primary-light rounded"
              />
              <span className="ml-3 text-sm">
                Acepto que me contacten por WhatsApp <span className="text-red-500">*</span>
              </span>
            </label>

            <label className={`flex items-start cursor-pointer ${errores.aceptaCondiciones ? 'text-red-500' : ''}`}>
              <input
                type="checkbox"
                name="aceptaCondiciones"
                checked={formData.aceptaCondiciones}
                onChange={handleChange}
                className="mt-1 w-4 h-4 text-primary-medium focus:ring-primary-light rounded"
              />
              <span className="ml-3 text-sm">
                Acepto las condiciones de simulación y políticas de privacidad <span className="text-red-500">*</span>
              </span>
            </label>
          </div>

          {/* Botón de simulación */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full btn-primary text-lg py-4"
          >
            Simular Crédito
          </motion.button>

          {/* Disclaimer */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Importante:</strong> Esta es una simulación referencial. La aprobación y condiciones finales dependen de la evaluación de la institución financiera.
            </p>
          </div>
        </form>
      </div>

      {/* Modal de resumen */}
      {mostrarModal && cuotaCalculada && (
        <SimulacionResumenModal
          simulacion={cuotaCalculada}
          datosFormulario={formData}
          onClose={() => setMostrarModal(false)}
        />
      )}
    </>
  );
};

export default SimuladorHipotecario;


