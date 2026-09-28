import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const Ingresos = () => {
  const [transacciones] = useState([
    { id: "TX-1042", fecha: "2026-10-12", cliente: "María Fernanda López", concepto: "Anticipo 50% - Paquete Premium", metodo: "Tarjeta", monto: 6000, estado: "Aprobado" },
    { id: "TX-1043", fecha: "2026-10-14", cliente: "Carlos Ramírez", concepto: "Liquidación - Paquete VIP", metodo: "Transferencia", monto: 12500, estado: "Aprobado" },
    { id: "TX-1044", fecha: "2026-10-15", cliente: "Familia Gómez", concepto: "Anticipo 30% - Paquete Básico", metodo: "Efectivo", monto: 1650, estado: "Pendiente" },
    { id: "TX-1045", fecha: "2026-10-18", cliente: "Empresa XYZ", concepto: "Renta de Equipo de Sonido", metodo: "Tarjeta", monto: 4500, estado: "Aprobado" },
  ]);

  // Datos para la gráfica interactiva
  const datosIngresos = [
    { mes: 'Ene', total: 12000 }, { mes: 'Feb', total: 18000 }, { mes: 'Mar', total: 14000 },
    { mes: 'Abr', total: 22000 }, { mes: 'May', total: 28000 }, { mes: 'Jun', total: 26000 },
    { mes: 'Jul', total: 32000 }, { mes: 'Ago', total: 29000 }, { mes: 'Sep', total: 45000 },
    { mes: 'Oct', total: 34500 }
  ];

  return (
    <div className="d-flex position-relative" style={{ minHeight: '100vh', backgroundColor: '#212529' }}>
      
      {/* Menú Lateral con la corrección de hover */}
      <div className="bg-black border-end border-secondary d-flex flex-column d-none d-md-flex flex-shrink-0" style={{ width: '260px', minWidth: '260px' }}>
        <div className="p-4 border-bottom border-secondary text-center">
          <h4 className="text-white fw-bold mb-0 text-uppercase" style={{ letterSpacing: '2px' }}>
            Booz <span className="text-warning">Admin</span>
          </h4>
        </div>
        <div className="d-flex flex-column p-3 gap-2 mt-2">
          <Link to="/admin" className="btn btn-outline-light text-start rounded-pill px-4 py-2 border-0">Panel Principal</Link>
          <Link to="/admin/paquetes" className="btn btn-outline-light text-start rounded-pill px-4 py-2 border-0">Gestión de Paquetes</Link>
          <Link to="/admin/agenda" className="btn btn-outline-light text-start rounded-pill px-4 py-2 border-0">Agenda de Eventos</Link>
          <Link to="/admin/ingresos" className="btn btn-warning fw-bold text-start text-dark rounded-pill px-4 py-2">Ingresos</Link>
          <Link to="/admin/productos" className="btn btn-outline-light text-start rounded-pill px-4 py-2 border-0">Productos y Servicios</Link>
          <Link to="/admin/portafolio" className="btn btn-outline-light text-start rounded-pill px-4 py-2 border-0">Gestión de Trabajos Recientes</Link>
          <Link to="/admin/promociones" className="btn btn-outline-light text-start rounded-pill px-4 py-2 border-0">Gestión de Promociones</Link>
          <Link to="/admin/solicitudes" className="btn btn-outline-light text-start rounded-pill px-4 py-2 border-0">Gestión de Solicitudes Personalizadas</Link>
        </div>
      </div>

      <div className="flex-grow-1 d-flex flex-column">
        <nav className="navbar navbar-dark bg-black px-4 py-3 border-bottom border-secondary d-flex justify-content-between">
          <div className="text-white"><span className="fw-semibold">Reporte de Ingresos</span></div>
          <div><Link to="/" className="btn btn-sm btn-outline-danger rounded-pill px-3 fw-bold">Cerrar Sesión</Link></div>
        </nav>

        <div className="p-4 p-md-5">
          <h3 className="text-white fw-bold mb-4">Resumen Financiero</h3>

          <div className="row g-4 mb-5">
            <div className="col-md-4">
              <div className="card bg-black border-secondary shadow-sm text-white h-100" style={{ borderRadius: '15px' }}>
                <div className="card-body p-4 text-center">
                  <span className="text-white-50 small text-uppercase fw-bold mb-2">Ingresos del Mes</span>
                  <h2 className="display-6 fw-bold text-success mb-0">$34,500.00</h2>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card bg-black border-secondary shadow-sm text-white h-100" style={{ borderRadius: '15px' }}>
                <div className="card-body p-4 text-center">
                  <span className="text-white-50 small text-uppercase fw-bold mb-2">Por Cobrar (Pendiente)</span>
                  <h2 className="display-6 fw-bold text-warning mb-0">$18,000.00</h2>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card bg-warning border-0 shadow-sm text-dark h-100" style={{ borderRadius: '15px' }}>
                <div className="card-body p-4 text-center">
                  <span className="small text-uppercase fw-bold mb-2 opacity-75">Total Anual Estimado</span>
                  <h2 className="display-6 fw-bold mb-0">$415,200.00</h2>
                </div>
              </div>
            </div>
          </div>

          {/* Gráfica Interactiva con Recharts */}
          <div className="card bg-black border-secondary shadow-sm mb-5" style={{ borderRadius: '15px' }}>
            <div className="card-body p-4">
              <h5 className="text-white fw-bold mb-4">Flujo de Ingresos 2026</h5>
              <div style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={datosIngresos} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ffc107" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#ffc107" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#343a40" vertical={false} />
                    <XAxis dataKey="mes" stroke="#6c757d" tickLine={false} axisLine={false} />
                    <YAxis stroke="#6c757d" tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#212529', borderColor: '#495057', color: '#fff', borderRadius: '8px' }} 
                      itemStyle={{ color: '#ffc107' }} 
                      formatter={(value) => [`$${value.toLocaleString()}`, 'Total']} 
                    />
                    <Area type="monotone" dataKey="total" stroke="#ffc107" strokeWidth={3} fillOpacity={1} fill="url(#colorIngresos)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <h5 className="text-white fw-bold mb-3">Últimas Transacciones</h5>
          <div className="card bg-black border-secondary shadow-sm" style={{ borderRadius: '15px' }}>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-dark table-hover mb-0" style={{ borderRadius: '15px', overflow: 'hidden' }}>
                  <thead className="bg-dark">
                    <tr>
                      <th className="py-3 px-4 text-white-50 border-bottom border-secondary">ID Transacción</th>
                      <th className="py-3 px-4 text-white-50 border-bottom border-secondary">Fecha</th>
                      <th className="py-3 px-4 text-white-50 border-bottom border-secondary">Cliente / Concepto</th>
                      <th className="py-3 px-4 text-white-50 border-bottom border-secondary">Método</th>
                      <th className="py-3 px-4 text-white-50 border-bottom border-secondary text-end">Monto</th>
                      <th className="py-3 px-4 text-white-50 border-bottom border-secondary text-center">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transacciones.map((tx) => (
                      <tr key={tx.id}>
                        <td className="py-3 px-4 align-middle border-bottom border-secondary text-white-50 small">{tx.id}</td>
                        <td className="py-3 px-4 align-middle border-bottom border-secondary">{tx.fecha}</td>
                        <td className="py-3 px-4 align-middle border-bottom border-secondary">
                          <span className="d-block fw-bold">{tx.cliente}</span>
                          <span className="small text-white-50">{tx.concepto}</span>
                        </td>
                        <td className="py-3 px-4 align-middle border-bottom border-secondary">{tx.metodo}</td>
                        <td className="py-3 px-4 align-middle border-bottom border-secondary text-end fw-bold">
                          ${tx.monto.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                        </td>
                        <td className="py-3 px-4 align-middle border-bottom border-secondary text-center">
                          <span className={`badge ${tx.estado === 'Aprobado' ? 'bg-success' : 'bg-warning text-dark'}`}>
                            {tx.estado}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Ingresos;