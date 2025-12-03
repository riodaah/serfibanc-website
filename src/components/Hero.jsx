import { motion } from 'framer-motion';
import config from '../config.json';
import AnimatedHeroBackground from './AnimatedHeroBackground';

const Hero = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="relative min-h-screen pt-20 md:pt-24 pb-12 md:pb-0 md:min-h-[85vh] flex items-center bg-[#020617] overflow-hidden">
      {/* Fondo animado moderno */}
      <AnimatedHeroBackground />

      <div className="container-custom relative z-10 px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Contenido izquierdo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white text-center lg:text-left"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 md:mb-6 uppercase"
            >
              ¿Te Rechazaron <br />
              <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl">El Crédito?</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-sm sm:text-base md:text-lg text-white mb-6 md:mb-8 font-semibold"
            >
              Gestionamos créditos para empresas y particulares con ingresos líquidos desde $700.000, antigüedad laboral desde 1 año, SIN DICOM y SIN CASTIGOS!!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <button
                onClick={() => scrollToSection('creditos')}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-300 shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/60 hover:scale-105 uppercase text-xs sm:text-sm tracking-wide"
              >
                Simula tu Crédito →
              </button>
            </motion.div>
          </motion.div>

          {/* Contenedor de Video - Visible en todas las pantallas */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 lg:mt-0"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white/5 backdrop-blur-sm border border-white/10 max-w-md mx-auto lg:max-w-none">
              <video
                className="w-full h-auto rounded-xl"
                autoPlay
                loop
                muted
                playsInline
                poster="/imagenes/Negocios.webp"
              >
                <source src="/videos/serfibanc-presentacion.mp4" type="video/mp4" />
                Tu navegador no soporta el elemento de video.
              </video>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Indicador de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-white"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;

