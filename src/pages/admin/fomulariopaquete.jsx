import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const FormularioPaquete = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Si existe un ID, estamos en modo Edición
  const isEditMode = Boolean(id);

  // Estado del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    estado: 'Activo',
    descripcion: '',
    servicios: '',
    imagen: ''
  });

  // Estado para el modal de éxito
  const [modalExitoVisible, setModalExitoVisible] = useState(false);

  // Simulación de carga de datos si estamos editando
  useEffect(() => {
    if (isEditMode) {
      // Aquí en el futuro harás un fetch a tu API para traer los datos reales
      setFormData({
        nombre: 'Paquete Premium',
        precio: '12000',
        estado: 'Activo',
        descripcion: 'La mejor experiencia para tu boda o XV años.',
        servicios: 'Sonido Line Array, DJ, Pista Iluminada, Pirotecnia',
        imagen: 'https://images.unsplash.com/photo-1492684223066'
      });
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí enviarás los datos a tu backend (POST o PUT)
    console.log("Datos a guardar:", formData);
    
    // En lugar de un alert y navegar de inmediato, abrimos nuestro modal
    setModalExitoVisible(true);
  };

  return (
    <div className="d-flex position-relative" style={{ minHeight: '100vh', backgroundColor: '#212529' }}>
      
      {/* Menú Lateral */}
      <div className="bg-black border-end border-secondary d-flex flex-column d-none d-md-flex" style={{ width: '260px' }}>
        <div className="p-4 border-bottom border-secondary text-center">
          <h4 className="text-white fw-bold mb-0 text-uppercase" style={{ letterSpacing: '2px' }}>
            Booz <span className="text-warning">Admin</span>
          </h4>
        </div>
        <div className="d-flex flex-column p-3 gap-2 mt-2">
          <Link to="/admin" className="btn btn-outline-light text-start rounded-pill px-4 py-2 border-0">Panel Principal</Link>
          <Link to="/admin/paquetes" className="btn btn-warning fw-bold text-start text-dark rounded-pill px-4 py-2">Gestión de Paquetes</Link>
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
            <span className="fw-semibold">{isEditMode ? 'Editar Paquete' : 'Nuevo Paquete'}</span>
          </div>
          <div>
            <Link to="/" className="btn btn-sm btn-outline-danger rounded-pill px-3 fw-bold">Cerrar Sesión</Link>
          </div>
        </nav>

        <div className="p-4 p-md-5">
          <div className="mb-4">
            <button onClick={() => navigate(-1)} className="btn btn-outline-light btn-sm rounded-pill px-3 fw-bold mb-3">
              ← Volver
            </button>
            <h3 className="text-white fw-bold">{isEditMode ? 'Modificar Paquete Existente' : 'Registrar Nuevo Paquete'}</h3>
          </div>

          <div className="card bg-black border-secondary shadow-lg" style={{ borderRadius: '15px', maxWidth: '800px' }}>
            <div className="card-body p-4 p-md-5">
              <form onSubmit={handleSubmit}>
                
                <div className="row g-4 mb-4">
                  <div className="col-md-8">
                    <label className="form-label text-white-50 small">Nombre del Paquete</label>
                    <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} className="form-control bg-dark text-white border-secondary" required placeholder="Ej. Paquete Diamante" />
                  </div>
                  
                  <div className="col-md-4">
                    <label className="form-label text-white-50 small">Estado</label>
                    <select name="estado" value={formData.estado} onChange={handleChange} className="form-select bg-dark text-white border-secondary">
                      <option value="Activo">Activo</option>
                      <option value="Inactivo">Inactivo (Oculto)</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label text-white-50 small">Precio (MXN)</label>
                    <input type="number" name="precio" value={formData.precio} onChange={handleChange} className="form-control bg-dark text-white border-secondary" required placeholder="Ej. 15000" />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label text-white-50 small">URL de Imagen Principal</label>
                    <input type="text" name="imagen" value={formData.imagen} onChange={handleChange} className="form-control bg-dark text-white border-secondary" placeholder="https://..." />
                  </div>

                  <div className="col-12">
                    <label className="form-label text-white-50 small">Descripción breve</label>
                    <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} className="form-control bg-dark text-white border-secondary" rows="2" required placeholder="Describe para qué tipo de evento es ideal..."></textarea>
                  </div>

                  <div className="col-12">
                    <label className="form-label text-white-50 small">Servicios Incluidos (separados por coma)</label>
                    <textarea name="servicios" value={formData.servicios} onChange={handleChange} className="form-control bg-dark text-white border-secondary" rows="3" required placeholder="Ej. Sonido Profesional, 5 horas de DJ, Iluminación, Animador..."></textarea>
                  </div>
                </div>

                <div className="d-flex gap-3 justify-content-end border-top border-secondary pt-4">
                  <button type="button" onClick={() => navigate(-1)} className="btn btn-outline-light rounded-pill px-4 fw-bold">
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-warning rounded-pill px-5 fw-bold shadow">
                    {isEditMode ? 'Guardar Cambios' : 'Crear Paquete'}
                  </button>
                </div>

              </form>
            </div>
          </div>

        </div>
      </div>

      {/* MODAL DE ÉXITO */}
      {modalExitoVisible && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.85)', zIndex: 1050, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="bg-black p-4 p-md-5 rounded-4 border border-success shadow-lg text-center" style={{ maxWidth: '400px', width: '90%' }}>
            
            <div className="rounded-circle bg-success text-white d-inline-flex justify-content-center align-items-center mb-4 shadow" style={{ width: '70px', height: '70px', fontSize: '2.5rem', fontWeight: 'bold' }}>
              ✓
            </div>
            
            <h3 className="fw-bold text-white mb-2">
              {isEditMode ? '¡Actualización Exitosa!' : '¡Paquete Creado!'}
            </h3>
            
            <p className="text-white-50 mb-4 px-2">
              {isEditMode 
                ? `Los cambios del paquete "${formData.nombre}" han sido guardados correctamente en la base de datos.` 
                : `El paquete "${formData.nombre}" ha sido registrado y ya está disponible en el catálogo.`}
            </p>
            
            {/* Este botón cierra el modal y redirige a la tabla */}
            <button 
              className="btn btn-success px-4 py-3 fw-bold shadow rounded-pill w-100" 
              onClick={() => navigate('/admin/paquetes')}
            >
              Volver al Catálogo
            </button>
            
          </div>
        </div>
      )}

    </div>
  );
};

export default FormularioPaquete;