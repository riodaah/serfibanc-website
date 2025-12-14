/**
 * Servicio de Google Sheets para Serfibanc
 * 
 * CONFIGURACIÓN REQUERIDA:
 * 1. Abrir el Google Sheet
 * 2. Ir a Extensiones > Apps Script
 * 3. Copiar el código del archivo GOOGLE_APPS_SCRIPT_SETUP.md
 * 4. Deploy como Web App y obtener la URL
 * 5. Pegar la URL en la variable GOOGLE_SHEET_WEBHOOK_URL
 */

// URL del webhook de Google Apps Script
// IMPORTANTE: Reemplazar con la URL de tu Google Apps Script después del deploy
const GOOGLE_SHEET_WEBHOOK_URL = import.meta.env.VITE_GOOGLE_SHEET_WEBHOOK_URL || '';

/**
 * Guardar simulación en Google Sheets
 * @param {Object} datos - Datos de la simulación
 * @returns {Promise<Object>} - Resultado de la operación
 */
export const guardarSimulacionEnSheet = async (datos) => {
  // Si no hay URL configurada, simular guardado
  if (!GOOGLE_SHEET_WEBHOOK_URL) {
    console.warn('⚠️ Google Sheets webhook no configurado');
    console.log('📊 [SIMULADO] Guardando en Google Sheets:', datos);
    return { success: true, simulado: true };
  }

  try {
    console.log('📊 Guardando simulación en Google Sheets...');
    
    // Formatear datos para el sheet
    const datosFormateados = {
      nombre: datos.nombre || '',
      email: datos.email || '',
      telefono: datos.telefono || '',
      tipoCredito: datos.tipoCredito || '',
      fechaSimulacion: new Date().toLocaleString('es-CL', { 
        timeZone: 'America/Santiago' 
      }),
      montoCredito: datos.monto || 0,
      cantidadCuotas: datos.cuotas || 0,
      tasaInteres: datos.tasaInteres || 0,
      valorCuota: Math.round(datos.cuotaMensual || 0),
      contactoWhatsapp: datos.aceptaWhatsapp ? 'Sí' : 'No'
    };

    const response = await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors', // Google Apps Script requiere no-cors
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datosFormateados)
    });

    // Con no-cors no podemos leer la respuesta, pero si no hay error, asumimos éxito
    console.log('✅ Simulación guardada en Google Sheets');
    return { success: true };
    
  } catch (error) {
    console.error('❌ Error guardando en Google Sheets:', error);
    // No fallar la simulación si Google Sheets falla
    return { success: false, error, noBlocking: true };
  }
};

/**
 * Verificar si Google Sheets está configurado
 */
export const isGoogleSheetsConfigured = () => {
  return !!GOOGLE_SHEET_WEBHOOK_URL;
};

export default {
  guardarSimulacionEnSheet,
  isGoogleSheetsConfigured
};

