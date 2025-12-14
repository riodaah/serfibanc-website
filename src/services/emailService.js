/**
 * Servicio de EmailJS para Serfibanc
 * 
 * CONFIGURACIÓN REQUERIDA EN EMAILJS:
 * 1. Crear cuenta en https://www.emailjs.com/
 * 2. Agregar Email Service (SMTP de tu proveedor)
 * 3. Crear 2 templates: contacto y simulacion
 * 4. Obtener Public Key, Service ID y Template IDs
 */

// Configuración de EmailJS - CAMBIAR ESTOS VALORES
const EMAILJS_CONFIG = {
  publicKey: 'OwkTPiRXxkmfE32-a', // Reemplazar con tu Public Key de EmailJS
  serviceId: 'service_iqqkigw', // Reemplazar con tu Service ID
  templates: {
    contacto: 'template_c95r9tt', // Template para formulario de contacto
    simulacion: 'template_ps70ml9' // Template para simulaciones
  }
};

/**
 * Inicializar EmailJS (llamar una vez al cargar la app)
 */
export const initEmailJS = () => {
  if (typeof window !== 'undefined' && window.emailjs) {
    window.emailjs.init(EMAILJS_CONFIG.publicKey);
    console.log('✅ EmailJS inicializado');
  }
};

/**
 * Enviar email de formulario de contacto
 */
export const enviarEmailContacto = async (datos) => {
  // Si EmailJS no está configurado, simular envío
  if (EMAILJS_CONFIG.publicKey === 'TU_PUBLIC_KEY') {
    console.log('📧 [SIMULADO] Enviando email de contacto:', datos);
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true, simulado: true };
  }

  try {
    const templateParams = {
      from_name: datos.nombre,
      from_email: datos.email,
      from_phone: datos.telefono,
      tipo_credito: datos.tipoCredito,
      message: datos.mensaje,
      to_email: 'contacto@serfibanc.cl'
    };

    const response = await window.emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templates.contacto,
      templateParams,
      EMAILJS_CONFIG.publicKey  // Agregar public key aquí
    );

    console.log('✅ Email de contacto enviado:', response);
    return { success: true, response };
  } catch (error) {
    console.error('❌ Error enviando email de contacto:', error);
    return { success: false, error };
  }
};

/**
 * Enviar email de simulación de crédito
 * ENVÍA DOS EMAILS:
 * 1. Al admin (contacto@serfibanc.cl) con los datos de la simulación
 * 2. Al cliente (email del formulario) con copia de su simulación
 */
export const enviarEmailSimulacion = async (datos) => {
  // Si EmailJS no está configurado, simular envío
  if (EMAILJS_CONFIG.publicKey === 'TU_PUBLIC_KEY') {
    console.log('📧 [SIMULADO] Enviando email de simulación:', datos);
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true, simulado: true };
  }

  try {
    // Formatear monto para mostrar
    const formatMonto = (monto) => {
      return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        minimumFractionDigits: 0
      }).format(monto);
    };

    const templateParamsBase = {
      // Datos del cliente
      cliente_nombre: datos.nombre,
      cliente_email: datos.email,
      cliente_telefono: datos.telefono,
      
      // Datos de la simulación
      tipo_credito: datos.tipoCredito,
      monto_solicitado: formatMonto(datos.monto),
      cantidad_cuotas: datos.cuotas,
      tasa_interes: datos.tasaInteres,
      cuota_mensual: formatMonto(datos.cuotaMensual),
      
      // Metadatos
      fecha: new Date().toLocaleDateString('es-CL'),
      hora: new Date().toLocaleTimeString('es-CL')
    };

    // 1️⃣ Enviar email al ADMIN
    console.log('📧 [1/2] Enviando email al admin...');
    const responseAdmin = await window.emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templates.simulacion,
      {
        ...templateParamsBase,
        to_email: 'contacto@serfibanc.cl'
      },
      EMAILJS_CONFIG.publicKey
    );
    console.log('✅ Email al admin enviado:', responseAdmin);

    // 2️⃣ Enviar email al CLIENTE
    console.log('📧 [2/2] Enviando email al cliente...');
    const responseCliente = await window.emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templates.simulacion,
      {
        ...templateParamsBase,
        to_email: datos.email  // Email del cliente
      },
      EMAILJS_CONFIG.publicKey
    );
    console.log('✅ Email al cliente enviado:', responseCliente);

    return { 
      success: true, 
      responseAdmin, 
      responseCliente,
      message: 'Emails enviados al admin y al cliente'
    };
  } catch (error) {
    console.error('❌ Error enviando email de simulación:', error);
    return { success: false, error };
  }
};

/**
 * Verificar si EmailJS está configurado
 */
export const isEmailJSConfigured = () => {
  return EMAILJS_CONFIG.publicKey !== 'TU_PUBLIC_KEY';
};

export default {
  initEmailJS,
  enviarEmailContacto,
  enviarEmailSimulacion,
  isEmailJSConfigured
};

