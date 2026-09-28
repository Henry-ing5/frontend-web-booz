import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AgendaEventos = () => {
  // Datos simulados de las reservaciones (ahora con datos de contacto)
  const [eventos] = useState([
    {
      id: "EVV-001",
      cliente: "María Fernanda López",
      telefono: "933 123 4567",
      email: "maria.lopez@email.com",
      tipo: "Boda",
      paquete: "Paquete Premium",
      fecha: "2026-10-15",
      hora: "18:00",
      lugar: "Salón Los Espejos, Comalcalco",
      estado: "Confirmado",
      notas: "Requiere montaje un día antes. Pirotecnia al momento del vals."
    },
    {
      id: "EVV-002",
      cliente: "Carlos Ramírez",
      telefono: "933 987 6543",
      email: "carlos.ramirez@email.com",
      tipo: "XV Años",
      paquete: "Paquete VIP",
      fecha: "2026-10-22",
      hora: "20:00",
      lugar: "Jardín Las Rosas, Paraíso",
      estado: "Pendiente",
      notas: "Falta liquidar el 50% restante. Confirmar si querrán humo denso."
    },
    {
      id: "EVV-003",
      cliente: "Familia Gómez",
      telefono: "993 456 7890",
      email: "fam.gomez@email.com",
      tipo: "Bautizo",
      paquete: "Paquete Básico",
      fecha: "2026-11-05",
      hora: "14:00",
      lugar: "Palapa El Manglar, Cunduacán",
      estado: "Confirmado",
      notas: "Evento de día. No requieren luces robóticas, cambiar por iluminación cálida."
    }
  ]);

  // Estados para filtros y modales
  const [filtroActual, setFiltroActual] = useState('Todos');
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
  const [modalContactoVisible, setModalContactoVisible] = useState(false);
  const [modalDetallesVisible, setModalDetallesVisible] = useState(false);

  // Lógica de filtrado
  const eventosFiltrados = eventos.filter(evento => {
    if (filtroActual === 'Todos') return true;
    return evento.estado === filtroActual;
  });

  // Funciones para abrir modales
  const abrirContacto = (evento) => {
    setEventoSeleccionado(evento);
    setModalContactoVisible(true);
  };

  const abrirDetalles = (evento) => {
    setEventoSeleccionado(evento);
    setModalDetallesVisible(true);
  };

  return (
    <div className="d-flex position-relative" style={{ minHeight: '100vh', backgroundColor: '#212529' }}>
      
      {/* Menú Lateral (Corregido con flex-shrink-0) */}
      <div className="bg-black border-end border-secondary d-flex flex-column d-none d-md-flex flex-shrink-0" style={{ width: '260px', minWidth: '260px' }}>
        <div className="p-4 border-bottom border-secondary text-center">
          <h4 className="text-white fw-bold mb-0 text-uppercase" style={{ letterSpacing: '2px' }}>
            Booz <span className="text-warning">Admin</span>
          </h4>
        </div>
        
        <div className="d-flex flex-column p-3 gap-2 mt-2">
          <Link to="/admin" className="btn btn-outline-light text-start rounded-pill px-4 py-2 border-0">Panel Principal</Link>
          <Link to="/admin/paquetes" className="btn btn-outline-light text-start rounded-pill px-4 py-2 border-0">Gestión de Paquetes</Link>
          <Link to="/admin/agenda" className="btn btn-warning fw-bold text-start text-dark rounded-pill px-4 py-2">Agenda de Eventos</Link>
          <Link to="/admin/ingresos" className="btn btn-outline-light text-start rounded-pill px-4 py-2 border-0">Ingresos</Link>
          <Link to="/admin/productos" className="btn btn-outline-light text-start rounded-pill px-4 py-2 border-0">Productos y Servicios</Link>
          <Link to="/admin/portafolio" className="btn btn-outline-light text-start rounded-pill px-4 py-2 border-0">Gestión de Trabajos Recientes</Link>
          <Link to="/admin/promociones" className="btn btn-outline-light text-start rounded-pill px-4 py-2 border-0">Gestión de Promociones</Link>
          <Link to="/admin/solicitudes" className="btn btn-warning fw-bold text-start text-dark rounded-pill px-4 py-2">Gestión de Solicitudes Personalizadas</Link>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="flex-grow-1 d-flex flex-column">
        
        <nav className="navbar navbar-dark bg-black px-4 py-3 border-bottom border-secondary d-flex justify-content-between">
          <div className="text-white">
            <span className="fw-semibold">Agenda y Reservaciones</span>
          </div>
          <div>
            <Link to="/" className="btn btn-sm btn-outline-danger rounded-pill px-3 fw-bold">Cerrar Sesión</Link>
          </div>
        </nav>

        <div className="p-4 p-md-5">
          
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
            <h3 className="text-white fw-bold mb-0">Próximos Eventos</h3>
            
            {/* Botones de Filtro Activos */}
            <div className="d-flex gap-2">
              <button 
                onClick={() => setFiltroActual('Todos')}
                className={`btn rounded-pill px-3 fw-bold btn-sm ${filtroActual === 'Todos' ? 'btn-warning text-dark' : 'btn-outline-light'}`}
              >
                Todos
              </button>
              <button 
                onClick={() => setFiltroActual('Confirmados')}
                className={`btn rounded-pill px-3 fw-bold btn-sm ${filtroActual === 'Confirmados' ? 'btn-warning text-dark' : 'btn-outline-light'}`}
              >
                Confirmados
              </button>
              <button 
                onClick={() => setFiltroActual('Pendientes')}
                className={`btn rounded-pill px-3 fw-bold btn-sm ${filtroActual === 'Pendientes' ? 'btn-warning text-dark' : 'btn-outline-light'}`}
              >
                Pendientes
              </button>
            </div>
          </div>

          {/* Lista de Eventos Filtrados */}
          <div className="row g-4">
            {eventosFiltrados.length === 0 ? (
              <div className="col-12 text-center py-5 text-white-50">
                <h5>No hay eventos en esta categoría.</h5>
              </div>
            ) : (
              eventosFiltrados.map((evento) => (
                <div className="col-12" key={evento.id}>
                  <div className="card bg-black border-secondary shadow-sm" style={{ borderRadius: '15px' }}>
                    <div className="card-body p-0 d-flex flex-column flex-md-row">
                      
                      <div className="bg-dark p-4 d-flex flex-column justify-content-center align-items-center text-center border-end border-secondary" style={{ minWidth: '180px', borderTopLeftRadius: '15px', borderBottomLeftRadius: '15px' }}>
                        <span className="text-warning fw-bold fs-2 lh-1">{evento.fecha.split('-')[2]}</span>
                        <span className="text-white-50 text-uppercase small tracking-widest mt-1">
                          {new Date(evento.fecha + 'T00:00:00').toLocaleString('es-MX', { month: 'short', year: 'numeric' })}
                        </span>
                        <span className="badge bg-secondary mt-3 px-3 py-2">{evento.hora} hrs</span>
                      </div>

                      <div className="p-4 flex-grow-1 d-flex flex-column justify-content-center">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <div>
                            <span className="text-white-50 small">Folio: {evento.id}</span>
                            <h4 className="fw-bold text-white mb-1">{evento.tipo} de {evento.cliente}</h4>
                            <span className="text-warning fw-semibold">{evento.paquete}</span>
                          </div>
                          <span className={`badge px-3 py-2 ${evento.estado === 'Confirmado' ? 'bg-success' : 'bg-warning text-dark'}`}>
                            {evento.estado}
                          </span>
                        </div>
                        <div className="mt-3 text-white-50 d-flex align-items-center">
                          <span className="me-2">📍</span> {evento.lugar}
                        </div>
                      </div>

                      <div className="p-4 border-start border-secondary d-flex flex-md-column justify-content-center gap-2" style={{ minWidth: '150px' }}>
                        <button 
                          onClick={() => abrirDetalles(evento)}
                          className="btn btn-outline-light rounded-pill w-100 fw-bold btn-sm py-2"
                        >
                          Ver Detalles
                        </button>
                        <button 
                          onClick={() => abrirContacto(evento)}
                          className="btn btn-outline-warning rounded-pill w-100 fw-bold btn-sm py-2"
                        >
                          Contactar
                        </button>
                      </div>

                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>

      {/* MODAL DE CONTACTO */}
      {modalContactoVisible && eventoSeleccionado && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.85)', zIndex: 1050, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="bg-black p-4 p-md-5 rounded-4 border border-warning shadow-lg text-center" style={{ maxWidth: '400px', width: '90%' }}>
            <h3 className="fw-bold text-white mb-1">Información de Contacto</h3>
            <p className="text-white-50 mb-4">Cliente: {eventoSeleccionado.cliente}</p>
            
            <div className="bg-dark p-3 rounded border border-secondary mb-3 text-start">
              <span className="text-white-50 small d-block mb-1">Teléfono / WhatsApp</span>
              <span className="fw-bold text-white fs-5">{eventoSeleccionado.telefono}</span>
            </div>
            
            <div className="bg-dark p-3 rounded border border-secondary mb-4 text-start">
              <span className="text-white-50 small d-block mb-1">Correo Electrónico</span>
              <span className="fw-bold text-white">{eventoSeleccionado.email}</span>
            </div>

            <div className="d-flex gap-2">
              <button className="btn btn-outline-light w-50 py-2 fw-bold rounded-pill" onClick={() => setModalContactoVisible(false)}>Cerrar</button>
              <a href={`https://wa.me/52${eventoSeleccionado.telefono.replace(/\s/g, '')}`} target="_blank" rel="noreferrer" className="btn btn-warning w-50 py-2 fw-bold rounded-pill">Abrir WhatsApp</a>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE DETALLES DEL EVENTO */}
      {modalDetallesVisible && eventoSeleccionado && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.85)', zIndex: 1050, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="bg-black p-4 p-md-5 rounded-4 border border-secondary shadow-lg" style={{ maxWidth: '500px', width: '90%' }}>
            
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className="fw-bold text-warning mb-0">Detalles del Evento</h3>
              <span className={`badge ${eventoSeleccionado.estado === 'Confirmado' ? 'bg-success' : 'bg-warning text-dark'}`}>
                {eventoSeleccionado.estado}
              </span>
            </div>
            
            <h5 className="text-white mb-4 border-bottom border-secondary pb-3">{eventoSeleccionado.tipo} de {eventoSeleccionado.cliente}</h5>

            <div className="row g-3 mb-4 text-white-50">
              <div className="col-6">
                <span className="small d-block">Folio</span>
                <span className="text-white fw-semibold">{eventoSeleccionado.id}</span>
              </div>
              <div className="col-6">
                <span className="small d-block">Paquete</span>
                <span className="text-white fw-semibold">{eventoSeleccionado.paquete}</span>
              </div>
              <div className="col-6">
                <span className="small d-block">Fecha</span>
                <span className="text-white fw-semibold">{eventoSeleccionado.fecha}</span>
              </div>
              <div className="col-6">
                <span className="small d-block">Hora</span>
                <span className="text-white fw-semibold">{eventoSeleccionado.hora} hrs</span>
              </div>
              <div className="col-12">
                <span className="small d-block">Lugar del Evento</span>
                <span className="text-white fw-semibold">{eventoSeleccionado.lugar}</span>
              </div>
              <div className="col-12 mt-3 p-3 bg-dark rounded border border-secondary">
                <span className="small d-block text-warning mb-1">Notas y Requerimientos</span>
                <span className="text-white">{eventoSeleccionado.notas}</span>
              </div>
            </div>
            
            <button className="btn btn-outline-light w-100 py-2 fw-bold rounded-pill" onClick={() => setModalDetallesVisible(false)}>
              Cerrar Detalles
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default AgendaEventos;