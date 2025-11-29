import Hero from '../components/Hero';
import QuienesSomos from '../components/QuienesSomos';
import ProductosCredito from '../components/ProductosCredito';
import PasosSimulacionMejorado from '../components/PasosSimulacionMejorado';
import ServiciosEspeciales from '../components/ServiciosEspeciales';
import BloqueConfianza from '../components/BloqueConfianza';
import Contacto from '../components/Contacto';
import SEO from '../components/SEO';

const Home = () => {
  // SEO principal - optimizado para "simula tu crédito"
  const seoData = {
    title: "Simula tu Crédito PYME, Hipotecario y Automotriz | Serfibanc Chile",
    description: "Simula tu crédito online gratis. Asesoría financiera para créditos PYME, hipotecarios y automotriz en Chile. ¿Te rechazaron? Nosotros te ayudamos. Sin DICOM, sin castigos.",
    keywords: "simula tu crédito, simulador de crédito, crédito PYME Chile, crédito hipotecario Chile, crédito automotriz, préstamo empresas, financiamiento PYME, crédito sin DICOM, asesoría financiera Chile, Serfibanc",
    canonical: "https://serfibanc.cl/"
  };

  return (
    <div>
      <SEO {...seoData} />
      <Hero />
      <ProductosCredito />
      <QuienesSomos />
      <PasosSimulacionMejorado />
      <ServiciosEspeciales />
      <BloqueConfianza />
      <Contacto />
    </div>
  );
};

export default Home;

