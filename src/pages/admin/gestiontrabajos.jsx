import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const GestionTrabajos = () => {
  // Datos simulados del portafolio, ahora la galería incluye URL y descripción
  const [trabajos, setTrabajos] = useState([
    { 
      id: "TRB-01", 
      titulo: "Boda Civil - Jardín", 
      descripcion: "Iluminación arquitectónica y pista de cristal.", 
      imagen: "https://images.unsplash.com/photo-1519225421980?q=80&w=600&auto=format&fit=crop", 
      galeria: [
        { url: "https://images.unsplash.com/photo-1511285560929?q=80&w=600&auto=format&fit=crop", descripcion: "Montaje de mesas estilo vintage." },
        { url: "https://images.unsplash.com/photo-1520854221256?q=80&w=600&auto=format&fit=crop", descripcion: "Detalle de los centros de mesa." }
      ],
      estado: "Publicado" 
    },
    { 
      id: "TRB-02", 
      titulo: "XV Años Neón", 
      descripcion: "Sonido line array, DJ en vivo y pirotecnia fría.", 
      imagen: "https://images.unsplash.com/photo-1566737236500?q=80&w=600&auto=format&fit=crop", 
      galeria: [],
      estado: "Publicado" 
    },
  ]);

  const [modalEliminarVisible, setModalEliminarVisible] = useState(false);
  const [trabajoAEliminar, setTrabajoAEliminar] = useState(null);
  
  const [modalFormularioVisible, setModalFormularioVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  
  const [formData, setFormData] = useState({ 
    id: '', titulo: '', descripcion: '', imagen: '', galeria: [], estado: 'Publicado' 
  });

  const solicitarEliminacion = (trabajo) => {
    setTrabajoAEliminar(trabajo);
    setModalEliminarVisible(true);
  };

  const confirmarEliminacion = () => {
    setTrabajos(trabajos.filter((t) => t.id !== trabajoAEliminar.id));
    setModalEliminarVisible(false);
    setTrabajoAEliminar(null);
  };

  const abrirModalNuevo = () => {
    setIsEditMode(false);
    setFormData({ id: '', titulo: '', descripcion: '', imagen: '', galeria: [{ url: '', descripcion: '' }], estado: 'Publicado' });
    setModalFormularioVisible(true);
  };

  const abrirModalEditar = (trabajo) => {
    setIsEditMode(true);
    // Aseguramos que la galería tenga el formato correcto para editar
    const galeriaFormato = trabajo.galeria?.length ? [...trabajo.galeria] : [{ url: '', descripcion: '' }];
    setFormData({ ...trabajo, galeria: galeriaFormato });
    setModalFormularioVisible(true);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- LÓGICA DE GALERÍA CON DESCRIPCIÓN ---
  const handleGaleriaChange = (index, campo, valor) => {
    const nuevaGaleria = [...formData.galeria];
    nuevaGaleria[index][campo] = valor;
    setFormData({ ...formData, galeria: nuevaGaleria });
  };

  const agregarCampoGaleria = () => {
    setFormData({ ...formData, galeria: [...formData.galeria, { url: '', descripcion: '' }] });
  };

  const eliminarCampoGaleria = (index) => {
    const nuevaGaleria = formData.galeria.filter((_, i) => i !== index);
    setFormData({ ...formData, galeria: nuevaGaleria });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Filtramos las fotos que se hayan dejado en blanco (sin URL)
    const datosProcesados = {
      ...formData,
      galeria: formData.galeria.filter(foto => foto.url.trim() !== '')
    };

    if (isEditMode) {
      setTrabajos(trabajos.map(t => t.id === datosProcesados.id ? datosProcesados : t));
    } else {
      const nuevoId = `TRB-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
      setTrabajos([{ ...datosProcesados, id: nuevoId }, ...trabajos]);
    }
    setModalFormularioVisible(false);
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
          <Link to="/admin/portafolio" className="btn btn-warning fw-bold text-start text-dark rounded-pill px-4 py-2">Gestión de Trabajos Recientes</Link>
          <Link to="/admin/promociones" className="btn btn-outline-light text-start rounded-pill px-4 py-2 border-0">Gestión de Promociones</Link>
          <Link to="/admin/solicitudes" className="btn btn-outline-light text-start rounded-pill px-4 py-2 border-0">Gestión de Solicitudes Personalizadas</Link>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="flex-grow-1 d-flex flex-column">
        <nav className="navbar navbar-dark bg-black px-4 py-3 border-bottom border-secondary d-flex justify-content-between">
          <div className="text-white">
            <span className="fw-semibold">Gestión de Trabajos Recientes</span>
          </div>
          <div>
            <Link to="/" className="btn btn-sm btn-outline-danger rounded-pill px-3 fw-bold">Cerrar Sesión</Link>
          </div>
        </nav>

        <div className="p-4 p-md-5">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
            <h3 className="text-white fw-bold mb-0">Portafolio de Eventos</h3>
            <button onClick={abrirModalNuevo} className="btn btn-warning fw-bold px-4 rounded-pill shadow">
              + Nuevo Trabajo
            </button>
          </div>

          <div className="card bg-black border-secondary shadow-lg" style={{ borderRadius: '15px' }}>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-dark table-hover mb-0" style={{ borderRadius: '15px', overflow: 'hidden' }}>
                  <thead className="bg-dark">
                    <tr>
                      <th className="py-3 px-4 text-white-50 border-bottom border-secondary">Portada</th>
                      <th className="py-3 px-4 text-white-50 border-bottom border-secondary">Detalles del Evento</th>
                      <th className="py-3 px-4 text-white-50 border-bottom border-secondary text-center">Fotos Extra</th>
                      <th className="py-3 px-4 text-white-50 border-bottom border-secondary">Estado</th>
                      <th className="py-3 px-4 text-white-50 border-bottom border-secondary text-end">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trabajos.map((trabajo) => (
                      <tr key={trabajo.id}>
                        <td className="py-3 px-4 align-middle border-bottom border-secondary" style={{ width: '120px' }}>
                          <img src={trabajo.imagen} alt={trabajo.titulo} className="rounded" style={{ width: '100px', height: '60px', objectFit: 'cover' }} />
                        </td>
                        <td className="py-3 px-4 align-middle border-bottom border-secondary">
                          <span className="d-block fw-bold">{trabajo.titulo}</span>
                          <span className="small text-white-50">{trabajo.descripcion}</span>
                        </td>
                        <td className="py-3 px-4 align-middle border-bottom border-secondary text-center">
                          <span className="badge bg-dark border border-secondary text-white-50">
                            {trabajo.galeria?.length || 0} fotos
                          </span>
                        </td>
                        <td className="py-3 px-4 align-middle border-bottom border-secondary">
                          <span className={`badge ${trabajo.estado === 'Publicado' ? 'bg-success' : 'bg-secondary'}`}>
                            {trabajo.estado}
                          </span>
                        </td>
                        <td className="py-3 px-4 align-middle text-end border-bottom border-secondary">
                          <div className="d-flex gap-2 justify-content-end">
                            <button onClick={() => abrirModalEditar(trabajo)} className="btn btn-sm btn-outline-light px-3 rounded-pill">Editar</button>
                            <button onClick={() => solicitarEliminacion(trabajo)} className="btn btn-sm btn-outline-danger px-3 rounded-pill">Borrar</button>
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
          
          <div className="bg-black p-4 p-md-5 rounded-4 border border-secondary shadow-lg" style={{ maxWidth: '650px', width: '95%', maxHeight: '90vh', overflowY: 'auto' }}>
            
            <h3 className="fw-bold text-white mb-4 border-bottom border-secondary pb-3 position-sticky top-0 bg-black pt-2" style={{ zIndex: 10 }}>
              {isEditMode ? 'Editar Trabajo Reciente' : 'Subir Nuevo Trabajo'}
            </h3>
            
            <form onSubmit={handleFormSubmit}>
              <div className="row g-3 mb-4">
                
                <div className="col-md-8">
                  <label className="form-label text-white-50 small">Título del Evento</label>
                  <input type="text" name="titulo" value={formData.titulo} onChange={handleFormChange} className="form-control bg-dark text-white border-secondary" required placeholder="Ej. Boda Civil en Jardín" />
                </div>
                
                <div className="col-md-4">
                  <label className="form-label text-white-50 small">Estado</label>
                  <select name="estado" value={formData.estado} onChange={handleFormChange} className="form-select bg-dark text-white border-secondary">
                    <option value="Publicado">Publicado</option>
                    <option value="Oculto">Oculto</option>
                  </select>
                </div>

                <div className="col-12">
                  <label className="form-label text-white-50 small">Descripción Principal</label>
                  <textarea name="descripcion" value={formData.descripcion} onChange={handleFormChange} className="form-control bg-dark text-white border-secondary" rows="2" required placeholder="Descripción general del evento..."></textarea>
                </div>

                <div className="col-12 mt-3 pt-3 border-top border-secondary">
                  <label className="form-label text-warning small fw-bold">1. Portada del Evento</label>
                  <input type="text" name="imagen" value={formData.imagen} onChange={handleFormChange} className="form-control bg-dark text-white border-secondary" required placeholder="URL de la imagen de portada..." />
                </div>

                {/* GALERÍA DINÁMICA CON DESCRIPCIÓN */}
                <div className="col-12 mt-3 pt-3 border-top border-secondary">
                  <label className="form-label text-white-50 small fw-bold d-block mb-3">2. Galería de Fotos (Opcional)</label>
                  
                  {formData.galeria.map((foto, index) => (
                    <div key={index} className="bg-dark p-3 rounded border border-secondary mb-3 position-relative">
                      
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="text-warning small fw-bold">Foto #{index + 1}</span>
                        <button type="button" onClick={() => eliminarCampoGaleria(index)} className="btn btn-sm btn-outline-danger px-2 py-0" title="Quitar foto">
                          X
                        </button>
                      </div>

                      <div className="mb-2">
                        <input 
                          type="text" 
                          value={foto.url} 
                          onChange={(e) => handleGaleriaChange(index, 'url', e.target.value)} 
                          className="form-control form-control-sm bg-black text-white border-secondary" 
                          placeholder="URL de la imagen..." 
                        />
                      </div>
                      <div>
                        <input 
                          type="text" 
                          value={foto.descripcion} 
                          onChange={(e) => handleGaleriaChange(index, 'descripcion', e.target.value)} 
                          className="form-control form-control-sm bg-black text-white border-secondary" 
                          placeholder="Descripción breve de esta foto..." 
                        />
                      </div>

                    </div>
                  ))}
                  
                  <button type="button" onClick={agregarCampoGaleria} className="btn btn-outline-light btn-sm rounded-pill px-3 mt-1">
                    + Agregar otra foto a la galería
                  </button>
                </div>

              </div>

              <div className="d-flex gap-3 justify-content-end pt-4 border-top border-secondary position-sticky bottom-0 bg-black pb-2">
                <button type="button" onClick={() => setModalFormularioVisible(false)} className="btn btn-outline-light rounded-pill px-4 fw-bold">
                  Cancelar
                </button>
                <button type="submit" className="btn btn-warning rounded-pill px-4 fw-bold shadow">
                  {isEditMode ? 'Guardar Cambios' : 'Publicar Trabajo'}
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
            <h3 className="fw-bold text-white mb-2">¿Borrar del Portafolio?</h3>
            <p className="text-white-50 mb-4 px-2">
              Estás a punto de eliminar <strong className="text-white">"{trabajoAEliminar?.titulo}"</strong>.
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

export default GestionTrabajos;