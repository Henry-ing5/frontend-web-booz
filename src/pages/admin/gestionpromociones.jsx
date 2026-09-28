import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const GestionPromociones = () => {
  // Datos simulados de promociones
  const [promociones, setPromociones] = useState([
    { 
      id: "PROM-01", 
      titulo: "15% de Descuento en Paquete Premium", 
      descuento: "15%",
      vigencia: "Octubre - Diciembre 2026",
      descripcion: "Reserva tu evento para los meses de Octubre a Diciembre y obtén un descuento exclusivo en tu pago total.", 
      imagen: "https://images.unsplash.com/photo-1511556532299?q=80&w=600&auto=format&fit=crop", 
      estado: "Activo" 
    },
    { 
      id: "PROM-02", 
      titulo: "Hora de DJ Gratis", 
      descuento: "1 Hora",
      vigencia: "Todo el año",
      descripcion: "Aplica al contratar cualquier paquete para eventos de más de 100 personas.", 
      imagen: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop", 
      estado: "Inactivo" 
    },
  ]);

  const [modalEliminarVisible, setModalEliminarVisible] = useState(false);
  const [promoAEliminar, setPromoAEliminar] = useState(null);
  
  const [modalFormularioVisible, setModalFormularioVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  
  const [formData, setFormData] = useState({ 
    id: '', titulo: '', descuento: '', vigencia: '', descripcion: '', imagen: '', estado: 'Activo' 
  });

  const solicitarEliminacion = (promo) => {
    setPromoAEliminar(promo);
    setModalEliminarVisible(true);
  };

  const confirmarEliminacion = () => {
    setPromociones(promociones.filter((p) => p.id !== promoAEliminar.id));
    setModalEliminarVisible(false);
    setPromoAEliminar(null);
  };

  const abrirModalNuevo = () => {
    setIsEditMode(false);
    setFormData({ id: '', titulo: '', descuento: '', vigencia: '', descripcion: '', imagen: '', estado: 'Activo' });
    setModalFormularioVisible(true);
  };

  const abrirModalEditar = (promo) => {
    setIsEditMode(true);
    setFormData(promo);
    setModalFormularioVisible(true);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      setPromociones(promociones.map(p => p.id === formData.id ? formData : p));
    } else {
      const nuevoId = `PROM-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
      setPromociones([{ ...formData, id: nuevoId }, ...promociones]);
    }
    setModalFormularioVisible(false);
  };

  return (
    <div className="d-flex position-relative" style={{ minHeight: '100vh', backgroundColor: '#212529' }}>
      
      {/* Menú Lateral Actualizado */}
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
          <Link to="/admin/promociones" className="btn btn-warning fw-bold text-start text-dark rounded-pill px-4 py-2">Gestión de Promociones</Link>
          <Link to="/admin/solicitudes" className="btn btn-outline-light text-start rounded-pill px-4 py-2 border-0">Gestión de Solicitudes Personalizadas</Link>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="flex-grow-1 d-flex flex-column">
        <nav className="navbar navbar-dark bg-black px-4 py-3 border-bottom border-secondary d-flex justify-content-between">
          <div className="text-white">
            <span className="fw-semibold">Gestión de Promociones</span>
          </div>
          <div>
            <Link to="/" className="btn btn-sm btn-outline-danger rounded-pill px-3 fw-bold">Cerrar Sesión</Link>
          </div>
        </nav>

        <div className="p-4 p-md-5">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
            <h3 className="text-white fw-bold mb-0">Promociones Activas</h3>
            <button onClick={abrirModalNuevo} className="btn btn-warning fw-bold px-4 rounded-pill shadow">
              + Nueva Promoción
            </button>
          </div>

          <div className="card bg-black border-secondary shadow-lg" style={{ borderRadius: '15px' }}>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-dark table-hover mb-0" style={{ borderRadius: '15px', overflow: 'hidden' }}>
                  <thead className="bg-dark">
                    <tr>
                      <th className="py-3 px-4 text-white-50 border-bottom border-secondary">Banner</th>
                      <th className="py-3 px-4 text-white-50 border-bottom border-secondary">Promoción</th>
                      <th className="py-3 px-4 text-white-50 border-bottom border-secondary">Beneficio</th>
                      <th className="py-3 px-4 text-white-50 border-bottom border-secondary">Estado</th>
                      <th className="py-3 px-4 text-white-50 border-bottom border-secondary text-end">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {promociones.map((promo) => (
                      <tr key={promo.id}>
                        <td className="py-3 px-4 align-middle border-bottom border-secondary" style={{ width: '120px' }}>
                          <img src={promo.imagen} alt={promo.titulo} className="rounded" style={{ width: '100px', height: '60px', objectFit: 'cover' }} />
                        </td>
                        <td className="py-3 px-4 align-middle border-bottom border-secondary">
                          <span className="d-block fw-bold">{promo.titulo}</span>
                          <span className="small text-white-50">Vigencia: {promo.vigencia}</span>
                        </td>
                        <td className="py-3 px-4 align-middle border-bottom border-secondary">
                          <span className="text-warning fw-bold">{promo.descuento}</span>
                        </td>
                        <td className="py-3 px-4 align-middle border-bottom border-secondary">
                          <span className={`badge ${promo.estado === 'Activo' ? 'bg-success' : 'bg-secondary'}`}>
                            {promo.estado}
                          </span>
                        </td>
                        <td className="py-3 px-4 align-middle text-end border-bottom border-secondary">
                          <div className="d-flex gap-2 justify-content-end">
                            <button onClick={() => abrirModalEditar(promo)} className="btn btn-sm btn-outline-light px-3 rounded-pill">Editar</button>
                            <button onClick={() => solicitarEliminacion(promo)} className="btn btn-sm btn-outline-danger px-3 rounded-pill">Borrar</button>
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

      {/* MODAL 1: FORMULARIO (NUEVO / EDITAR) */}
      {modalFormularioVisible && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.85)', zIndex: 1050, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="bg-black p-4 p-md-5 rounded-4 border border-secondary shadow-lg" style={{ maxWidth: '600px', width: '95%', maxHeight: '90vh', overflowY: 'auto' }}>
            
            <h3 className="fw-bold text-white mb-4 border-bottom border-secondary pb-3 position-sticky top-0 bg-black pt-2" style={{ zIndex: 10 }}>
              {isEditMode ? 'Editar Promoción' : 'Crear Nueva Promoción'}
            </h3>
            
            <form onSubmit={handleFormSubmit}>
              <div className="row g-3 mb-4">
                
                <div className="col-md-8">
                  <label className="form-label text-white-50 small">Título de la Promoción</label>
                  <input type="text" name="titulo" value={formData.titulo} onChange={handleFormChange} className="form-control bg-dark text-white border-secondary" required placeholder="Ej. 15% de Descuento..." />
                </div>
                
                <div className="col-md-4">
                  <label className="form-label text-white-50 small">Estado</label>
                  <select name="estado" value={formData.estado} onChange={handleFormChange} className="form-select bg-dark text-white border-secondary">
                    <option value="Activo">Activo (Visible)</option>
                    <option value="Inactivo">Inactivo (Oculto)</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label text-white-50 small">Valor / Descuento</label>
                  <input type="text" name="descuento" value={formData.descuento} onChange={handleFormChange} className="form-control bg-dark text-white border-secondary" required placeholder="Ej. 15% o 1 Hora DJ" />
                </div>

                <div className="col-md-6">
                  <label className="form-label text-white-50 small">Vigencia</label>
                  <input type="text" name="vigencia" value={formData.vigencia} onChange={handleFormChange} className="form-control bg-dark text-white border-secondary" required placeholder="Ej. Octubre - Diciembre" />
                </div>

                <div className="col-12">
                  <label className="form-label text-white-50 small">Descripción Detallada</label>
                  <textarea name="descripcion" value={formData.descripcion} onChange={handleFormChange} className="form-control bg-dark text-white border-secondary" rows="2" required placeholder="Términos y condiciones de la promoción..."></textarea>
                </div>

                <div className="col-12 mt-3 pt-3 border-top border-secondary">
                  <label className="form-label text-warning small fw-bold">Banner / Imagen Promocional</label>
                  <input type="text" name="imagen" value={formData.imagen} onChange={handleFormChange} className="form-control bg-dark text-white border-secondary" required placeholder="URL de la imagen (apaisada de preferencia)..." />
                </div>

              </div>

              <div className="d-flex gap-3 justify-content-end pt-4 border-top border-secondary position-sticky bottom-0 bg-black pb-2">
                <button type="button" onClick={() => setModalFormularioVisible(false)} className="btn btn-outline-light rounded-pill px-4 fw-bold">Cancelar</button>
                <button type="submit" className="btn btn-warning rounded-pill px-4 fw-bold shadow">
                  {isEditMode ? 'Guardar Cambios' : 'Publicar Promoción'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* MODAL 2: CONFIRMAR ELIMINACIÓN */}
      {modalEliminarVisible && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.85)', zIndex: 1050, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="bg-black p-4 p-md-5 rounded-4 border border-danger shadow-lg text-center" style={{ maxWidth: '450px', width: '90%' }}>
            <div className="rounded-circle bg-danger text-white d-inline-flex justify-content-center align-items-center mb-4 shadow" style={{ width: '70px', height: '70px', fontSize: '2.5rem', fontWeight: 'bold' }}>!</div>
            <h3 className="fw-bold text-white mb-2">¿Borrar Promoción?</h3>
            <p className="text-white-50 mb-4 px-2">
              Estás a punto de eliminar <strong className="text-white">"{promoAEliminar?.titulo}"</strong>. Dejará de mostrarse en la pantalla principal de los clientes.
            </p>
            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center mt-2">
              <button onClick={() => setModalEliminarVisible(false)} className="btn btn-outline-light px-4 py-2 fw-bold rounded-pill w-100">Cancelar</button>
              <button onClick={confirmarEliminacion} className="btn btn-danger px-4 py-2 fw-bold shadow rounded-pill w-100">Sí, borrar</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default GestionPromociones;