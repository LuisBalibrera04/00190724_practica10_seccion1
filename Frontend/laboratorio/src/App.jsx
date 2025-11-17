import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Protected from "./components/Protected";
import TablaBuscador from "./components/tabla_customer";
import ListaVentas from "./components/lista_ventas";
import RegistrarVenta from "./components/registrar_venta";
import SalesReport from "./components/sales_report";
import "./App.css";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem("token"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="app-container">
        {isAuthenticated && (
          <nav className="navbar">
            <div className="nav-brand">Mi Aplicación</div>
            <ul className="nav-links">
              <li><Link to="/protected">Dashboard</Link></li>
              <li><Link to="/clientes">Clientes</Link></li>
              <li><Link to="/ventas">Ventas</Link></li>
              <li><Link to="/registrar-venta">Registrar Venta</Link></li>
              <li><Link to="/reporte-ventas">Reporte</Link></li>
              <li><button onClick={handleLogout} className="logout-btn">Cerrar Sesión</button></li>
            </ul>
          </nav>
        )}
        <Routes>
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/protected" element={isAuthenticated ? <Protected /> : <Navigate to="/login" />} />
          <Route path="/clientes" element={isAuthenticated ? <TablaBuscador /> : <Navigate to="/login" />} />
          <Route path="/ventas" element={isAuthenticated ? <ListaVentas /> : <Navigate to="/login" />} />
          <Route path="/registrar-venta" element={isAuthenticated ? <RegistrarVenta /> : <Navigate to="/login" />} />
          <Route path="/reporte-ventas" element={isAuthenticated ? <SalesReport /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to={isAuthenticated ? "/protected" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;