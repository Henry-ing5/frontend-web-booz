import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jsPDF } from "jspdf"; // Importamos la librería para el PDF

const PasarelaPago = () => {
  const navigate = useNavigate();

  // Estados temporales en memoria
  const [nombre, setNombre] = useState('');
  const [numero, setNumero] = useState('');
  const [expiracion, setExpiracion] = useState('');
  const [cvv, setCvv] = useState('');
  
  // Estados para animaciones y UI
  const [isFlipped, setIsFlipped] = useState(false);
  const [focusedField, setFocusedField] = useState('');
  
  // Estados para los modales
  const [estadoPago, setEstadoPago] = useState('inactivo');

  const handleNumeroChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').substring(0, 16);
    const formatted = value.match(/.{1,4}/g)?.join(' ') || value;
    setNumero(formatted);
  };

  const handleExpiracionChange = (e) => {
    let value = e.target.value.replace(/\D/g, '').substring(0, 4);
    if (value.length >= 3) {
      value = `${value.substring(0, 2)}/${value.substring(2, 4)}`;
    }
    setExpiracion(value);
  };

  const procesarPago = () => {
    setEstadoPago('procesando');
    setTimeout(() => {
      setEstadoPago('exitoso');
    }, 3000);
  };

  // NUEVA FUNCIÓN: Generar y descargar PDF
  const descargarComprobante = () => {
    const doc = new jsPDF();
    
    // Configuramos colores y fuentes del PDF
    doc.setFontSize(22);
    doc.setTextColor(43, 33, 85); 
    doc.text("PRODUCCIONES BOOZ", 105, 20, { align: "center" });
    
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text("COMPROBANTE DE PAGO", 105, 30, { align: "center" });
    
    doc.setFontSize(12);
    doc.text(`Folio: BOOZ-0894-A`, 20, 50);
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 20, 60);
    
    // Línea separadora
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 65, 190, 65); 
    
    // Datos temporales
    doc.text(`Cliente: ${nombre.toUpperCase() || 'CLIENTE EJEMPLO'}`, 20, 80);
    doc.text(`Tarjeta terminación: ${numero.slice(-4) || 'XXXX'}`, 20, 90);
    
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(`Monto Pagado: $7,500.00 MXN`, 20, 110);
    
    doc.setTextColor(40, 167, 69); 
    doc.text(`Estado: APROBADO`, 20, 120);
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    doc.text("Gracias por confiar en nosotros.", 105, 140, { align: "center" });
    
    // Guardar el PDF en el equipo
    doc.save("Comprobante_BoozEventos.pdf");
  };

  return (
    <div className="bg-dark text-white pb-5 position-relative" style={{ minHeight: '100vh', overflowX: 'hidden' }}>
      
      <style>{`
        .tarjeta-container { perspective: 1000px; height: 210px; width: 100%; position: relative; }
        .tarjeta-inner { transition: transform 0.8s; transform-style: preserve-3d; width: 100%; height: 100%; position: relative; }
        .tarjeta-inner.is-flipped { transform: rotateY(180deg); }
        .tarjeta-front, .tarjeta-back { backface-visibility: hidden; position: absolute; width: 100%; height: 100%; border-radius: 1rem; padding: 1.5rem; background: linear-gradient(135deg, #95a5a6 0%, #2c3e50 100%); box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5); }
        .tarjeta-back { transform: rotateY(180deg); }
        .banda-magnetica { background: #111; height: 40px; margin-left: -1.5rem; margin-right: -1.5rem; margin-top: 10px; }
        .highlight { border: 2px solid #F3E274; box-shadow: 0 0 10px rgba(243, 226, 116, 0.5); border-radius: 4px; padding: 2px 4px; transition: all 0.3s ease; }
        .modal-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.85); z-index: 1050; display: flex; justify-content: center; align-items: center; }
      `}</style>

      <nav className="navbar navbar-dark bg-black py-3 px-4 px-lg-5 border-bottom border-secondary">
        <div className="container-fluid justify-content-center justify-content-md-start">
          <Link className="navbar-brand fw-bold fs-4 text-uppercase m-0" style={{ letterSpacing: '2px' }} to="/">
            Booz <span className="text-warning">Eventos</span>
          </Link>
        </div>
      </nav>

      <div className="container pt-5 pb-4">
        <div className="row justify-content-center">
          <div className="col-lg-10 col-xl-8">
            <div className="card bg-black border-secondary shadow-lg" style={{ borderRadius: '15px' }}>
              <div className="card-body p-4 p-md-5">

                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 pb-3 border-bottom border-secondary gap-3">
                  <h3 className="fw-bold text-warning mb-0">Completar Pago</h3>
                  <span className="text-white-50 px-3 py-2 border border-secondary rounded text-center">
                    Folio: <span className="fw-bold text-white">BOOZ-0894-A</span>
                  </span>
                </div>

                <div className="row g-5 align-items-center flex-column-reverse flex-md-row">
                  
                  {/* LADO IZQUIERDO */}
                  <div className="col-md-6 d-flex flex-column align-items-center">
                    
                    <div className="tarjeta-container mb-4">
                      <div className={`tarjeta-inner ${isFlipped ? 'is-flipped' : ''}`}>
                        
                        {/* FRENTE CORREGIDO: Usando flex-column y justify-content-between */}
                        <div className="tarjeta-front text-dark d-flex flex-column justify-content-between">
                          
                          {/* Fila superior (Chip y Logo) */}
                          <div className="d-flex justify-content-between align-items-start">
                            <div className="rounded border border-dark px-2 py-1 bg-gradient shadow-sm" style={{ backgroundColor: '#e0e0e0' }}>
                              <span className="fs-5 opacity-75">🖧</span>
                            </div>
                            <span className="fw-bold fs-5" style={{ fontStyle: 'italic', letterSpacing: '1px' }}>PROSA</span>
                          </div>
                          
                          {/* Fila del medio (Número) */}
                          <div className="text-center">
                            <span className={`fs-4 fw-bold text-white d-inline-block ${focusedField === 'numero' ? 'highlight' : ''}`} style={{ letterSpacing: '3px', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                              {numero || 'XXXX XXXX XXXX XXXX'}
                            </span>
                          </div>
                          
                          {/* Fila inferior (Nombre y Expiración) - Ahora se mantiene en el fondo sin salir */}
                          <div className="d-flex justify-content-between text-white align-items-end" style={{ fontSize: '0.8rem', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                            <div className={`d-flex flex-column text-uppercase p-1 ${focusedField === 'nombre' ? 'highlight' : ''}`} style={{ maxWidth: '70%', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                              <span style={{ fontSize: '0.65rem' }}>Titular</span>
                              <span className="fw-bold text-truncate">{nombre || 'NOMBRE DEL CLIENTE'}</span>
                            </div>
                            <div className={`d-flex flex-column text-end p-1 ${focusedField === 'expiracion' ? 'highlight' : ''}`}>
                              <span style={{ fontSize: '0.65rem' }}>Expiración</span>
                              <span className="fw-bold">{expiracion || 'MM/YY'}</span>
                            </div>
                          </div>
                        </div>

                        {/* Reverso de la Tarjeta */}
                        <div className="tarjeta-back text-dark d-flex flex-column">
                          <div className="banda-magnetica"></div>
                          <div className="mt-4 px-2">
                            <span className="d-block text-end fw-bold text-white mb-1" style={{ fontSize: '0.7rem' }}>CVV</span>
                            <div className="bg-white text-end px-3 py-1 fw-bold rounded" style={{ height: '30px', fontStyle: 'italic' }}>
                              <span className={focusedField === 'cvv' ? 'text-danger' : 'text-dark'}>
                                {cvv || '•••'}
                              </span>
                            </div>
                            <p className="text-white-50 mt-2 text-center" style={{ fontSize: '0.6rem' }}>Esta tarjeta es intransferible y su uso está regulado por el contrato del emisor.</p>
                          </div>
                        </div>

                      </div>
                    </div>

                    <div className="w-100 text-center border border-secondary rounded p-3">
                      <span className="d-block text-white-50 small fw-bold mb-2 text-uppercase">Compras Protegidas</span>
                      <div className="d-flex justify-content-center gap-2 flex-wrap">
                        <span className="badge bg-secondary text-white border border-secondary">3D Secure</span>
                        <span className="badge bg-secondary text-white border border-secondary">PCI DSS</span>
                      </div>
                    </div>
                  </div>

                  {/* LADO DERECHO */}
                  <div className="col-md-6">
                    <form>
                      <div className="mb-3">
                        <label className="form-label text-white-50 small mb-1">Nombre en la tarjeta</label>
                        <input 
                          type="text" 
                          className="form-control bg-dark text-white border-secondary" 
                          value={nombre}
                          onChange={(e) => setNombre(e.target.value.toUpperCase())}
                          onFocus={() => { setFocusedField('nombre'); setIsFlipped(false); }}
                          onBlur={() => setFocusedField('')}
                          autoComplete="off"
                        />
                      </div>
                      
                      <div className="mb-3">
                        <label className="form-label text-white-50 small mb-1">Número de tarjeta</label>
                        <input 
                          type="text" 
                          className="form-control bg-dark text-white border-secondary" 
                          value={numero}
                          onChange={handleNumeroChange}
                          onFocus={() => { setFocusedField('numero'); setIsFlipped(false); }}
                          onBlur={() => setFocusedField('')}
                          autoComplete="off"
                        />
                      </div>
                      
                      <div className="row g-3 mb-4">
                        <div className="col-6">
                          <label className="form-label text-white-50 small mb-1">Vencimiento</label>
                          <input 
                            type="text" 
                            className="form-control bg-dark text-white border-secondary" 
                            value={expiracion}
                            onChange={handleExpiracionChange}
                            onFocus={() => { setFocusedField('expiracion'); setIsFlipped(false); }}
                            onBlur={() => setFocusedField('')}
                            autoComplete="off"
                          />
                        </div>
                        <div className="col-6">
                          <label className="form-label text-white-50 small mb-1">CVV</label>
                          <input 
                            type="password" 
                            className="form-control bg-dark text-white border-secondary" 
                            maxLength="4"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                            onFocus={() => { setFocusedField('cvv'); setIsFlipped(true); }}
                            onBlur={() => { setFocusedField(''); setIsFlipped(false); }}
                            autoComplete="off"
                          />
                        </div>
                      </div>

                      <div className="bg-dark rounded p-3 mb-4 border border-secondary d-flex justify-content-between align-items-center">
                        <span className="text-white-50 fw-bold">Monto a Pagar:</span>
                        <span className="fs-3 fw-bold text-warning">$7,500.00</span>
                      </div>

                      <div className="d-grid gap-3">
                        <button 
                          type="button" 
                          className="btn btn-warning fw-bold py-3 fs-5 shadow"
                          onClick={procesarPago}
                          disabled={estadoPago !== 'inactivo'}
                        >
                          Pagar Ahora <span className="ms-2">➔</span>
                        </button>
                        
                        <div className="d-flex justify-content-center">
                          <button 
                            type="button" 
                            className="btn btn-outline-danger w-100 py-2 fw-semibold"
                            onClick={() => navigate(-1)} 
                          >
                            Cancelar y Regresar
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL 1: PROCESANDO */}
      {estadoPago === 'procesando' && (
        <div className="modal-overlay">
          <div className="text-center bg-black p-5 rounded-4 border border-secondary shadow-lg">
            <div className="spinner-border text-warning mb-3" role="status" style={{ width: '3rem', height: '3rem' }}></div>
            <h4 className="fw-bold text-white mb-0">Procesando pago...</h4>
            <p className="text-white-50 mt-2">Por favor, no cierres esta ventana.</p>
          </div>
        </div>
      )}

      {/* MODAL 2: ÉXITO (NUEVO DISEÑO) */}
      {estadoPago === 'exitoso' && (
        <div className="modal-overlay">
          <div className="bg-black rounded-4 border border-secondary shadow-lg overflow-hidden" style={{ maxWidth: '450px', width: '90%' }}>
            
            <div className="bg-success p-4 text-center">
              <div className="rounded-circle bg-white text-success d-inline-flex justify-content-center align-items-center mb-2 shadow" style={{ width: '70px', height: '70px', fontSize: '2.5rem' }}>
                ✓
              </div>
              <h3 className="fw-bold text-white mb-0">¡Pago Aprobado!</h3>
            </div>
            
            <div className="p-4 p-md-5 bg-dark text-center">
              <p className="text-white-50 mb-4">Tu transacción se completó de manera segura. Los datos de tu tarjeta han sido borrados de la memoria.</p>
              
              <div className="bg-black p-3 rounded border border-secondary mb-4 text-start">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-white-50 small">Folio</span>
                  <span className="fw-bold text-white">BOOZ-0894-A</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-white-50 small">Titular</span>
                  <span className="fw-bold text-white">{nombre || 'CLIENTE'}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-white-50 small">Total</span>
                  <span className="fw-bold text-warning fs-5">$7,500.00</span>
                </div>
              </div>
              
              <button 
                className="btn btn-warning w-100 mb-3 py-3 fw-bold shadow"
                onClick={descargarComprobante}
              >
                📄 Descargar Comprobante (PDF)
              </button>
              
              <Link to="/" className="btn btn-outline-light w-100 py-2 fw-bold">
                Volver al Inicio
              </Link>
            </div>
            
          </div>
        </div>
      )}

    </div>
  );
};

export default PasarelaPago;