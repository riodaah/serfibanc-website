import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

const SeccionSimuladores = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const simuladores = [
    {
      tipo: 'PYME',
      titulo: 'Crédito PYME',
      descripcion: 'Para empresas y negocios',
      icon: '🏢',
      link: '/credito-pyme',
      color: 'from-blue-500 to-blue-700'
    },
    {
      tipo: 'Hipotecario',
      titulo: 'Crédito Hipotecario',
      descripcion: 'Para tu casa propia',
      icon: '🏠',
      link: '/credito-hipotecario',
      color: 'from-green-500 to-green-700'
    },
    {
      tipo: 'Automotriz',
      titulo: 'Crédito Automotriz',
      descripcion: 'Para tu vehículo',
      icon: '🚗',
      link: '/credito-automotriz',
      color: 'from-purple-500 to-purple-700'
    }
  ];

  return (
    <section id="simuladores" className="section-padding bg-gradient-to-br from-gray-50 to-white">
      <div className="container-custom" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-dark mb-4">
            Simula tu crédito en minutos
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Selecciona el tipo de crédito que necesitas y obtén una simulación personalizada
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {simuladores.map((simulador, index) => (
            <motion.div
              key={simulador.tipo}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <Link to={simulador.link} className="block group">
                <div className="card p-8 h-full hover:scale-105 transition-all duration-300">
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${simulador.color} flex items-center justify-center text-4xl mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                    {simulador.icon}
                  </div>
                  
                  <h3 className="font-display text-2xl font-bold text-primary-dark mb-2 text-center">
                    {simulador.titulo}
                  </h3>
                  
                  <p className="text-gray-600 text-center mb-6">
                    {simulador.descripcion}
                  </p>

                  <div className="flex items-center justify-center gap-2 text-primary-medium font-semibold group-hover:gap-4 transition-all duration-300">
                    <span>Simular ahora</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 text-sm max-w-3xl mx-auto">
            <strong>Nota importante:</strong> Las simulaciones son referenciales. El resultado final puede variar según la evaluación crediticia de la institución financiera.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SeccionSimuladores;









