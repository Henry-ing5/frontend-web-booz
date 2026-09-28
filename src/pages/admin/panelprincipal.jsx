import React from 'react';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts';

const PanelPrincipal = () => {
  // Datos simulados para las gráficas
  const datosPastel = [
    { name: 'Confirmados', value: 8, color: '#198754' }, // Verde
    { name: 'Pendientes', value: 3, color: '#ffc107' },  // Amarillo
    { name: 'Cancelados', value: 1, color: '#dc3545' }   // Rojo
  ];

  const datosBarras = [
    { mes: 'Jul', eventos: 4 },
    { mes: 'Ago', eventos: 6 },
    { mes: 'Sep', eventos: 9 },
    { mes: 'Oct', eventos: 12 },
  ];

  return (
    <div className="d-flex position-relative" style={{ minHeight: '100vh', backgroundColor: '#212529' }}>
      
      {/* Menú Lateral con la corrección de hover (sin text-white-50) */}
      <div className="bg-black border-end border-secondary d-flex flex-column d-none d-md-flex flex-shrink-0" style={{ width: '260px', minWidth: '260px' }}>
        <div className="p-4 border-bottom border-secondary text-center">
          <h4 className="text-white fw-bold mb-0 text-uppercase" style={{ letterSpacing: '2px' }}>
            Booz <span className="text-warning">Admin</span>
          </h4>
        </div>
        <div className="d-flex flex-column p-3 gap-2 mt-2">
          <Link to="/admin" className="btn btn-warning fw-bold text-start text-dark rounded-pill px-4 py-2">Panel Principal</Link>
          <Link to="/admin/paquetes" className="btn btn-outline-light text-start rounded-pill px-4 py-2 border-0">Gestión de Paquetes</Link>
          <Link to="/admin/agenda" className="btn btn-outline-light text-start rounded-pill px-4 py-2 border-0">Agenda de Eventos</Link>
          <Link to="/admin/ingresos" className="btn btn-outline-light text-start rounded-pill px-4 py-2 border-0">Ingresos</Link>
          <Link to="/admin/productos" className="btn btn-outline-light text-start rounded-pill px-4 py-2 border-0">Productos y Servicios</Link>
          <Link to="/admin/portafolio" className="btn btn-outline-light text-start rounded-pill px-4 py-2 border-0">Gestión de Trabajos Recientes</Link>
          <Link to="/admin/promociones" className="btn btn-outline-light text-start rounded-pill px-4 py-2 border-0">Gestión de Promociones</Link>
          <Link to="/admin/solicitudes" className="btn btn-outline-light text-start rounded-pill px-4 py-2 border-0">Gestión de Solicitudes Personalizadas</Link>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="flex-grow-1 d-flex flex-column">
        <nav className="navbar navbar-dark bg-black px-4 py-3 border-bottom border-secondary d-flex justify-content-between">
          <div className="text-white"><span className="fw-semibold">Bienvenido, Administrador</span></div>
          <div><Link to="/" className="btn btn-sm btn-outline-danger rounded-pill px-3 fw-bold">Cerrar Sesión</Link></div>
        </nav>

        <div className="p-4 p-md-5">
          {/* Tarjetas de Estadísticas */}
          <div className="row g-4 mb-4">
            <div className="col-md-4">
              <div className="card bg-warning border-0 shadow text-dark text-center" style={{ borderRadius: '12px' }}>
                <div className="card-body py-4">
                  <h2 className="display-4 fw-bold mb-0">12</h2>
                  <p className="mb-0 fw-semibold text-uppercase" style={{ letterSpacing: '1px' }}>Eventos Este Mes</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card bg-warning border-0 shadow text-dark text-center" style={{ borderRadius: '12px' }}>
                <div className="card-body py-4">
                  <h2 className="display-4 fw-bold mb-0">8</h2>
                  <p className="mb-0 fw-semibold text-uppercase" style={{ letterSpacing: '1px' }}>Paquetes Activos</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card bg-warning border-0 shadow text-dark text-center" style={{ borderRadius: '12px' }}>
                <div className="card-body py-4">
                  <h2 className="display-4 fw-bold mb-0">02/06</h2>
                  <p className="mb-0 fw-semibold text-uppercase" style={{ letterSpacing: '1px' }}>Próximo Evento</p>
                </div>
              </div>
            </div>
          </div>

          {/* Gráficos Reales con Recharts */}
          <div className="row g-4">
            <div className="col-md-5">
              <div className="card bg-black border-secondary shadow-lg h-100" style={{ borderRadius: '15px' }}>
                <div className="card-body p-4 text-center">
                  <h5 className="text-white fw-bold mb-4">Estado de Reservaciones</h5>
                  <div style={{ height: '250px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={datosPastel} innerRadius={70} outerRadius={90} paddingAngle={5} dataKey="value" stroke="none">
                          {datosPastel.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: '#212529', borderColor: '#495057', color: '#fff', borderRadius: '8px' }} itemStyle={{ color: '#fff' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="d-flex justify-content-center gap-3 mt-2">
                    <span className="small text-white-50"><span style={{color: '#198754'}}>●</span> Confirmados</span>
                    <span className="small text-white-50"><span style={{color: '#ffc107'}}>●</span> Pendientes</span>
                    <span className="small text-white-50"><span style={{color: '#dc3545'}}>●</span> Cancelados</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-7">
              <div className="card bg-black border-secondary shadow-lg h-100" style={{ borderRadius: '15px' }}>
                <div className="card-body p-4">
                  <h5 className="text-white fw-bold mb-4">Demanda de Eventos (Últimos 4 meses)</h5>
                  <div style={{ height: '250px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={datosBarras}>
                        <XAxis dataKey="mes" stroke="#6c757d" axisLine={false} tickLine={false} />
                        <YAxis stroke="#6c757d" axisLine={false} tickLine={false} />
                        <Tooltip cursor={{fill: 'rgba(255,255,255,0.1)'}} contentStyle={{ backgroundColor: '#212529', borderColor: '#495057', color: '#fff', borderRadius: '8px' }} />
                        <Bar dataKey="eventos" fill="#ffc107" radius={[5, 5, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PanelPrincipal;