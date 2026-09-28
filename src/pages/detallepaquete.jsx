import React from 'react';
import { useParams, Link } from 'react-router-dom';

const DetallePaquete = () => {
  // useParams extrae el ID de la URL (ej. /paquetes/1)
  const { id } = useParams();

  // En el futuro, usarás este ID para pedir los datos a MySQL. Por ahora, simulamos los datos de este paquete:
  const paqueteData = {
    nombre: "Paquete Premium",
    precio: "12,000.00",
    descripcion: "La mejor experiencia para tu boda o XV años con equipo de última generación.",
    servicios: ["Sonido Line Array", "DJ y Animador", "Pista Iluminada 5x5m", "Pirotecnia Fría (4 chisperos)", "Iluminación Arquitectónica"],
    // Galería específica de este paquete
    galeria: [
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1533174000276-2139cd35e406?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=500&auto=format&fit=crop"
    ]
  };

  return (
    <div className="bg-dark text-white pb-5" style={{ minHeight: '100vh', overflowX: 'hidden' }}>
      
      {/* Navbar simplificada */}
      <nav className="navbar navbar-dark bg-black py-3 px-4 border-bottom border-secondary">
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold text-uppercase" to="/paquetes">
            <span className="text-white-50 me-2">← Volver a Paquetes</span>
          </Link>
        </div>
      </nav>

      <div className="container pt-5">
        <div className="row g-5">
          {/* Columna Izquierda: Información */}
          <div className="col-lg-5">
            <span className="badge bg-warning text-dark mb-3 px-3 py-2 text-uppercase fw-bold">Detalle de Paquete</span>
            <h1 className="display-4 fw-bold text-warning mb-3">{paqueteData.nombre}</h1>
            <h2 className="fs-1 fw-bold mb-4">${paqueteData.precio}</h2>
            <p className="lead text-white-50 mb-5">{paqueteData.descripcion}</p>
            
            <h4 className="fw-bold mb-3 border-bottom border-secondary pb-2">¿Qué incluye?</h4>
            <ul className="list-unstyled mb-5">
              {paqueteData.servicios.map((servicio, idx) => (
                <li key={idx} className="mb-2 text-white-50 d-flex align-items-center">
                  <span className="text-warning me-2">✔</span> {servicio}
                </li>
              ))}
            </ul>

            <Link to="/pago" className="btn btn-warning rounded-pill px-5 py-3 fw-bold w-100 fs-5 mb-3">Contratar Paquete</Link>
            <Link to="/personalizar" className="btn btn-outline-light rounded-pill px-5 py-3 fw-bold w-100">Personalizar basado en este</Link>
          </div>

          {/* Columna Derecha: Galería Multimedia del Paquete */}
          <div className="col-lg-7">
            <h4 className="fw-bold mb-4 text-center">Galería de este servicio</h4>
            <div className="row g-3">
              {paqueteData.galeria.map((img, idx) => (
                <div className="col-6" key={idx}>
                  <img src={img} alt={`Imagen ${idx}`} className="img-fluid rounded shadow-sm border border-secondary" style={{ height: '250px', width: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetallePaquete;