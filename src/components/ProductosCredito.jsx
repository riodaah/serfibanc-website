import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

const ProductosCredito = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const productos = [
    {
      titulo: 'Pyme',
      subtitulo: 'Crédito Comercial',
      descripcion: 'Financiamiento para capital de trabajo, inversión y crecimiento de tu empresa.',
      imagen: '/imagenes/Credito-empresa.webp',
      link: '/credito-pyme',
      color: 'from-blue-500 to-blue-700'
    },
    {
      titulo: 'Hipotecario',
      subtitulo: 'Tu Casa Propia',
      descripcion: 'Te ayudamos a conseguir tu crédito hipotecario con bancos e instituciones financieras reguladas.',
      imagen: '/imagenes/Creditos-Hipotecarios.webp',
      link: '/credito-hipotecario',
      color: 'from-green-500 to-green-700'
    },
    {
      titulo: 'Automotriz',
      subtitulo: 'Tu Vehículo',
      descripcion: 'Te acompañamos en la gestión de tu crédito automotriz hasta el 100% del valor del vehículo.',
      imagen: '/imagenes/Credito-automotriz.webp',
      link: '/credito-automotriz',
      color: 'from-purple-500 to-purple-700'
    }
  ];

  return (
    <section id="creditos" className="py-12 md:py-16 lg:py-24 bg-white">
      <div className="container-custom px-4 md:px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#2B3A67] mb-2 uppercase">
            Nuestros Servicios
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm">
            Encuentra la solución financiera perfecta para tus necesidades
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 max-w-6xl mx-auto px-4">
          {productos.map((producto, index) => (
            <motion.div
              key={producto.titulo}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="flex flex-col items-center"
            >
              {/* Título arriba de la esfera */}
              <h3 className="font-display text-2xl md:text-3xl font-bold text-[#2B3A67] mb-4 text-center">
                {producto.titulo}
              </h3>

              <Link to={producto.link} className="block group w-full max-w-sm">
                {/* Esfera con imagen sin texto */}
                <div className="relative overflow-hidden rounded-full aspect-square mb-5 shadow-2xl">
                  <img
                    src={producto.imagen}
                    alt={producto.titulo}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Overlay muy sutil solo para dar profundidad */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 group-hover:to-black/30 transition-all duration-300"></div>
                </div>

                {/* Descripción */}
                <div className="text-center px-2">
                  <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-4">
                    {producto.descripcion}
                  </p>
                  <span className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                    Ver detalles
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductosCredito;

