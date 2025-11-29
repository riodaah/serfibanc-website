import Hero from '../components/Hero';
import QuienesSomos from '../components/QuienesSomos';
import ProductosCredito from '../components/ProductosCredito';
import PasosSimulacionMejorado from '../components/PasosSimulacionMejorado';
import ServiciosEspeciales from '../components/ServiciosEspeciales';
import BloqueConfianza from '../components/BloqueConfianza';
import Contacto from '../components/Contacto';

const Home = () => {
  return (
    <div>
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

