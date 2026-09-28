import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductosServicios = () => {
  // Datos del inventario
  const [items, setItems] = useState([
    { id: "PROD-01", nombre: "Silla Tiffany Blanca", categoria: "Mobiliario", precio: "25.00", stock: 200, tipo: "Físico" },
    { id: "PROD-02", nombre: "Mesa Imperial", categoria: "Mobiliario", precio: "250.00", stock: 20, tipo: "Físico" },
    { id: "SERV-01", nombre: "Hora extra de DJ", categoria: "Música", precio: "1500.00", stock: "N/A", tipo: "Servicio" },
    { id: "PROD-03", nombre: "Chispero de Pirotecnia Fría", categoria: "Efectos", precio: "800.00", stock: 12, tipo: "Físico" },
    { id: "SERV-02", nombre: "Animador (Botarga)", categoria: "Entretenimiento", precio: "2000.00", stock: "N/A", tipo: "Servicio" },
  ]);

  const [filtroCategoria, setFiltroCategoria] = useState('Todos');

  // Estados para el Modal de Eliminación
  const [modalEliminarVisible, setModalEliminarVisible] = useState(false);
  const [itemAEliminar, setItemAEliminar] = useState(null);

  // Estados para el Modal de Formulario (Crear/Editar)
  const [modalFormularioVisible, setModalFormularioVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: '', nombre: '', categoria: 'Mobiliario', precio: '', stock: '', tipo: 'Físico'
  });

  // --- LÓGICA DE ELIMINACIÓN ---
  const solicitarEliminacion = (item) => {
    setItemAEliminar(item);
    setModalEliminarVisible(true);
  };

  const confirmarEliminacion = () => {
    setItems(items.filter((i) => i.id !== itemAEliminar.id));
    setModalEliminarVisible(false);
    setItemAEliminar(null);
  };

  // --- LÓGICA DE FORMULARIO ---
  const abrirModalNuevo = () => {
    setIsEditMode(false);
    setFormData({ id: '', nombre: '', categoria: 'Mobiliario', precio: '', stock: '', tipo: 'Físico' });
    setModalFormularioVisible(true);
  };

  const abrirModalEditar = (item) => {
    setIsEditMode(true);
    setFormData(item);
    setModalFormularioVisible(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    // Si cambia a 'Servicio', el stock se vuelve N/A automáticamente
    if (name === 'tipo' && value === 'Servicio') {
      setFormData({ ...formData, [name]: value, stock: 'N/A' });
    } else if (name === 'tipo' && value === 'Físico') {
      setFormData({ ...formData, [name]: value, stock: '0' });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      // Actualiza el elemento existente
      setItems(items.map(item => item.id === formData.id ? formData : item));
    } else {
      // Crea un nuevo elemento con un ID simulado
      const prefijo = formData.tipo === 'Físico' ? 'PROD' : 'SERV';
      const nuevoId = `${prefijo}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
      setItems([...items, { ...formData, id: nuevoId }]);
    }
    setModalFormularioVisible(false);
  };

  // Filtrado de la tabla
  const itemsFiltrados = items.filter(item => {
    if (filtroCategoria === 'Todos') return true;
    return item.tipo === filtroCategoria;
  });

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
          <Link to="/admin" className="btn btn-outline-light text-start rounded-pill px-4 py-2 border-0">Panel Principal</Link>
          <Link to="/admin/paquetes" className="btn btn-outline-light text-start rounded-pill px-4 py-2 border-0">Gestión de Paquetes</Link>
          <Link to="/admin/agenda" className="btn btn-outline-light text-start rounded-pill px-4 py-2 border-0">Agenda de Eventos</Link>
          <Link to="/admin/ingresos" className="btn btn-outline-light text-start rounded-pill px-4 py-2 border-0">Ingresos</Link>
          <Link to="/admin/productos" className="btn btn-warning fw-bold text-start text-dark rounded-pill px-4 py-2">Productos y Servicios</Link>
          <Link to="/admin/portafolio" className="btn btn-outline-light text-start rounded-pill px-4 py-2 border-0">Gestión de Trabajos Recientes</Link>
          <Link to="/admin/promociones" className="btn btn-outline-light text-start rounded-pill px-4 py-2 border-0">Gestión de Promociones</Link>
          <Link to="/admin/solicitudes" className="btn btn-warning fw-bold text-start text-dark rounded-pill px-4 py-2">Gestión de Solicitudes Personalizadas</Link>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="flex-grow-1 d-flex flex-column">
        
        <nav className="navbar navbar-dark bg-black px-4 py-3 border-bottom border-secondary d-flex justify-content-between">
          <div className="text-white">
            <span className="fw-semibold">Inventario y Servicios Extras</span>
          </div>
          <div>
            <Link to="/" className="btn btn-sm btn-outline-danger rounded-pill px-3 fw-bold">Cerrar Sesión</Link>
          </div>
        </nav>

        <div className="p-4 p-md-5">
          
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
            <h3 className="text-white fw-bold mb-0">Catálogo de Elementos</h3>
            
            <div className="d-flex gap-2">
              <button 
                onClick={() => setFiltroCategoria('Todos')}
                className={`btn rounded-pill px-4 fw-bold btn-sm ${filtroCategoria === 'Todos' ? 'btn-warning text-dark' : 'btn-outline-light'}`}
              >
                Todos
              </button>
              <button 
                onClick={() => setFiltroCategoria('Físico')}
                className={`btn rounded-pill px-4 fw-bold btn-sm ${filtroCategoria === 'Físico' ? 'btn-warning text-dark' : 'btn-outline-light'}`}
              >
                Inventario Físico
              </button>
              <button 
                onClick={() => setFiltroCategoria('Servicio')}
                className={`btn rounded-pill px-4 fw-bold btn-sm ${filtroCategoria === 'Servicio' ? 'btn-warning text-dark' : 'btn-outline-light'}`}
              >
                Servicios
              </button>
            </div>
            
            <button onClick={abrirModalNuevo} className="btn btn-warning fw-bold px-4 rounded-pill shadow">
              + Nuevo Elemento
            </button>
          </div>

          <div className="card bg-black border-secondary shadow-lg" style={{ borderRadius: '15px' }}>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-dark table-hover mb-0" style={{ borderRadius: '15px', overflow: 'hidden' }}>
                  <thead className="bg-dark">
                    <tr>
                      <th className="py-3 px-4 text-white-50 border-bottom border-secondary">ID</th>
                      <th className="py-3 px-4 text-white-50 border-bottom border-secondary">Nombre</th>
                      <th className="py-3 px-4 text-white-50 border-bottom border-secondary">Categoría</th>
                      <th className="py-3 px-4 text-white-50 border-bottom border-secondary">Stock</th>
                      <th className="py-3 px-4 text-white-50 border-bottom border-secondary">Precio Unitario</th>
                      <th className="py-3 px-4 text-white-50 border-bottom border-secondary text-end">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {itemsFiltrados.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center py-4 text-white-50">No hay elementos en esta categoría.</td>
                      </tr>
                    ) : (
                      itemsFiltrados.map((item) => (
                        <tr key={item.id}>
                          <td className="py-3 px-4 align-middle border-bottom border-secondary text-white-50 small">{item.id}</td>
                          <td className="py-3 px-4 align-middle fw-bold border-bottom border-secondary">{item.nombre}</td>
                          <td className="py-3 px-4 align-middle border-bottom border-secondary">
                            <span className="badge bg-secondary">{item.categoria}</span>
                          </td>
                          <td className="py-3 px-4 align-middle border-bottom border-secondary">
                            {item.tipo === 'Físico' ? (
                              <span className={Number(item.stock) < 20 ? "text-danger fw-bold" : "text-white"}>{item.stock} uds.</span>
                            ) : (
                              <span className="text-white-50">-</span>
                            )}
                          </td>
                          <td className="py-3 px-4 align-middle text-warning fw-bold border-bottom border-secondary">
                            ${Number(item.precio).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                          </td>
                          <td className="py-3 px-4 align-middle text-end border-bottom border-secondary">
                            <div className="d-flex gap-2 justify-content-end">
                              <button onClick={() => abrirModalEditar(item)} className="btn btn-sm btn-outline-light px-3 rounded-pill">Editar</button>
                              <button onClick={() => solicitarEliminacion(item)} className="btn btn-sm btn-outline-danger px-3 rounded-pill">Borrar</button>
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

      {/* MODAL 1: FORMULARIO (NUEVO / EDITAR) */}
      {modalFormularioVisible && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.85)', zIndex: 1050, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="bg-black p-4 p-md-5 rounded-4 border border-secondary shadow-lg" style={{ maxWidth: '600px', width: '95%' }}>
            
            <h3 className="fw-bold text-white mb-4 border-bottom border-secondary pb-3">
              {isEditMode ? 'Editar Elemento' : 'Registrar Nuevo Elemento'}
            </h3>
            
            <form onSubmit={handleFormSubmit}>
              <div className="row g-3 mb-4">
                
                <div className="col-md-8">
                  <label className="form-label text-white-50 small">Nombre del Producto / Servicio</label>
                  <input type="text" name="nombre" value={formData.nombre} onChange={handleFormChange} className="form-control bg-dark text-white border-secondary" required />
                </div>
                
                <div className="col-md-4">
                  <label className="form-label text-white-50 small">Tipo</label>
                  <select name="tipo" value={formData.tipo} onChange={handleFormChange} className="form-select bg-dark text-white border-secondary">
                    <option value="Físico">Inventario Físico</option>
                    <option value="Servicio">Servicio Extra</option>
                  </select>
                </div>

                <div className="col-md-4">
                  <label className="form-label text-white-50 small">Categoría</label>
                  <select name="categoria" value={formData.categoria} onChange={handleFormChange} className="form-select bg-dark text-white border-secondary">
                    <option value="Mobiliario">Mobiliario</option>
                    <option value="Música">Música / Audio</option>
                    <option value="Efectos">Efectos Especiales</option>
                    <option value="Entretenimiento">Entretenimiento</option>
                    <option value="Personal">Personal</option>
                  </select>
                </div>

                <div className="col-md-4">
                  <label className="form-label text-white-50 small">Precio (MXN)</label>
                  <input type="number" step="0.01" name="precio" value={formData.precio} onChange={handleFormChange} className="form-control bg-dark text-white border-secondary" required />
                </div>

                <div className="col-md-4">
                  <label className="form-label text-white-50 small">Stock (Unidades)</label>
                  <input 
                    type={formData.tipo === 'Servicio' ? 'text' : 'number'} 
                    name="stock" 
                    value={formData.stock} 
                    onChange={handleFormChange} 
                    className="form-control bg-dark text-white border-secondary" 
                    disabled={formData.tipo === 'Servicio'}
                    required 
                  />
                </div>
              </div>

              <div className="d-flex gap-3 justify-content-end pt-2">
                <button type="button" onClick={() => setModalFormularioVisible(false)} className="btn btn-outline-light rounded-pill px-4 fw-bold">
                  Cancelar
                </button>
                <button type="submit" className="btn btn-warning rounded-pill px-4 fw-bold shadow">
                  {isEditMode ? 'Guardar Cambios' : 'Crear Elemento'}
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
            
            <div className="rounded-circle bg-danger text-white d-inline-flex justify-content-center align-items-center mb-4 shadow" style={{ width: '70px', height: '70px', fontSize: '2.5rem', fontWeight: 'bold' }}>
              !
            </div>
            
            <h3 className="fw-bold text-white mb-2">¿Borrar Elemento?</h3>
            <p className="text-white-50 mb-4 px-2">
              Estás a punto de eliminar <strong className="text-white">"{itemAEliminar?.nombre}"</strong> del inventario. Esta acción no se puede deshacer.
            </p>
            
            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center mt-2">
              <button onClick={() => setModalEliminarVisible(false)} className="btn btn-outline-light px-4 py-2 fw-bold rounded-pill w-100">
                Cancelar
              </button>
              <button onClick={confirmarEliminacion} className="btn btn-danger px-4 py-2 fw-bold shadow rounded-pill w-100">
                Sí, borrar
              </button>
            </div>
            
          </div>
        </div>
      )}

    </div>
  );
};

export default ProductosServicios;