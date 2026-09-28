import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const GestionPaquetes = () => {
  const [paquetes, setPaquetes] = useState([
    { id: 1, nombre: "Paquete Básico", precio: "5,500.00", estado: "Activo" },
    { id: 2, nombre: "Paquete Premium", precio: "12,000.00", estado: "Activo" },
    { id: 3, nombre: "Paquete VIP", precio: "25,000.00", estado: "Inactivo" },
  ]);

  // Estados para el Modal de Eliminación
  const [modalVisible, setModalVisible] = useState(false);
  const [paqueteAEliminar, setPaqueteAEliminar] = useState(null);

  // Abrir el modal y guardar qué paquete se seleccionó
  const solicitarEliminacion = (paquete) => {
    setPaqueteAEliminar(paquete);
    setModalVisible(true);
  };

  // Función que realmente borra el dato al confirmar
  const confirmarEliminacion = () => {
    if (paqueteAEliminar) {
      const nuevosPaquetes = paquetes.filter((p) => p.id !== paqueteAEliminar.id);
      setPaquetes(nuevosPaquetes);
      
      // Limpiar y cerrar el modal
      setModalVisible(false);
      setPaqueteAEliminar(null);
    }
  };

  // Cancelar la acción
  const cancelarEliminacion = () => {
    setModalVisible(false);
    setPaqueteAEliminar(null);
  };

  return (
    <div className="d-flex position-relative" style={{ minHeight: '100vh', backgroundColor: '#212529' }}>
      
      {/* Menú Lateral (Sidebar) */}
      <div className="bg-black border-end border-secondary d-flex flex-column d-none d-md-flex flex-shrink-0" style={{ width: '260px', minWidth: '260px' }}>
        <div className="p-4 border-bottom border-secondary text-center">
          <h4 className="text-white fw-bold mb-0 text-uppercase" style={{ letterSpacing: '2px' }}>
            Booz <span className="text-warning">Admin</span>
          </h4>
        </div>
        
        <div className="d-flex flex-column p-3 gap-2 mt-2">
          <Link to="/admin" className="btn btn-outline-light text-start rounded-pill px-4 py-2 border-0">
            Panel Principal
          </Link>
          <Link to="/admin/paquetes" className="btn btn-warning fw-bold text-start text-dark rounded-pill px-4 py-2">
            Gestión de Paquetes
          </Link>
          <Link to="/admin/agenda" className="btn btn-outline-light text-start rounded-pill px-4 py-2 border-0">
            Agenda de Eventos
          </Link>
          <Link to="/admin/ingresos" className="btn btn-outline-light text-start rounded-pill px-4 py-2 border-0">
            Ingresos
          </Link>
          <Link to="/admin/productos" className="btn btn-outline-light text-start rounded-pill px-4 py-2 border-0">
            Productos y Servicios
          </Link>
          <Link to="/admin/portafolio" className="btn btn-outline-light text-start rounded-pill px-4 py-2 border-0">
            Gestion de Trabajos Recientes
          </Link>
          <Link to="/admin/promociones" className="btn btn-outline-light text-start rounded-pill px-4 py-2 border-0">
            Gestión de Promociones
          </Link>
          <Link to="/admin/solicitudes" className="btn btn-warning fw-bold text-start text-dark rounded-pill px-4 py-2">
            Gestión de Solicitudes Personalizadas
          </Link>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="flex-grow-1 d-flex flex-column">
        
        <nav className="navbar navbar-dark bg-black px-4 py-3 border-bottom border-secondary d-flex justify-content-between">
          <div className="text-white">
            <span className="fw-semibold">Gestión de Paquetes</span>
          </div>
          <div>
            <Link to="/" className="btn btn-sm btn-outline-danger rounded-pill px-3 fw-bold">
              Cerrar Sesión
            </Link>
          </div>
        </nav>

        {/* Área de Trabajo - Tabla de Paquetes */}
        <div className="p-4 p-md-5">
          
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="text-white fw-bold mb-0">Catálogo de Paquetes</h3>
            <Link to="/admin/paquetes/nuevo" className="btn btn-warning fw-bold px-4 rounded-pill shadow text-decoration-none">
              + Nuevo Paquete
            </Link>
          </div>

          <div className="card bg-black border-secondary shadow-lg" style={{ borderRadius: '15px' }}>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-dark table-hover mb-0" style={{ borderRadius: '15px', overflow: 'hidden' }}>
                  <thead className="bg-dark">
                    <tr>
                      <th className="py-3 px-4 text-white-50 border-bottom border-secondary">ID</th>
                      <th className="py-3 px-4 text-white-50 border-bottom border-secondary">Nombre del Paquete</th>
                      <th className="py-3 px-4 text-white-50 border-bottom border-secondary">Precio</th>
                      <th className="py-3 px-4 text-white-50 border-bottom border-secondary">Estado</th>
                      <th className="py-3 px-4 text-white-50 border-bottom border-secondary text-end">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paquetes.map((paquete) => (
                      <tr key={paquete.id}>
                        <td className="py-3 px-4 align-middle border-bottom border-secondary">#{paquete.id}</td>
                        <td className="py-3 px-4 align-middle fw-bold border-bottom border-secondary">{paquete.nombre}</td>
                        <td className="py-3 px-4 align-middle text-warning border-bottom border-secondary">${paquete.precio}</td>
                        <td className="py-3 px-4 align-middle border-bottom border-secondary">
                          <span className={`badge ${paquete.estado === 'Activo' ? 'bg-success' : 'bg-secondary'}`}>
                            {paquete.estado}
                          </span>
                        </td>
                        <td className="py-3 px-4 align-middle text-end border-bottom border-secondary">
                          <div className="d-flex gap-2 justify-content-end">
                            <Link to={`/admin/paquetes/editar/${paquete.id}`} className="btn btn-sm btn-outline-light px-3 rounded-pill text-decoration-none">
                              Editar
                            </Link>
                            
                            {/* BOTÓN QUE DISPARA EL MODAL */}
                            <button 
                              onClick={() => solicitarEliminacion(paquete)}
                              className="btn btn-sm btn-outline-danger px-3 rounded-pill"
                            >
                              Eliminar
                            </button>
                            
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* MODAL DE CONFIRMACIÓN DE ELIMINACIÓN */}
      {modalVisible && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.8)', zIndex: 1050, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="bg-black p-4 p-md-5 rounded-4 border border-danger shadow-lg text-center" style={{ maxWidth: '450px', width: '90%' }}>
            
            <div className="rounded-circle bg-danger text-white d-inline-flex justify-content-center align-items-center mb-4 shadow" style={{ width: '70px', height: '70px', fontSize: '2.5rem', fontWeight: 'bold' }}>
              !
            </div>
            
            <h3 className="fw-bold text-white mb-2">¿Estás seguro?</h3>
            <p className="text-white-50 mb-4 px-2">
              Estás a punto de eliminar el paquete <strong className="text-white">"{paqueteAEliminar?.nombre}"</strong> del catálogo. Esta acción es permanente.
            </p>
            
            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center mt-2">
              <button 
                className="btn btn-outline-light px-4 py-2 fw-bold rounded-pill w-100" 
                onClick={cancelarEliminacion}
              >
                Cancelar
              </button>
              <button 
                className="btn btn-danger px-4 py-2 fw-bold shadow rounded-pill w-100" 
                onClick={confirmarEliminacion}
              >
                Sí, eliminar
              </button>
            </div>
            
          </div>
        </div>
      )}

    </div>
  );
};

export default GestionPaquetes;