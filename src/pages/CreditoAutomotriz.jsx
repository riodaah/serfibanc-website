import { motion } from 'framer-motion';
import { useState } from 'react';
import SimuladorAutomotriz from '../components/SimuladorAutomotriz';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const CreditoAutomotriz = () => {
  const [preguntaAbierta, setPreguntaAbierta] = useState(null);
  
  // SEO optimizado
  const seoData = {
    title: "Simula tu Crédito Automotriz Online | Serfibanc Chile",
    description: "Simula tu crédito automotriz gratis. Financia hasta el 100% de tu vehículo nuevo o usado. Aprobación rápida en 24-72 horas. ¡Cotiza ahora!",
    keywords: "simula tu crédito, simulador crédito automotriz, crédito auto Chile, préstamo vehículo, financiamiento auto, comprar auto Chile, Serfibanc",
    canonical: "https://serfibanc.cl/credito-automotriz"
  };

  const beneficios = [
    {
      icon: '🚗',
      titulo: 'Hasta 100% Financiamiento',
      descripcion: 'Financia hasta el 100% del valor del vehículo según política de cada institución'
    },
    {
      icon: '⚡',
      titulo: 'Aprobación Rápida',
      descripcion: 'Proceso ágil para que no pierdas la oportunidad de tu vehículo'
    },
    {
      icon: '🔧',
      titulo: 'Nuevos y Usados',
      descripcion: 'Financiamos vehículos nuevos y usados'
    },
    {
      icon: '💳',
      titulo: 'Cuotas Flexibles',
      descripcion: 'Plazos desde 12 hasta 60 meses según tu capacidad de pago'
    }
  ];

  const faqs = [
    {
      pregunta: '¿Puedo financiar un auto usado?',
      respuesta: 'Sí, financiamos tanto vehículos nuevos como usados. Para vehículos usados se evalúa el año, kilometraje y condiciones generales del vehículo.'
    },
    {
      pregunta: '¿Necesito tener pie?',
      respuesta: 'Dependiendo de tu perfil crediticio y la política de cada institución, se puede financiar desde el 70% hasta el 100% del valor del vehículo. Un pie mayor puede mejorar tus condiciones de tasa y aprobación.'
    },
    {
      pregunta: '¿Qué documentos necesito?',
      respuesta: 'Cédula de identidad, últimas 3 liquidaciones de sueldo, certificado de AFP, cotización o factura del vehículo, y permisos de circulación (para vehículos usados).'
    },
    {
      pregunta: '¿Cuánto tiempo demora el proceso?',
      respuesta: 'El proceso de evaluación puede tomar entre 24 a 72 horas. Una vez aprobado, el desembolso se realiza en 3 a 5 días hábiles.'
    },
    {
      pregunta: '¿Puedo cambiar mi auto actual?',
      respuesta: 'Sí, si tienes un auto con crédito vigente, evaluamos la posibilidad de refinanciar y cambiar por otro vehículo según tu situación crediticia actual.'
    }
  ];

  return (
    <div className="pt-20">
      <SEO {...seoData} />
      
      {/* Hero específico */}
      <section className="relative min-h-[60vh] flex items-center bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/imagenes/Credito-automotriz.webp"
            alt="Crédito Automotriz"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-purple-700/60"></div>

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
              Crédito Automotriz
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 mb-4">
              Consigue el vehículo que necesitas con el mejor financiamiento
            </p>
            <p className="text-lg text-gray-200">
              Te acompañamos en la gestión de tu crédito automotriz hasta el 100% del valor del vehículo.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-dark mb-12 text-center">
            Beneficios del Crédito Automotriz
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
                Simula tu Crédito Automotriz
              </h2>
              <p className="text-gray-600 text-lg">
                Descubre cuánto pagarías mensualmente por tu vehículo
              </p>
            </motion.div>

            <SimuladorAutomotriz />
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
            ¿Listo para conseguir tu vehículo?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Te ayudamos a financiar el auto, camioneta o vehículo comercial que necesitas
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

export default CreditoAutomotriz;

