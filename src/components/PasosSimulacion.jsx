import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const PasosSimulacion = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [visibleSteps, setVisibleSteps] = useState(0);

  useEffect(() => {
    if (isInView && visibleSteps < 5) {
      const timer = setTimeout(() => {
        setVisibleSteps(prev => prev + 1);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isInView, visibleSteps]);

  const pasos = [
    {
      numero: '01',
      titulo: 'Selecciona el tipo de crédito',
      descripcion: 'Elige entre crédito PYME, hipotecario o automotriz según tus necesidades.',
      icon: '📋',
      color: 'from-purple-500 to-pink-500'
    },
    {
      numero: '02',
      titulo: 'Completa el simulador',
      descripcion: 'Ingresa el monto, plazo, ingreso mensual y algunos datos básicos.',
      icon: '📝',
      color: 'from-pink-500 to-blue-500'
    },
    {
      numero: '03',
      titulo: 'Envía tu simulación',
      descripcion: 'Un asesor de Serfibanc revisará tu caso y te contactará.',
      icon: '📧',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      numero: '04',
      titulo: 'Presenta tus documentos',
      descripcion: 'Te acompañamos en el envío de antecedentes al banco o institución financiera.',
      icon: '📄',
      color: 'from-cyan-500 to-teal-500'
    },
    {
      numero: '05',
      titulo: 'Obtén tu crédito',
      descripcion: 'Te ayudamos a llegar hasta la aprobación final.',
      icon: '✅',
      color: 'from-teal-500 to-green-500'
    },
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-primary-dark via-gray-900 to-primary-dark relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

      <div className="container-custom relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 uppercase">
            ¿Cómo Funciona?
          </h2>
          <p className="text-gray-300 text-sm max-w-2xl mx-auto">
            Sigue estos simples pasos para obtener tu crédito
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {pasos.map((paso, index) => (
            <div key={paso.numero} className="relative mb-12 last:mb-0">
              <div className={`flex flex-col md:flex-row items-start gap-6 ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                {/* Círculo con ícono */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={visibleSteps > index ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
                  className="relative flex-shrink-0"
                >
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${paso.color} flex items-center justify-center text-3xl shadow-2xl relative z-10`}>
                    {paso.icon}
                  </div>
                  {/* Badge de paso */}
                  <div className="absolute -top-2 -right-2 bg-white text-primary-dark font-bold text-xs px-2.5 py-1 rounded-full shadow-lg">
                    PASO {paso.numero}
                  </div>
                </motion.div>

                {/* Línea conectora animada */}
                {index < pasos.length - 1 && (
                  <motion.div 
                    className={`hidden md:block absolute ${index % 2 === 0 ? 'left-10' : 'right-10'} w-0.5 bg-gradient-to-b ${paso.color}`}
                    style={{ 
                      top: '80px',
                      height: '120px'
                    }}
                    initial={{ scaleY: 0, originY: 0 }}
                    animate={visibleSteps > index ? { scaleY: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  />
                )}

                {/* Contenido */}
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  animate={visibleSteps > index ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className={`flex-1 max-w-md bg-[#34425A]/50 backdrop-blur-lg rounded-xl p-6 border border-white/10 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right md:ml-auto'}`}
                >
                  <h3 className="font-display text-xl font-bold text-white mb-2">
                    {paso.titulo}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {paso.descripcion}
                  </p>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PasosSimulacion;

