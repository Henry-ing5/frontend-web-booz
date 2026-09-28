import React from 'react';
import { Link } from 'react-router-dom';


const Paquetes = () => {
  // Datos de ejemplo (posteriormente vendrán de MySQL mediante Node.js/Python)
  const paquetesDb = [
    {
      id: 1,
      nombre: "Paquete Básico",
      descripcion: "Ideal para reuniones pequeñas. Incluye sonido profesional, iluminación básica y DJ por 5 horas.",
      precio: "5,500.00",
      imagen: "https://images.unsplash.com/photo-1533174000276-2139cd35e406?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 2,
      nombre: "Paquete Premium",
      descripcion: "La mejor experiencia para tu boda o XV años. Pista iluminada, sonido line array, DJ, animador y pirotecnia fría.",
      precio: "12,000.00",
      imagen: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 3,
      nombre: "Paquete VIP",
      descripcion: "Todo incluido. Pantallas LED gigantes, grupo musical, DJ, cabina de fotos, escenario personalizado y más.",
      precio: "25,000.00",
      imagen: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=600&auto=format&fit=crop"
    }
  ];

  return (
    <div className="bg-dark text-white pb-5" style={{ minHeight: '100vh', overflowX: 'hidden' }}>
      
      {/* Navegación Superior (Consistente con Inicio) */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-black py-3 px-4 px-lg-5 border-bottom border-secondary sticky-top">
        <div className="container-fluid px-0">
          <Link className="navbar-brand fw-bold fs-4 text-uppercase" style={{ letterSpacing: '2px' }} to="/">
            Booz <span className="text-warning">Eventos</span>
          </Link>
          <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navBooz">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navBooz">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-2 gap-lg-4 text-center">
              <li className="nav-item">
                <Link className="nav-link text-white-50" to="/">Inicio</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white-50" to="/trabajos">Trabajos Recientes</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active fw-semibold" to="/paquetes">Paquetes</Link>
              </li>
            </ul>
            <div className="ms-lg-4 mt-3 mt-lg-0 d-flex justify-content-center">
              <Link to="/admin" className="btn btn-outline-warning rounded-pill px-4 fw-bold">Acceder</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Título de la Sección */}
      <div className="container pt-5 pb-4 text-center">
        <span className="badge bg-warning text-dark mb-3 px-3 py-2 text-uppercase fw-bold" style={{ letterSpacing: '1px' }}>
          Catálogo
        </span>
        <h2 className="display-5 fw-bold mb-3">Nuestros <span className="text-warning">Paquetes</span></h2>
        <p className="lead text-white-50 mx-auto" style={{ maxWidth: '700px' }}>
          Explora nuestras opciones predefinidas diseñadas para facilitar tu elección, o personaliza un paquete según las necesidades de tu evento.
        </p>
      </div>

      {/* Cuadrícula de Paquetes */}
      <div className="container pb-5">
        <div className="row g-4">
          {paquetesDb.map((paquete) => (
            <div className="col-12 col-md-6 col-lg-4" key={paquete.id}>
              <div className="card h-100 bg-black text-white border-secondary overflow-hidden shadow-lg" style={{ borderRadius: '15px' }}>
                <img 
                  src={paquete.imagen} 
                  className="card-img-top" 
                  alt={paquete.nombre} 
                  style={{ height: '250px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column p-4">
                  <h4 className="card-title fw-bold text-warning mb-3">{paquete.nombre}</h4>
                  <p className="card-text text-white-50 flex-grow-1">
                    {paquete.descripcion}
                  </p>
                  <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top border-secondary">
                    <span className="fs-5 fw-bold">${paquete.precio}</span>
                    <Link to={`/paquetes/${paquete.id}`} className="btn btn-outline-light rounded-pill px-3 fw-bold">
                        Ver Detalles
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Banner para Paquete Personalizado */}
        <div className="mt-5 bg-black border border-secondary p-5 text-center shadow-lg" style={{ borderRadius: '20px' }}>
          <h3 className="fw-bold mb-3">¿No encuentras lo que buscas?</h3>
          <p className="text-white-50 mb-4 mx-auto" style={{ maxWidth: '600px' }}>
            Sabemos que cada evento es único. Arma tu propio paquete eligiendo exactamente los servicios y el tiempo que necesitas.
          </p>
          <Link to="/personalizar">
            <button className="btn btn-warning rounded-pill px-5 py-3 fw-bold fs-6">
              Crear Paquete Personalizado
            </button>
          </Link>
        </div>
      </div>

    </div>
  );
};

export default Paquetes;