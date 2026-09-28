import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const PaquetePersonalizado = () => {
  const navigate = useNavigate();
  
  // Estado para controlar la visibilidad del modal de éxito
  const [modalExitoVisible, setModalExitoVisible] = useState(false);

  // Estado del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    tipoEvento: 'Boda',
    invitados: '',
    presupuesto: '',
    servicios: [],
    notas: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({ ...formData, servicios: [...formData.servicios, value] });
    } else {
      setFormData({ ...formData, servicios: formData.servicios.filter(s => s !== value) });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí se enviaría la información al backend
    console.log("Solicitud a medida enviada:", formData);
    
    // Mostramos el modal en lugar de usar alert()
    setModalExitoVisible(true);
  };

  return (
    <div style={{ backgroundColor: '#212529', minHeight: '100vh', paddingBottom: '50px' }}>
      
      {/* Navbar simplificado para el cliente (puedes ajustarlo si tienes un componente Navbar) */}
      <nav className="navbar navbar-dark bg-black px-4 py-3 border-bottom border-secondary d-flex justify-content-between">
        <Link to="/" className="navbar-brand fw-bold text-white text-uppercase" style={{ letterSpacing: '2px' }}>
          Producciones <span className="text-warning">BOOZ</span>
        </Link>
        <div>
          <Link to="/paquetes" className="btn btn-outline-light rounded-pill px-4 fw-bold">Ver Catálogo</Link>
        </div>
      </nav>

      {/* Contenido Principal */}
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            
            <div className="text-center mb-5">
              <h1 className="text-white fw-bold display-5 mb-3">Crea tu Paquete Ideal</h1>
              <p className="text-white-50 lead">
                Selecciona exactamente lo que necesitas para tu evento y nuestro equipo te preparará una cotización a medida.
              </p>
            </div>

            <div className="card bg-black border-secondary shadow-lg rounded-4">
              <div className="card-body p-4 p-md-5">
                <form onSubmit={handleSubmit}>
                  
                  <h4 className="text-warning fw-bold mb-4 border-bottom border-secondary pb-2">1. Tus Datos</h4>
                  <div className="row g-4 mb-5">
                    <div className="col-md-12">
                      <label className="form-label text-white-50 small">Nombre Completo</label>
                      <input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} className="form-control bg-dark text-white border-secondary p-3" required placeholder="Ej. Ana Karen López" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label text-white-50 small">Teléfono / WhatsApp</label>
                      <input type="tel" name="telefono" value={formData.telefono} onChange={handleInputChange} className="form-control bg-dark text-white border-secondary p-3" required placeholder="10 dígitos" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label text-white-50 small">Correo Electrónico</label>
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="form-control bg-dark text-white border-secondary p-3" required placeholder="tucorreo@ejemplo.com" />
                    </div>
                  </div>

                  <h4 className="text-warning fw-bold mb-4 border-bottom border-secondary pb-2">2. Detalles del Evento</h4>
                  <div className="row g-4 mb-5">
                    <div className="col-md-4">
                      <label className="form-label text-white-50 small">Tipo de Evento</label>
                      <select name="tipoEvento" value={formData.tipoEvento} onChange={handleInputChange} className="form-select bg-dark text-white border-secondary p-3">
                        <option value="Boda">Boda</option>
                        <option value="XV Años">XV Años</option>
                        <option value="Graduación">Graduación</option>
                        <option value="Bautizo">Bautizo</option>
                        <option value="Corporativo">Corporativo</option>
                        <option value="Otro">Otro</option>
                      </select>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label text-white-50 small">Rango de Invitados</label>
                      <select name="invitados" value={formData.invitados} onChange={handleInputChange} className="form-select bg-dark text-white border-secondary p-3" required>
                        <option value="">Selecciona...</option>
                        <option value="Menos de 50">Menos de 50</option>
                        <option value="50 - 100">50 - 100</option>
                        <option value="100 - 200">100 - 200</option>
                        <option value="Más de 200">Más de 200</option>
                      </select>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label text-white-50 small">Presupuesto Estimado</label>
                      <select name="presupuesto" value={formData.presupuesto} onChange={handleInputChange} className="form-select bg-dark text-white border-secondary p-3" required>
                        <option value="">Selecciona...</option>
                        <option value="$10,000 - $20,000">$10,000 - $20,000</option>
                        <option value="$20,000 - $35,000">$20,000 - $35,000</option>
                        <option value="$35,000 - $50,000">$35,000 - $50,000</option>
                        <option value="Más de $50,000">Más de $50,000</option>
                      </select>
                    </div>
                  </div>

                  <h4 className="text-warning fw-bold mb-4 border-bottom border-secondary pb-2">3. Servicios de Interés</h4>
                  <div className="row g-3 mb-5">
                    {[
                      "Audio e Iluminación Básica", "Iluminación Arquitectónica", 
                      "DJ en Vivo", "Pista de Cristal Iluminada", 
                      "Chisperos / Pirotecnia Fría", "Humo Denso", 
                      "Animador / Botargas", "Pantallas LED", "Letras Gigantes"
                    ].map((servicio, idx) => (
                      <div className="col-md-6 col-lg-4" key={idx}>
                        <div className="form-check custom-checkbox">
                          <input 
                            className="form-check-input bg-dark border-secondary" 
                            type="checkbox" 
                            value={servicio} 
                            id={`servicio-${idx}`} 
                            onChange={handleCheckboxChange}
                          />
                          <label className="form-check-label text-white-50" htmlFor={`servicio-${idx}`}>
                            {servicio}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>

                  <h4 className="text-warning fw-bold mb-4 border-bottom border-secondary pb-2">4. Comentarios Adicionales</h4>
                  <div className="mb-5">
                    <textarea 
                      name="notas" 
                      value={formData.notas} 
                      onChange={handleInputChange} 
                      className="form-control bg-dark text-white border-secondary p-3" 
                      rows="4" 
                      placeholder="Cuéntanos más sobre la temática, colores, o requerimientos especiales de tu evento..."
                    ></textarea>
                  </div>

                  <div className="d-grid gap-2 d-md-flex justify-content-md-end pt-3">
                    <button type="button" onClick={() => navigate(-1)} className="btn btn-outline-light rounded-pill px-5 py-3 fw-bold mb-2 mb-md-0">
                      Cancelar
                    </button>
                    <button type="submit" className="btn btn-warning rounded-pill px-5 py-3 fw-bold shadow-lg">
                      Solicitar Cotización a Medida
                    </button>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL DE ÉXITO DE ENVÍO */}
      {modalExitoVisible && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.85)', zIndex: 1050, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="bg-black p-4 p-md-5 rounded-4 border border-success shadow-lg text-center" style={{ maxWidth: '450px', width: '90%' }}>
            
            <div className="rounded-circle bg-success text-white d-inline-flex justify-content-center align-items-center mb-4 shadow" style={{ width: '80px', height: '80px', fontSize: '3rem', fontWeight: 'bold' }}>
              ✓
            </div>
            
            <h3 className="fw-bold text-white mb-2">¡Solicitud Enviada!</h3>
            
            <p className="text-white-50 mb-4 px-2">
              Hemos recibido los detalles de tu evento. Nuestro equipo analizará tus requerimientos y te contactará a la brevedad con una cotización personalizada.
            </p>
            
            <div className="d-flex flex-column gap-3">
              <Link to="/paquetes" className="btn btn-success px-4 py-3 fw-bold shadow rounded-pill w-100">
                Volver a Paquetes
              </Link>
              <button 
                className="btn btn-outline-light px-4 py-2 fw-bold rounded-pill w-100 border-0" 
                onClick={() => setModalExitoVisible(false)}
              >
                Cerrar mensaje
              </button>
            </div>
            
          </div>
        </div>
      )}

    </div>
  );
};

export default PaquetePersonalizado;