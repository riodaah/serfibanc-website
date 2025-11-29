import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const QuienesSomos = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="quienes-somos" className="section-padding bg-white">
      <div className="container-custom" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Imagen */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/Imagenes/Negocios.webp"
                alt="Equipo Serfibanc"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/50 to-transparent"></div>
            </div>
            {/* Decoración */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary-light/20 rounded-full blur-3xl -z-10"></div>
          </motion.div>

          {/* Contenido */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-dark mb-6">
              Quiénes <span className="text-primary-medium">Somos</span>
            </h2>
            
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p className="text-lg">
                <span className="font-semibold text-primary-dark">Serfibanc SpA</span> es una empresa chilena con amplia experiencia en el área de la asesoría financiera e inmobiliaria para personas, pymes y grandes empresas.
              </p>
              
              <p>
                Somos <span className="font-semibold">intermediarios</span> que gestionamos créditos según la necesidad de cada cliente. <span className="font-semibold">No somos una entidad que otorga créditos de forma directa</span>, tampoco somos una financiera.
              </p>
              
              <p>
                Nuestro foco de trabajo y negocio se basa en definir a través de nuestros profesionales y perfil comercial de cada cliente la mejor opción de financiamiento.
              </p>
              
              <p>
                Somos profesionales con años de experiencia en el área financiero y bancaria, esto nos permite buscar la mejor alternativa de crédito y financiamiento a corto, mediano y largo plazo.
              </p>
              
              <div className="bg-primary-light/10 border-l-4 border-primary-medium p-6 rounded-lg mt-6">
                <p className="font-semibold text-primary-dark mb-2">
                  En Serfibanc las evaluaciones comerciales son sin costo y el pago de nuestros servicios es contra resultados!!
                </p>
                <p className="text-sm">
                  Atte.<br />
                  <span className="font-semibold">Equipo Serfibanc SpA.</span>
                </p>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-medium mb-1">+10</div>
                <div className="text-sm text-gray-600">Años de Experiencia</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-medium mb-1">+500</div>
                <div className="text-sm text-gray-600">Clientes Atendidos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-medium mb-1">98%</div>
                <div className="text-sm text-gray-600">Satisfacción</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default QuienesSomos;

