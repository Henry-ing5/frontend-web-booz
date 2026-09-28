import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Inicio = () => {
  const imagenHero = "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1920&auto=format&fit=crop";

  return (
    <div className="bg-dark text-white" style={{ minHeight: '100vh', overflowX: 'hidden' }}>
      
      {/* Navegación Superior */}
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
                <Link className="nav-link active fw-semibold" to="/">Inicio</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white-50" to="/trabajos">Trabajos Recientes</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white-50" to="/paquetes">Paquetes</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white-50" to="/faq">Preguntas Frecuentes</Link>
              </li>
            </ul>
            <div className="ms-lg-4 mt-3 mt-lg-0 d-flex justify-content-center">
              <Link to="/admin" className="btn btn-outline-warning rounded-pill px-4 fw-bold">Acceder</Link>    
            </div>
          </div>
        </div>
      </nav>

      {/* Sección Principal (Hero) */}
      <div className="row g-0 align-items-stretch" style={{ minHeight: 'calc(100vh - 78px)' }}>
        <div className="col-lg-6 d-flex flex-column justify-content-center px-4 px-lg-5 py-5">
          <div className="pe-lg-4" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <span className="badge bg-warning text-dark mb-3 px-3 py-2 text-uppercase fw-bold" style={{ letterSpacing: '1px' }}>
              Servicios Premium
            </span>
            <h1 className="display-4 fw-bold mb-4" style={{ lineHeight: '1.2' }}>
              Crea momentos <br />
              <span className="text-warning">inolvidables</span>
            </h1>
            <p className="lead text-white-50 mb-5 fs-5">
              Gestión integral y diseño de experiencias únicas para tus eventos sociales. Nos encargamos de la planificación hasta el último detalle para que tú solo disfrutes.
            </p>
            
            <div className="d-flex flex-column flex-sm-row gap-3">
              <Link to="/paquetes" className="btn btn-warning rounded-pill px-5 py-3 fw-bold fs-6">
                Ver Paquetes
              </Link>
              <Link to="/personalizar" className="btn btn-outline-light rounded-pill px-5 py-3 fw-bold fs-6">
                Crear Paquete Personalizado
              </Link>
            </div>
          </div>
        </div>

        <div className="col-lg-6 position-relative d-none d-lg-block">
          <img 
            src={imagenHero} 
            alt="Evento Producciones Booz" 
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} 
          />
          <div 
            className="position-absolute w-100 h-100 top-0 start-0" 
            style={{ background: 'linear-gradient(to right, #212529 0%, transparent 15%)' }}
          ></div>
        </div>

        <div className="col-12 d-block d-lg-none p-0 mt-4">
          <img 
            src={imagenHero} 
            alt="Evento Producciones Booz" 
            style={{ width: '100%', height: '40vh', objectFit: 'cover' }} 
          />
        </div>
      </div>

      {/* NUEVA SECCIÓN: Promociones Destacadas */}
      <div className="container my-5 py-4">
        <div className="card bg-warning text-dark border-0 shadow-lg overflow-hidden" style={{ borderRadius: '20px' }}>
          <div className="row g-0 align-items-center">
            <div className="col-md-8 p-4 p-md-5">
              <span className="badge bg-dark text-warning mb-3 px-3 py-2 text-uppercase fw-bold" style={{ letterSpacing: '1px' }}>
                Promoción Especial
              </span>
              <h2 className="display-6 fw-bold mb-3">15% de Descuento en Paquete Premium</h2>
              <p className="fs-5 mb-4 opacity-75">
                Reserva tu evento para los meses de Octubre a Diciembre y obtén un descuento exclusivo en tu pago total, además de una hora de DJ completamente gratis.
              </p>
              <Link to="/paquetes" className="btn btn-dark rounded-pill px-4 py-3 fw-bold shadow">
                Reclamar Promoción
              </Link>
            </div>
            <div className="col-md-4 d-none d-md-block" style={{ minHeight: '300px' }}>
              <img 
                src="https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=600&auto=format&fit=crop" 
                alt="Promoción Evento" 
                className="img-fluid h-100 w-100"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Inicio;