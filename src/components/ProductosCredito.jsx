import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

const ProductosCredito = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const productos = [
    {
      titulo: 'Crédito PYME',
      subtitulo: 'Comercial',
      descripcion: 'Financiamiento para capital de trabajo, inversión y crecimiento de tu empresa.',
      imagen: '/Imagenes/Credito-empresa.webp',
      link: '/credito-pyme',
      color: 'from-blue-500 to-blue-700'
    },
    {
      titulo: 'Crédito Hipotecario',
      subtitulo: 'Tu Casa Propia',
      descripcion: 'Te ayudamos a conseguir tu crédito hipotecario con bancos e instituciones financieras reguladas.',
      imagen: '/Imagenes/Creditos-Hipotecarios.webp',
      link: '/credito-hipotecario',
      color: 'from-green-500 to-green-700'
    },
    {
      titulo: 'Crédito Automotriz',
      subtitulo: 'Tu Vehículo',
      descripcion: 'Te acompañamos en la gestión de tu crédito automotriz hasta el 100% del valor del vehículo.',
      imagen: '/Imagenes/Credito-automotriz.webp',
      link: '/credito-automotriz',
      color: 'from-purple-500 to-purple-700'
    }
  ];

  return (
    <section id="creditos" className="section-padding bg-white">
      <div className="container-custom" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#2B3A67] mb-2 uppercase">
            Nuestros Servicios
          </h2>
          <p className="text-gray-600 text-sm">
            Encuentra la solución financiera perfecta para tus necesidades
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {productos.map((producto, index) => (
            <motion.div
              key={producto.titulo}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <Link to={producto.link} className="block group">
                <div className="relative overflow-hidden rounded-full aspect-square mb-5 shadow-2xl">
                  {/* Imagen de fondo sin overlay de color */}
                  <img
                    src={producto.imagen}
                    alt={producto.titulo}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 brightness-95"
                  />
                  {/* Overlay sutil solo en los bordes */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                  {/* Contenido centrado */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
                    <h3 className="font-display text-2xl md:text-3xl font-bold mb-2 drop-shadow-lg">
                      {producto.titulo.split(' ')[0].toUpperCase()}
                    </h3>
                    <h3 className="font-display text-2xl md:text-3xl font-bold mb-4 drop-shadow-lg">
                      {producto.titulo.split(' ').slice(1).join(' ').toUpperCase()}
                    </h3>
                    <p className="text-sm md:text-base font-semibold mb-3 drop-shadow-lg">
                      {producto.subtitulo.toUpperCase()}
                    </p>
                    <div className="w-16 h-0.5 bg-white rounded-full shadow-lg"></div>
                  </div>
                </div>

                {/* Descripción */}
                <div className="text-center px-2">
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">
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

