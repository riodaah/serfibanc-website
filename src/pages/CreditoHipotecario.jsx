import { motion } from 'framer-motion';
import { useState } from 'react';
import SimuladorHipotecario from '../components/SimuladorHipotecario';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const CreditoHipotecario = () => {
  const [preguntaAbierta, setPreguntaAbierta] = useState(null);
  
  // SEO optimizado
  const seoData = {
    title: "Simula tu Crédito Hipotecario Online | Serfibanc Chile",
    description: "Simula tu crédito hipotecario gratis. Financia hasta el 100% de tu vivienda. Las mejores tasas del mercado. Asesoría completa hasta la escritura. ¡Cotiza ahora!",
    keywords: "simula tu crédito, simulador crédito hipotecario, crédito vivienda Chile, préstamo casa, financiamiento hipotecario, comprar casa Chile, Serfibanc",
    canonical: "https://serfibanc.cl/credito-hipotecario"
  };

  const beneficios = [
    {
      icon: '🏡',
      titulo: 'Tu Casa Propia',
      descripcion: 'Te ayudamos a financiar hasta el 100% del valor de la propiedad (ahorros mínimos desde $3.000.000)'
    },
    {
      icon: '📊',
      titulo: 'Mejores Tasas',
      descripcion: 'Buscamos la mejor alternativa según monto ($), tasa (%) y plazos de pago'
    },
    {
      icon: '🔍',
      titulo: 'Asesoría Completa',
      descripcion: 'Te acompañamos en todo el proceso hasta la entrega de la propiedad'
    },
    {
      icon: '✅',
      titulo: 'Sin Sorpresas',
      descripcion: 'Contratos de servicios para cada asesoría y gestión'
    }
  ];

  const faqs = [
    {
      pregunta: '¿Qué porcentaje del valor de la propiedad pueden financiar?',
      respuesta: 'Dependiendo de tu perfil crediticio y la política de cada institución, se puede financiar entre el 80% y 100% del valor de tasación de la propiedad.'
    },
    {
      pregunta: '¿Cuánto debo tener de pie?',
      respuesta: 'Generalmente se requiere entre un 10% y 20% del valor de la propiedad como pie, más gastos operacionales (tasación, estudio de títulos, escritura, etc.).'
    },
    {
      pregunta: '¿Qué documentos necesito?',
      respuesta: 'Cédula de identidad, últimas 3 liquidaciones de sueldo, certificado de AFP, promesa de compraventa o reserva de la propiedad, y tasación de la propiedad.'
    },
    {
      pregunta: '¿Cuánto tiempo demora el proceso?',
      respuesta: 'Desde la solicitud hasta el desembolso pueden pasar entre 30 a 60 días, dependiendo de la rapidez en reunir los documentos y la evaluación del banco.'
    },
    {
      pregunta: '¿Puedo comprar una propiedad usada?',
      respuesta: 'Sí, puedes financiar tanto propiedades nuevas como usadas. Cada caso se evalúa según las condiciones de la propiedad y tu capacidad de pago.'
    }
  ];

  return (
    <div className="pt-20">
      <SEO {...seoData} />
      
      {/* Hero específico */}
      <section className="relative min-h-[60vh] flex items-center bg-gradient-to-br from-green-600 via-green-700 to-green-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/imagenes/Creditos-Hipotecarios.webp"
            alt="Crédito Hipotecario"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-green-700/60"></div>

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
              Crédito Hipotecario
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 mb-4">
              Tu casa propia está más cerca de lo que piensas
            </p>
            <p className="text-lg text-gray-200">
              Te ayudamos a conseguir tu crédito hipotecario con bancos e instituciones financieras reguladas.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-dark mb-12 text-center">
            Beneficios del Crédito Hipotecario
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
                Simula tu Crédito Hipotecario
              </h2>
              <p className="text-gray-600 text-lg">
                Calcula la cuota estimada de tu futuro hogar
              </p>
            </motion.div>

            <SimuladorHipotecario />
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
            ¿Listo para tener tu casa propia?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Te acompañamos en cada paso del proceso para hacer realidad tu sueño de tener tu hogar
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

export default CreditoHipotecario;

