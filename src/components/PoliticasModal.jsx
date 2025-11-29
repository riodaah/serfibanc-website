import { motion, AnimatePresence } from 'framer-motion';

const PoliticasModal = ({ tipo, onClose }) => {
  const contenido = {
    privacidad: {
      titulo: 'Políticas de Privacidad',
      contenido: (
        <div className="space-y-4 text-gray-700">
          <h3 className="font-semibold text-lg text-gray-900">1. Recopilación de Información</h3>
          <p>En Serfibanc SpA recopilamos información personal cuando utilizas nuestros servicios de simulación de créditos, incluyendo nombre, email, teléfono e información financiera básica.</p>

          <h3 className="font-semibold text-lg text-gray-900">2. Uso de la Información</h3>
          <p>Utilizamos tu información para:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Procesar tu solicitud de simulación de crédito</li>
            <li>Contactarte con los resultados de tu evaluación</li>
            <li>Enviarte información sobre productos financieros</li>
            <li>Mejorar nuestros servicios</li>
          </ul>

          <h3 className="font-semibold text-lg text-gray-900">3. Protección de Datos</h3>
          <p>Nos comprometemos a proteger tu información personal y no compartirla con terceros sin tu consentimiento, excepto cuando sea necesario para procesar tu solicitud con instituciones financieras.</p>

          <h3 className="font-semibold text-lg text-gray-900">4. Tus Derechos</h3>
          <p>Tienes derecho a acceder, rectificar o eliminar tus datos personales en cualquier momento contactándonos a {' '}
            <a href="mailto:contacto@serfibanc.cl" className="text-blue-600 hover:underline">contacto@serfibanc.cl</a>
          </p>

          <h3 className="font-semibold text-lg text-gray-900">5. Cookies</h3>
          <p>Utilizamos cookies para mejorar tu experiencia de navegación. Puedes configurar tu navegador para rechazar cookies, aunque esto puede afectar la funcionalidad del sitio.</p>

          <p className="text-sm text-gray-500 mt-6">
            Última actualización: Noviembre 2024
          </p>
        </div>
      )
    },
    terminos: {
      titulo: 'Términos y Condiciones',
      contenido: (
        <div className="space-y-4 text-gray-700">
          <h3 className="font-semibold text-lg text-gray-900">1. Aceptación de Términos</h3>
          <p>Al utilizar los servicios de Serfibanc SpA, aceptas estos términos y condiciones. Si no estás de acuerdo, por favor no uses nuestros servicios.</p>

          <h3 className="font-semibold text-lg text-gray-900">2. Naturaleza de los Servicios</h3>
          <p><strong>Serfibanc SpA NO es un banco ni institución financiera.</strong> Somos intermediarios financieros que gestionamos créditos con instituciones reguladas en Chile.</p>

          <h3 className="font-semibold text-lg text-gray-900">3. Simulaciones</h3>
          <p>Las simulaciones de crédito son <strong>referenciales</strong>. Los valores, tasas y condiciones finales pueden variar según la evaluación de la institución financiera.</p>

          <h3 className="font-semibold text-lg text-gray-900">4. Evaluación Sin Costo</h3>
          <p>Las evaluaciones comerciales son sin costo inicial. El pago de nuestros servicios es contra resultados positivos en la gestión.</p>

          <h3 className="font-semibold text-lg text-gray-900">5. Responsabilidades</h3>
          <p>Serfibanc actúa como intermediario. La aprobación final del crédito es decisión exclusiva de la institución financiera.</p>

          <h3 className="font-semibold text-lg text-gray-900">6. Modificaciones</h3>
          <p>Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios serán efectivos al publicarse en el sitio web.</p>

          <p className="text-sm text-gray-500 mt-6">
            Última actualización: Noviembre 2024
          </p>
        </div>
      )
    },
    cookies: {
      titulo: 'Política de Cookies',
      contenido: (
        <div className="space-y-4 text-gray-700">
          <h3 className="font-semibold text-lg text-gray-900">¿Qué son las cookies?</h3>
          <p>Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas nuestro sitio web.</p>

          <h3 className="font-semibold text-lg text-gray-900">Cookies que utilizamos</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Cookies esenciales:</strong> Necesarias para el funcionamiento básico del sitio</li>
            <li><strong>Cookies de rendimiento:</strong> Nos ayudan a mejorar el sitio analizando cómo lo usas</li>
            <li><strong>Cookies de funcionalidad:</strong> Recuerdan tus preferencias</li>
          </ul>

          <h3 className="font-semibold text-lg text-gray-900">Control de Cookies</h3>
          <p>Puedes controlar y/o eliminar las cookies cuando lo desees. Puedes eliminar todas las cookies que ya están en tu dispositivo y configurar la mayoría de los navegadores para evitar que se coloquen.</p>

          <p className="text-sm text-gray-500 mt-6">
            Última actualización: Noviembre 2024
          </p>
        </div>
      )
    }
  };

  const data = contenido[tipo] || contenido.privacidad;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#1e3a8a] to-[#3730a3] text-white p-6 flex items-center justify-between">
            <h2 className="font-display text-2xl font-bold">
              {data.titulo}
            </h2>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Contenido */}
          <div className="p-6 overflow-y-auto max-h-[calc(85vh-120px)]">
            {data.contenido}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 p-4 border-t flex justify-end">
            <button
              onClick={onClose}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-6 py-2 rounded-lg transition-all"
            >
              Entendido
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PoliticasModal;

