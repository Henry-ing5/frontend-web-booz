import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SolicitudesPersonalizadas = () => {
  // Datos simulados recibidos del formulario público
  const [solicitudes, setSolicitudes] = useState([
    {
      id: "SOL-089",
      fechaSolicitud: "2026-09-25",
      cliente: "Ana Karen López",
      telefono: "933 111 2233",
      email: "ana.lopez@email.com",
      tipoEvento: "Boda",
      invitados: "150-200",
      presupuesto: "$30,000 - $50,000",
      servicios: ["Iluminación Arquitectónica", "DJ por 5 horas", "Pista Iluminada", "Chisperos"],
      notas: "Me gustaría saber si la pista puede ser de cristal en lugar de acrílico.",
      estado: "Pendiente" // Pendiente | Cotizado | Descartado
    },
    {
      id: "SOL-090",
      fechaSolicitud: "2026-09-26",
      cliente: "Roberto Sánchez",
      telefono: "993 444 5566",
      email: "roberto.s@email.com",
      tipoEvento: "XV Años",
      invitados: "100-150",
      presupuesto: "$15,000 - $30,000",
      servicios: ["Sonido Básico", "Animador", "Letras Gigantes"],
      notas: "El evento es en un salón cerrado, no necesitamos carpas.",
      estado: "Cotizado"
    }
  ]);

  const [filtroEstado, setFiltroEstado] = useState('Todos');
  
  // Modales
  const [modalDetallesVisible, setModalDetallesVisible] = useState(false);
  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState(null);
  
  const [modalEliminarVisible, setModalEliminarVisible] = useState(false);
  const [solicitudAEliminar, setSolicitudAEliminar] = useState(null);

  const solicitudesFiltradas = solicitudes.filter(sol => {
    if (filtroEstado === 'Todos') return true;
    return sol.estado === filtroEstado;
  });

  // Funciones de Detalles
  const verDetalles = (solicitud) => {
    setSolicitudSeleccionada(solicitud);
    setModalDetallesVisible(true);
  };

  const cambiarEstado = (nuevoEstado) => {
    setSolicitudes(solicitudes.map(s => 
      s.id === solicitudSeleccionada.id ? { ...s, estado: nuevoEstado } : s
    ));
    setSolicitudSeleccionada({ ...solicitudSeleccionada, estado: nuevoEstado });
  };

  // Funciones de Eliminación
  const solicitarEliminacion = (solicitud) => {
    setSolicitudAEliminar(solicitud);
    setModalEliminarVisible(true);
  };

  const confirmarEliminacion = () => {
    setSolicitudes(solicitudes.filter(s => s.id !== solicitudAEliminar.id));
    setModalEliminarVisible(false);
    setSolicitudAEliminar(null);
  };

  return (
    <div className="d-flex position-relative" style={{ minHeight: '100vh', backgroundColor: '#212529' }}>
      
      {/* Menú Lateral */}
      <div className="bg-black border-end border-secondary d-flex flex-column d-none d-md-flex flex-shrink-0" style={{ width: '260px', minWidth: '260px' }}>
        <div className="p-4 border-bottom border-secondary text-center">
          <h4 className="text-white fw-bold mb-0 text-uppercase" style={{ letterSpacing: '2px' }}>
            Booz <span className="text-warning">Admin</span>
          </h4>
        </div>
        <div className="d-flex flex-column p-3 gap-2 mt-2">
          <Link to="/admin" className="btn btn-outline-light text-start rounded-pill px-4 py-2 border-0">Panel Principal</Link>
          <Link to="/admin/paquetes" className="btn btn-outline-light text-start rounded-pill px-4 py-2 border-0">Gestión de Paquetes</Link>
          <Link to="/admin/agenda" className="btn btn-outline-light text-start rounded-pill px-4 py-2 border-0">Agenda de Eventos</Link>
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
            <span className="fw-semibold">Bandeja de Solicitudes Personalizadas</span>
          </div>
          <div>
            <Link to="/" className="btn btn-sm btn-outline-danger rounded-pill px-3 fw-bold">Cerrar Sesión</Link>
          </div>
        </nav>

        <div className="p-4 p-md-5">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
            <h3 className="text-white fw-bold mb-0">Cotizaciones Solicitadas</h3>
            
            <div className="d-flex gap-2">
              <button onClick={() => setFiltroEstado('Todos')} className={`btn rounded-pill px-3 fw-bold btn-sm ${filtroEstado === 'Todos' ? 'btn-warning text-dark' : 'btn-outline-light'}`}>Todos</button>
              <button onClick={() => setFiltroEstado('Pendiente')} className={`btn rounded-pill px-3 fw-bold btn-sm ${filtroEstado === 'Pendiente' ? 'btn-warning text-dark' : 'btn-outline-light'}`}>Pendientes</button>
              <button onClick={() => setFiltroEstado('Cotizado')} className={`btn rounded-pill px-3 fw-bold btn-sm ${filtroEstado === 'Cotizado' ? 'btn-warning text-dark' : 'btn-outline-light'}`}>Cotizados</button>
            </div>
          </div>

          <div className="card bg-black border-secondary shadow-lg" style={{ borderRadius: '15px' }}>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-dark table-hover mb-0" style={{ borderRadius: '15px', overflow: 'hidden' }}>
                  <thead className="bg-dark">
                    <tr>
                      <th className="py-3 px-4 text-white-50 border-bottom border-secondary">Folio / Fecha</th>
                      <th className="py-3 px-4 text-white-50 border-bottom border-secondary">Cliente</th>
                      <th className="py-3 px-4 text-white-50 border-bottom border-secondary">Evento</th>
                      <th className="py-3 px-4 text-white-50 border-bottom border-secondary">Presupuesto</th>
                      <th className="py-3 px-4 text-white-50 border-bottom border-secondary">Estado</th>
                      <th className="py-3 px-4 text-white-50 border-bottom border-secondary text-end">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {solicitudesFiltradas.length === 0 ? (
                      <tr><td colSpan="6" className="text-center py-4 text-white-50">No hay solicitudes en esta categoría.</td></tr>
                    ) : (
                      solicitudesFiltradas.map((sol) => (
                        <tr key={sol.id}>
                          <td className="py-3 px-4 align-middle border-bottom border-secondary">
                            <span className="d-block fw-bold">{sol.id}</span>
                            <span className="small text-white-50">{sol.fechaSolicitud}</span>
                          </td>
                          <td className="py-3 px-4 align-middle fw-bold border-bottom border-secondary">{sol.cliente}</td>
                          <td className="py-3 px-4 align-middle border-bottom border-secondary">{sol.tipoEvento}</td>
                          <td className="py-3 px-4 align-middle text-warning border-bottom border-secondary">{sol.presupuesto}</td>
                          <td className="py-3 px-4 align-middle border-bottom border-secondary">
                            <span className={`badge ${sol.estado === 'Pendiente' ? 'bg-danger' : sol.estado === 'Cotizado' ? 'bg-success' : 'bg-secondary'}`}>
                              {sol.estado}
                            </span>
                          </td>
                          <td className="py-3 px-4 align-middle text-end border-bottom border-secondary">
                            <div className="d-flex gap-2 justify-content-end">
                              <button onClick={() => verDetalles(sol)} className="btn btn-sm btn-outline-light px-3 rounded-pill">Revisar</button>
                              <button onClick={() => solicitarEliminacion(sol)} className="btn btn-sm btn-outline-danger px-3 rounded-pill">Descartar</button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL 1: REVISAR DETALLES Y COTIZAR */}
      {modalDetallesVisible && solicitudSeleccionada && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.85)', zIndex: 1050, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="bg-black p-4 p-md-5 rounded-4 border border-secondary shadow-lg" style={{ maxWidth: '700px', width: '95%', maxHeight: '90vh', overflowY: 'auto' }}>
            
            <div className="d-flex justify-content-between align-items-center border-bottom border-secondary pb-3 mb-4">
              <h3 className="fw-bold text-white mb-0">Detalles de Solicitud {solicitudSeleccionada.id}</h3>
              <span className={`badge fs-6 ${solicitudSeleccionada.estado === 'Pendiente' ? 'bg-danger' : 'bg-success'}`}>
                {solicitudSeleccionada.estado}
              </span>
            </div>
            
            <div className="row g-4 mb-4">
              {/* Info Cliente */}
              <div className="col-md-6">
                <div className="bg-dark p-3 rounded border border-secondary h-100">
                  <span className="text-warning fw-bold small text-uppercase mb-2 d-block">Datos del Cliente</span>
                  <p className="text-white mb-1"><strong>Nombre:</strong> {solicitudSeleccionada.cliente}</p>
                  <p className="text-white mb-1"><strong>Tel:</strong> {solicitudSeleccionada.telefono}</p>
                  <p className="text-white mb-0"><strong>Email:</strong> {solicitudSeleccionada.email}</p>
                </div>
              </div>
              
              {/* Info Evento */}
              <div className="col-md-6">
                <div className="bg-dark p-3 rounded border border-secondary h-100">
                  <span className="text-warning fw-bold small text-uppercase mb-2 d-block">Sobre el Evento</span>
                  <p className="text-white mb-1"><strong>Tipo:</strong> {solicitudSeleccionada.tipoEvento}</p>
                  <p className="text-white mb-1"><strong>Invitados:</strong> {solicitudSeleccionada.invitados}</p>
                  <p className="text-white mb-0"><strong>Presupuesto:</strong> {solicitudSeleccionada.presupuesto}</p>
                </div>
              </div>

              {/* Servicios Solicitados */}
              <div className="col-12">
                <span className="text-white-50 fw-bold small text-uppercase mb-2 d-block">Servicios de Interés</span>
                <div className="d-flex flex-wrap gap-2">
                  {solicitudSeleccionada.servicios.map((srv, i) => (
                    <span key={i} className="badge bg-secondary text-white py-2 px-3">{srv}</span>
                  ))}
                </div>
              </div>

              {/* Notas */}
              <div className="col-12">
                <span className="text-white-50 fw-bold small text-uppercase mb-2 d-block">Mensaje Adicional</span>
                <div className="bg-dark p-3 rounded border border-secondary text-white">
                  {solicitudSeleccionada.notas || "Sin notas adicionales."}
                </div>
              </div>
            </div>

            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-between pt-3 border-top border-secondary">
              <button onClick={() => setModalDetallesVisible(false)} className="btn btn-outline-light rounded-pill px-4 fw-bold">
                Cerrar
              </button>
              
              <div className="d-flex gap-2">
                {solicitudSeleccionada.estado === 'Pendiente' ? (
                  <>
                    <a href={`https://wa.me/52${solicitudSeleccionada.telefono.replace(/\s/g, '')}`} target="_blank" rel="noreferrer" className="btn btn-success rounded-pill px-4 fw-bold shadow">
                      Contactar por WhatsApp
                    </a>
                    <button onClick={() => cambiarEstado('Cotizado')} className="btn btn-warning rounded-pill px-4 fw-bold shadow">
                      Marcar como Cotizado
                    </button>
                  </>
                ) : (
                  <button onClick={() => cambiarEstado('Pendiente')} className="btn btn-outline-warning rounded-pill px-4 fw-bold">
                    Revertir a Pendiente
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* MODAL 2: CONFIRMAR ELIMINACIÓN */}
      {modalEliminarVisible && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.85)', zIndex: 1050, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="bg-black p-4 p-md-5 rounded-4 border border-danger shadow-lg text-center" style={{ maxWidth: '450px', width: '90%' }}>
            <div className="rounded-circle bg-danger text-white d-inline-flex justify-content-center align-items-center mb-4 shadow" style={{ width: '70px', height: '70px', fontSize: '2.5rem', fontWeight: 'bold' }}>!</div>
            <h3 className="fw-bold text-white mb-2">¿Descartar Solicitud?</h3>
            <p className="text-white-50 mb-4 px-2">
              Vas a borrar la solicitud <strong className="text-white">{solicitudAEliminar?.id}</strong> de {solicitudAEliminar?.cliente}.
            </p>
            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center mt-2">
              <button onClick={() => setModalEliminarVisible(false)} className="btn btn-outline-light px-4 py-2 fw-bold rounded-pill w-100">Cancelar</button>
              <button onClick={confirmarEliminacion} className="btn btn-danger px-4 py-2 fw-bold shadow rounded-pill w-100">Sí, descartar</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default SolicitudesPersonalizadas;