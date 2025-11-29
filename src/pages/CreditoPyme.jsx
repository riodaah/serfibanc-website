import { motion } from 'framer-motion';
import { useState } from 'react';
import SimuladorCredito from '../components/SimuladorCredito';
import { Link } from 'react-router-dom';

const CreditoPyme = () => {
  const [preguntaAbierta, setPreguntaAbierta] = useState(null);

  const beneficios = [
    {
      icon: '💰',
      titulo: 'Montos Flexibles',
      descripcion: 'Desde $5.000.000 hasta $200.000.000 según tu necesidad'
    },
    {
      icon: '📅',
      titulo: 'Plazos Extendidos',
      descripcion: 'Hasta 60 meses para pagar tu crédito'
    },
    {
      icon: '⚡',
      titulo: 'Respuesta Rápida',
      descripcion: 'Evaluación comercial en menos de 48 horas'
    },
    {
      icon: '🎯',
      titulo: 'Sin Costo Inicial',
      descripcion: 'Paga solo si hay resultados positivos'
    }
  ];

  const faqs = [
    {
      pregunta: '¿Qué documentos necesito?',
      respuesta: 'Generalmente necesitas: últimas 6 declaraciones de IVA, balance, carpeta tributaria, flujo de caja, y escrituras si hay garantías. Nuestros asesores te guiarán en el proceso.'
    },
    {
      pregunta: '¿Cuánto tiempo demora la aprobación?',
      respuesta: 'La evaluación comercial toma entre 24 a 48 horas. Una vez enviada a la institución financiera, el proceso completo puede tomar entre 5 a 15 días hábiles.'
    },
    {
      pregunta: '¿Puedo obtener crédito si soy empresa nueva?',
      respuesta: 'Se requiere antigüedad mínima de 6 meses como empresa. Las ventas mensuales recomendadas son desde $5.000.000.'
    },
    {
      pregunta: '¿Qué instituciones financieras trabajan con ustedes?',
      respuesta: 'Trabajamos con bancos e instituciones financieras reguladas en Chile. Según tu perfil, te ayudamos a encontrar la mejor alternativa.'
    },
    {
      pregunta: '¿Cobran por la asesoría?',
      respuesta: 'Las evaluaciones comerciales son sin costo. El pago de nuestros servicios es contra resultados positivos.'
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero específico */}
      <section className="relative min-h-[60vh] flex items-center bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/Imagenes/Credito-empresa.webp"
            alt="Crédito PYME"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-700/60"></div>

        <div className="container-custom relative z-10 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <Link to="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver al inicio
            </Link>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Crédito PYME
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 mb-4">
              Financiamiento para capital de trabajo, inversión y crecimiento de tu empresa
            </p>
            <p className="text-lg text-gray-200">
              Te ayudamos a conseguir el crédito que tu negocio necesita con instituciones financieras reguladas.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-dark mb-12 text-center">
            Beneficios del Crédito PYME
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {beneficios.map((beneficio, index) => (
              <motion.div
                key={beneficio.titulo}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl mb-4">{beneficio.icon}</div>
                <h3 className="font-display text-xl font-bold text-primary-dark mb-2">
                  {beneficio.titulo}
                </h3>
                <p className="text-gray-600">{beneficio.descripcion}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Simulador */}
      <section className="section-padding bg-secondary-light">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-dark mb-4">
                Simula tu Crédito PYME
              </h2>
              <p className="text-gray-600 text-lg">
                Obtén una cotización personalizada en minutos
              </p>
            </motion.div>

            <SimuladorCredito tipo="PYME" />
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-dark mb-12 text-center">
            Preguntas Frecuentes
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setPreguntaAbierta(preguntaAbierta === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors text-left"
                >
                  <span className="font-semibold text-gray-900">{faq.pregunta}</span>
                  <svg
                    className={`w-5 h-5 text-primary-medium transition-transform ${preguntaAbierta === index ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {preguntaAbierta === index && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-700 leading-relaxed">{faq.respuesta}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="section-padding bg-primary-dark text-white text-center">
        <div className="container-custom">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            ¿Listo para hacer crecer tu negocio?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Nuestros asesores están listos para ayudarte a conseguir el financiamiento que necesitas
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#simulador" onClick={() => window.scrollTo({ top: document.getElementById('simulador')?.offsetTop - 100, behavior: 'smooth' })} className="btn-primary">
              Simular Crédito
            </a>
            <Link to="/#contacto" className="btn-secondary bg-white/10 border-white text-white hover:bg-white/20">
              Contactar Asesor
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreditoPyme;

