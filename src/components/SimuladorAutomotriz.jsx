import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import config from '../config.json';
import { formatearMonto, calcularCuotaMensual } from '../services/simulacionApi';
import SimulacionResumenModal from './SimulacionResumenModal';

const SimuladorAutomotriz = () => {
  const configSimulacion = config.simulacion.automotriz;
  
  const [formData, setFormData] = useState({
    monto: configSimulacion.opcionesMonto[2] || configSimulacion.opcionesMonto[0],
    cuotas: configSimulacion.opcionesCuotas[2] || configSimulacion.opcionesCuotas[0],
    ingresoMensual: '',
    antiguedad: '',
    aceptaWhatsapp: false,
    aceptaCondiciones: false
  });

  const [cuotaCalculada, setCuotaCalculada] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [errores, setErrores] = useState({});
  const [tasaDinamica, setTasaDinamica] = useState(config.simulacion.tasaInteresPorDefecto);

  // Cargar tasas dinámicas del localStorage (configuradas por admin)
  useEffect(() => {
    const cargarTasas = () => {
      const tasasGuardadas = localStorage.getItem('serfibanc_tasas');
      console.log('🔍 [Automotriz] Cargando tasas del localStorage:', tasasGuardadas);
      if (tasasGuardadas) {
        try {
          const tasas = JSON.parse(tasasGuardadas);
          console.log('✅ [Automotriz] Tasas parseadas:', tasas);
          if (tasas.automotriz) {
            console.log('✅ [Automotriz] Aplicando tasa:', tasas.automotriz);
            setTasaDinamica(tasas.automotriz);
          } else {
            console.warn('⚠️ [Automotriz] No se encontró tasa para automotriz');
          }
        } catch (e) {
          console.error('❌ [Automotriz] Error cargando tasas:', e);
        }
      } else {
        console.warn('⚠️ [Automotriz] No hay tasas guardadas en localStorage');
      }
    };

    cargarTasas();

    // Escuchar cambios de tasas (cuando admin las actualiza)
    const handleTasasActualizadas = (event) => {
      const tasas = event.detail;
      console.log('📡 [Automotriz] Evento tasasActualizadas recibido:', tasas);
      if (tasas.automotriz) {
        console.log('✅ [Automotriz] Actualizando tasa desde evento:', tasas.automotriz);
        setTasaDinamica(tasas.automotriz);
      }
    };

    window.addEventListener('tasasActualizadas', handleTasasActualizadas);
    return () => window.removeEventListener('tasasActualizadas', handleTasasActualizadas);
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
    if (!formData.cuotas) nuevosErrores.cuotas = 'Selecciona cantidad de cuotas';
    if (!formData.ingresoMensual || formData.ingresoMensual <= 0) {
      nuevosErrores.ingresoMensual = 'Ingresa tu ingreso mensual';
    }
    if (!formData.antiguedad) nuevosErrores.antiguedad = 'Selecciona una opción';
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

    const tasa = tasaDinamica;
    const cuota = calcularCuotaMensual(
      parseInt(formData.monto),
      tasa,
      parseInt(formData.cuotas)
    );

    setCuotaCalculada({
      monto: parseInt(formData.monto),
      cuotas: parseInt(formData.cuotas),
      tasa: tasa,
      cuotaMensual: cuota,
      tipo: 'Automotriz'
    });

    setMostrarModal(true);
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="mb-8">
          <h3 className="font-display text-2xl md:text-3xl font-bold text-primary-dark mb-2">
            Simulador de Crédito Automotriz
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

          {/* Cantidad de Cuotas */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Cantidad de Cuotas <span className="text-red-500">*</span>
            </label>
            <select
              name="cuotas"
              value={formData.cuotas}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border ${errores.cuotas ? 'border-red-500' : 'border-gray-300'} focus:border-primary-medium focus:ring-2 focus:ring-primary-light/50 outline-none transition-all`}
            >
              <option value="">Seleccionar valor</option>
              {configSimulacion.opcionesCuotas.map((cuota) => (
                <option key={cuota} value={cuota}>
                  {cuota} meses
                </option>
              ))}
            </select>
            {errores.cuotas && <p className="text-red-500 text-sm mt-1">{errores.cuotas}</p>}
          </div>

          {/* Ingreso Líquido Mensual */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Ingreso Líquido Mensual <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="ingresoMensual"
              value={formData.ingresoMensual}
              onChange={handleChange}
              min="0"
              className={`w-full px-4 py-3 rounded-lg border ${errores.ingresoMensual ? 'border-red-500' : 'border-gray-300'} focus:border-primary-medium focus:ring-2 focus:ring-primary-light/50 outline-none transition-all`}
              placeholder="0"
            />
            {errores.ingresoMensual && <p className="text-red-500 text-sm mt-1">{errores.ingresoMensual}</p>}
          </div>

          {/* Antigüedad */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Antigüedad <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-6">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="antiguedad"
                  value="si"
                  checked={formData.antiguedad === 'si'}
                  onChange={handleChange}
                  className="w-4 h-4 text-primary-medium focus:ring-primary-light"
                />
                <span className="ml-2 text-gray-700">Sí</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="antiguedad"
                  value="no"
                  checked={formData.antiguedad === 'no'}
                  onChange={handleChange}
                  className="w-4 h-4 text-primary-medium focus:ring-primary-light"
                />
                <span className="ml-2 text-gray-700">No</span>
              </label>
            </div>
            {errores.antiguedad && <p className="text-red-500 text-sm mt-1">{errores.antiguedad}</p>}
          </div>

          {/* Tasa de Interés */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tasa de interés promedio
            </label>
            <div className="bg-gray-50 px-4 py-3 rounded-lg border border-gray-300">
              <span className="text-gray-700">
                {tasaDinamica}% mensual
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Tasa referencial, puede variar según institución financiera
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

export default SimuladorAutomotriz;




