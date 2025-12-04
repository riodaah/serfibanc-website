/**
 * Servicio para enviar simulaciones de crédito
 * 
 * TODO: Integrar con backend real o Make.com para:
 * - Enviar correo al cliente con resumen de simulación
 * - Enviar correo al administrador con datos del lead
 * - Guardar en base de datos para seguimiento
 */

export const enviarSimulacion = async (datos) => {
  console.log('📧 Enviando simulación:', datos);
  
  // TODO: Reemplazar con fetch real a tu backend o webhook de Make
  // Ejemplo:
  // const response = await fetch('/api/simulacion', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(datos),
  // });
  // return response.json();
  
  // Simulación de envío exitoso
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Simulación enviada correctamente',
        datos: datos
      });
    }, 1500);
  });
};

/**
 * Función auxiliar para formatear montos en CLP
 */
export const formatearMonto = (monto) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(monto);
};

/**
 * Calcular cuota mensual usando sistema francés
 * Formula: C = P * [i * (1 + i)^n] / [(1 + i)^n - 1]
 * Donde:
 * - C = Cuota mensual
 * - P = Principal (monto del crédito)
 * - i = Tasa de interés mensual (en decimal)
 * - n = Número de cuotas
 */
export const calcularCuotaMensual = (monto, tasaMensual, numeroCuotas) => {
  const i = tasaMensual / 100; // Convertir porcentaje a decimal
  const potencia = Math.pow(1 + i, numeroCuotas);
  const cuota = monto * (i * potencia) / (potencia - 1);
  return Math.round(cuota);
};





