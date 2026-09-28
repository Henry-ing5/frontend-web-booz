import React from 'react';
import { useParams, Link } from 'react-router-dom';

const DetalleEvento = () => {
  const { id } = useParams();

  // Simulamos los datos del evento al que le dieron clic
  const eventoData = {
    titulo: "Boda Civil - Jardín",
    fecha: "Marzo 2026",
    descripcionLarga: "Un evento hermoso donde nos encargamos de la iluminación arquitectónica en todo el jardín, y montamos nuestra pista de cristal sobre el pasto.",
    fotos: [
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800&auto=format&fit=crop"
    ]
  };

  return (
    <div className="bg-dark text-white pb-5" style={{ minHeight: '100vh', overflowX: 'hidden' }}>
      
      <nav className="navbar navbar-dark bg-black py-3 px-4 border-bottom border-secondary">
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold text-uppercase" to="/trabajos">
            <span className="text-white-50 me-2">← Volver al Portafolio</span>
          </Link>
        </div>
      </nav>

      <div className="container pt-5 text-center mb-5">
        <h1 className="display-4 fw-bold text-warning mb-2">{eventoData.titulo}</h1>
        <p className="text-white-50 fw-bold mb-4">{eventoData.fecha}</p>
        <p className="lead mx-auto text-light" style={{ maxWidth: '800px' }}>{eventoData.descripcionLarga}</p>
      </div>

      {/* Cuadrícula de fotos del evento */}
      <div className="container">
        <div className="row g-4">
          {eventoData.fotos.map((foto, idx) => (
            // La primera foto ocupa todo el ancho, las demás se dividen en 2 columnas
            <div className={idx === 0 ? "col-12" : "col-md-6"} key={idx}>
              <img 
                src={foto} 
                alt={`Evento foto ${idx}`} 
                className="img-fluid rounded shadow-lg border border-secondary" 
                style={{ width: '100%', height: idx === 0 ? '500px' : '300px', objectFit: 'cover' }} 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetalleEvento;