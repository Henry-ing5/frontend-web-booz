import React from 'react';
import { Link } from 'react-router-dom';

const TrabajosRecientes = () => {
  // Datos simulados de la galería (futuramente consumidos de MySQL/Backend)
  const galeriaDb = [
    {
      id: 1,
      titulo: "Boda Civil - Jardín",
      descripcion: "Iluminación arquitectónica y pista de cristal.",
      imagen: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 2,
      titulo: "XV Años Neón",
      descripcion: "Sonido line array, DJ en vivo y pirotecnia fría.",
      imagen: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 3,
      titulo: "Graduación Universitaria",
      descripcion: "Pantallas LED gigantes y escenario personalizado.",
      imagen: "https://images.unsplash.com/photo-1525268771113-32d9e9021a97?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 4,
      titulo: "Bautizo Elegante",
      descripcion: "Música ambiental y decoración cálida.",
      imagen: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 5,
      titulo: "Fiesta Temática Clásica",
      descripcion: "Animador interactivo y luces robóticas.",
      imagen: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 6,
      titulo: "Aniversario de Bodas",
      descripcion: "Banda en vivo y cabina de fotos.",
      imagen: "https://images.unsplash.com/photo-1530103862676-de8892ebe6fd?q=80&w=600&auto=format&fit=crop"
    }
  ];

  return (
    <div className="bg-dark text-white pb-5" style={{ minHeight: '100vh', overflowX: 'hidden' }}>
      
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
              <li className="nav-item"><Link className="nav-link text-white-50" to="/">Inicio</Link></li>
              <li className="nav-item"><Link className="nav-link active fw-semibold" to="/trabajos">Trabajos Recientes</Link></li>
              <li className="nav-item"><Link className="nav-link text-white-50" to="/paquetes">Paquetes</Link></li>
            </ul>
            <div className="ms-lg-4 mt-3 mt-lg-0 d-flex justify-content-center">
              <Link to="/admin" className="btn btn-outline-warning rounded-pill px-4 fw-bold">Acceder</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Cabecera de la Sección */}
      <div className="container pt-5 pb-4 text-center">
        <span className="badge bg-warning text-dark mb-3 px-3 py-2 text-uppercase fw-bold" style={{ letterSpacing: '1px' }}>
          Portafolio
        </span>
        <h2 className="display-5 fw-bold mb-3">Trabajos <span className="text-warning">Recientes</span></h2>
        <p className="lead text-white-50 mx-auto" style={{ maxWidth: '700px' }}>
          Conoce la calidad de nuestro trabajo. Una imagen vale más que mil palabras, y en Producciones BOOZ nos aseguramos de que cada evento sea espectacular.
        </p>
      </div>

      {/* Galería de Imágenes */}
      <div className="container pb-5">
        <div className="row g-4">
          {galeriaDb.map((trabajo) => (
            <div className="col-12 col-md-6 col-lg-4" key={trabajo.id}>
              
              {/* EL LINK ENVUELVE A LA TARJETA COMPLETA */}
              <Link to={`/trabajos/${trabajo.id}`} className="text-decoration-none">
                
                {/* Tarjeta de Galería con efecto de hover sutil */}
                <div 
                  className="card bg-black text-white border-0 overflow-hidden shadow-lg position-relative" 
                  style={{ borderRadius: '15px' }}
                >
                  <img 
                    src={trabajo.imagen} 
                    className="card-img-top" 
                    alt={trabajo.titulo} 
                    style={{ height: '300px', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                  {/* Degradado superpuesto para leer bien el texto */}
                  <div 
                    className="position-absolute w-100 h-100 top-0 start-0 d-flex flex-column justify-content-end p-4"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)', pointerEvents: 'none' }}
                  >
                    <h5 className="fw-bold text-warning mb-1">{trabajo.titulo}</h5>
                    <p className="mb-0 text-white-50 fs-6">{trabajo.descripcion}</p>
                  </div>
                </div>

              </Link>
              
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default TrabajosRecientes;