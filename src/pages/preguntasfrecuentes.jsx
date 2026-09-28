import React from 'react';
import { Link } from 'react-router-dom';

const PreguntasFrecuentes = () => {
  const faqs = [
    {
      pregunta: "¿Con cuánto tiempo de anticipación debo reservar?",
      respuesta: "Recomendamos reservar con al menos 2 a 3 meses de anticipación para garantizar la disponibilidad de la fecha, especialmente en temporadas altas y fines de semana."
    },
    {
      pregunta: "¿Puedo modificar un paquete después de contratarlo?",
      respuesta: "Sí, puedes agregar servicios adicionales o realizar ajustes en tu paquete personalizado hasta 15 días antes del evento, siempre sujeto a disponibilidad de inventario."
    },
    {
      pregunta: "¿Cuáles son los métodos de pago aceptados?",
      respuesta: "Aceptamos transferencias bancarias, pagos con tarjetas de crédito/débito a través de nuestra pasarela segura en línea y pagos directos en efectivo."
    },
    {
      pregunta: "¿Los precios incluyen instalación y transporte?",
      respuesta: "Sí, todos nuestros paquetes incluyen la logística de montaje, desmontaje y el transporte dentro de nuestra zona de cobertura principal en Comalcalco y alrededores."
    },
    {
      pregunta: "¿Ofrecen reembolsos por cancelación?",
      respuesta: "Las cancelaciones realizadas con más de 30 días de anticipación aplican para un reembolso parcial del anticipo. Revisa los términos en el contrato de servicio."
    },
    {
      pregunta: "¿Tienen un catálogo físico que pueda visitar?",
      respuesta: "Puedes agendar una cita para visitarnos directamente, o explorar nuestra galería de Trabajos Recientes en la plataforma para ver nuestros equipos en acción."
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
              <li className="nav-item"><Link className="nav-link text-white-50" to="/trabajos">Trabajos Recientes</Link></li>
              <li className="nav-item"><Link className="nav-link text-white-50" to="/paquetes">Paquetes</Link></li>
              <li className="nav-item"><Link className="nav-link active fw-semibold" to="/faq">Preguntas Frecuentes</Link></li>
            </ul>
            <div className="ms-lg-4 mt-3 mt-lg-0 d-flex justify-content-center">
              <Link to="/admin" className="btn btn-outline-warning rounded-pill px-4 fw-bold">Acceder</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Cabecera */}
      <div className="container pt-5 pb-4 text-center">
        <span className="badge bg-warning text-dark mb-3 px-3 py-2 text-uppercase fw-bold" style={{ letterSpacing: '1px' }}>
          Ayuda y Soporte
        </span>
        <h2 className="display-5 fw-bold mb-3">Preguntas <span className="text-warning">Frecuentes</span></h2>
        <p className="lead text-white-50 mx-auto" style={{ maxWidth: '700px' }}>
          Encuentra respuestas rápidas a las dudas más comunes sobre nuestras reservas, paquetes y métodos de trabajo.
        </p>
      </div>

      {/* Cuadrícula de Tarjetas de Preguntas */}
      <div className="container pb-5">
        <div className="row g-4">
          {faqs.map((faq, index) => (
            <div className="col-md-6 col-lg-4" key={index}>
              <div className="card h-100 bg-black border-secondary shadow-sm" style={{ borderRadius: '15px' }}>
                <div className="card-header border-bottom border-secondary p-4 pb-3 bg-transparent">
                  <h5 className="fw-bold text-warning mb-0" style={{ lineHeight: '1.4' }}>
                    {faq.pregunta}
                  </h5>
                </div>
                <div className="card-body p-4 pt-3">
                  <p className="card-text text-white-50 mb-0">
                    {faq.respuesta}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sección de Contacto Directo */}
        <div className="mt-5 text-center p-5 bg-black border border-secondary shadow-lg" style={{ borderRadius: '20px' }}>
          <h4 className="fw-bold mb-3">¿Tienes alguna otra duda?</h4>
          <p className="text-white-50 mb-4">Nuestro equipo de soporte está listo para atenderte por WhatsApp de manera personalizada.</p>
          <a href="#" className="btn btn-warning rounded-pill px-5 py-3 fw-bold fs-6">
            Contactar por WhatsApp
          </a>
        </div>
      </div>

    </div>
  );
};

export default PreguntasFrecuentes;