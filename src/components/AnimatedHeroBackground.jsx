import { motion } from 'framer-motion';

const AnimatedHeroBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Capa base con degradé oscuro */}
      <div className="absolute inset-0 bg-[#020617]">
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 0% 0%, rgba(29, 78, 216, 0.25) 0%, transparent 50%),
              radial-gradient(circle at 100% 100%, rgba(79, 70, 229, 0.25) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)
            `
          }}
        />
      </div>

      {/* Capa animada - mesh gradient */}
      <motion.div
        className="absolute inset-0 opacity-70 mix-blend-screen animated-mesh"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 2 }}
      />

      {/* Capa de ruido sutil */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.15] mix-blend-soft-light"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px'
        }}
      />

      {/* Elementos geométricos decorativos */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
      
      {/* Líneas diagonales sutiles */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
    </div>
  );
};

export default AnimatedHeroBackground;

