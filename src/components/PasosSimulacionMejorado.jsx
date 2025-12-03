import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const PasosSimulacionMejorado = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [visibleSteps, setVisibleSteps] = useState(0);

  useEffect(() => {
    if (isInView && visibleSteps < 5) {
      const timer = setTimeout(() => {
        setVisibleSteps(prev => prev + 1);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [isInView, visibleSteps]);

  const pasos = [
    {
      numero: '01',
      titulo: 'Selecciona tipo de crédito',
      descripcion: 'Elige crédito PYME, Hipotecario o Automotriz según tus necesidades.',
      icon: '📋',
      color: 'from-purple-500 to-pink-500'
    },
    {
      numero: '02',
      titulo: 'Completa el simulador',
      descripcion: 'Ingresa monto, cantidad cuotas, ingreso mensual y datos personales.',
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
      descripcion: 'Solicitaremos documentación inicial, para evaluación preliminar.',
      icon: '📄',
      color: 'from-cyan-500 to-teal-500'
    },
    {
      numero: '05',
      titulo: 'Obtén tu crédito',
      descripcion: 'Te contactaremos para informar la aprobación del crédito',
      icon: '✅',
      color: 'from-teal-500 to-green-500'
    },
  ];

  // Calcular posiciones para las líneas conectoras
  const getLineConfig = (index) => {
    const isLeft = index % 2 === 0;
    const hasNext = index < pasos.length - 1;
    
    if (!hasNext) return null;
    
    return {
      isLeft,
      // Línea horizontal desde el círculo hacia el centro
      horizontal: {
        start: isLeft ? '120px' : 'auto',
        end: isLeft ? 'auto' : '120px',
        width: '150px'
      },
      // Línea vertical bajando
      vertical: {
        height: '80px'
      }
    };
  };

  return (
    <section className="section-padding bg-gradient-to-br from-[#020617] via-[#0a1628] to-[#020617] relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

      <div className="container-custom relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 uppercase">
            ¿Cómo Funciona?
          </h2>
          <p className="text-gray-300 text-sm max-w-2xl mx-auto">
            Sigue estos simples pasos para obtener tu crédito
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto relative">
          {/* Línea central vertical de fondo */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-gray-700/30 to-transparent"></div>

          {pasos.map((paso, index) => {
            const lineConfig = getLineConfig(index);
            const isLeft = index % 2 === 0;
            const isVisible = visibleSteps > index;
            const showLine = visibleSteps > index && lineConfig;

            return (
              <div key={paso.numero} className="relative mb-16 last:mb-0">
                <div className={`flex flex-col md:flex-row items-center gap-8 ${isLeft ? '' : 'md:flex-row-reverse'}`}>
                  {/* Espacio para alineación */}
                  <div className="flex-1 hidden md:block"></div>

                  {/* Círculo con ícono */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isVisible ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
                    className="relative flex-shrink-0 z-10"
                  >
                    <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${paso.color} flex items-center justify-center text-4xl shadow-2xl relative`}>
                      {paso.icon}
                      {/* Anillo exterior animado */}
                      {isVisible && (
                        <motion.div
                          className={`absolute inset-0 rounded-full bg-gradient-to-br ${paso.color}`}
                          initial={{ scale: 1, opacity: 0.5 }}
                          animate={{ scale: 1.3, opacity: 0 }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                    </div>
                    {/* Badge de paso */}
                    <div className="absolute -top-3 -right-3 bg-white text-gray-900 font-bold text-xs px-3 py-1 rounded-full shadow-lg">
                      PASO {paso.numero}
                    </div>

                    {/* Líneas conectoras animadas */}
                    {showLine && lineConfig && (
                      <>
                        {/* Línea VERTICAL primero (hacia abajo) */}
                        <motion.div
                          className={`hidden md:block absolute top-full left-1/2 transform -translate-x-1/2 w-0.5 bg-gradient-to-b ${paso.color}`}
                          style={{ 
                            height: lineConfig.vertical.height,
                            transformOrigin: 'top'
                          }}
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          transition={{ duration: 0.6, delay: 0.5 }}
                        />
                        
                        {/* Línea HORIZONTAL después (hacia el siguiente paso) */}
                        <motion.div
                          className={`hidden md:block absolute h-0.5 bg-gradient-to-r ${paso.color}`}
                          style={{ 
                            top: `calc(100% + ${lineConfig.vertical.height})`,
                            left: isLeft ? '50%' : 'auto',
                            right: isLeft ? 'auto' : '50%',
                            width: lineConfig.horizontal.width,
                            transformOrigin: isLeft ? 'left' : 'right'
                          }}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.8, delay: 1.1 }}
                        />
                      </>
                    )}
                  </motion.div>

                  {/* Contenido */}
                  <motion.div
                    initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                    animate={isVisible ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex-1"
                  >
                    <div className={`bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
                      <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-3">
                        {paso.titulo}
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {paso.descripcion}
                      </p>
                    </div>
                  </motion.div>

                  {/* Espacio para alineación */}
                  <div className="flex-1 hidden md:block"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Indicador de progreso */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="text-center mt-12"
        >
          <div className="flex items-center justify-center gap-2">
            {pasos.map((_, index) => (
              <motion.div
                key={index}
                className={`h-2 rounded-full transition-all duration-500 ${
                  visibleSteps > index ? 'w-8 bg-gradient-to-r from-blue-500 to-purple-500' : 'w-2 bg-gray-600'
                }`}
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: index * 0.1 }}
              />
            ))}
          </div>
          <p className="text-gray-400 text-xs mt-4">
            {visibleSteps} de {pasos.length} pasos completados
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PasosSimulacionMejorado;

