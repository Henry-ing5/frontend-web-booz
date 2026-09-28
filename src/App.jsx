import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Inicio from './pages/inicio';
import Paquetes from './pages/paquetes';
import PaquetePersonalizado from './pages/paquetepersonalizado';
import TrabajosRecientes from './pages/trabajosrecientes';
import PasarelaPago from './pages/pasarelapagos';
import PreguntasFrecuentes from './pages/preguntasfrecuentes';
import DetallePaquete from './pages/detallepaquete';
import DetalleEvento from './pages/detalleevento';
import PanelPrincipal from './pages/admin/panelprincipal';
import GestionPaquetes from './pages/admin/gestionpaquetes';
import FormularioPaquete from './pages/admin/fomulariopaquete';
import AgendaEventos from './pages/admin/agendaeventos';
import Ingresos from './pages/admin/ingresos';
import ProductosServicios from './pages/admin/productoservicios';
import GestionTrabajos from './pages/admin/gestiontrabajos';
import GestionPromociones from './pages/admin/gestionpromociones';
import SolicitudesPersonalizadas from './pages/admin/solicitudespersonalizadas';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/paquetes" element={<Paquetes />} />
        <Route path="/personalizar" element={<PaquetePersonalizado />} />
        <Route path="/trabajos" element={<TrabajosRecientes />} />
        <Route path="/pago" element={<PasarelaPago />} />
        <Route path="/faq" element={<PreguntasFrecuentes />} />
        <Route path="/paquetes/:id" element={<DetallePaquete />} />
        <Route path="/trabajos/:id" element={<DetalleEvento />} />
        <Route path="/admin" element={<PanelPrincipal />} />
        <Route path="/admin/paquetes" element={<GestionPaquetes />} />
        <Route path="/admin/paquetes/nuevo" element={<FormularioPaquete />} />
        <Route path="/admin/paquetes/editar/:id" element={<FormularioPaquete />} />
        <Route path="/admin/agenda" element={<AgendaEventos />} />
        <Route path="/admin/ingresos" element={<Ingresos />} />
        <Route path="/admin/productos" element={<ProductosServicios />} />
        <Route path="/admin/portafolio" element={<GestionTrabajos />} />
        <Route path="/admin/promociones" element={<GestionPromociones />} />
        <Route path="/admin/solicitudes" element={<SolicitudesPersonalizadas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;