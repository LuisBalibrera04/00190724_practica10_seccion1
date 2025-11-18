import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Login from "./components/Login";
import Protected from "./components/Protected";
import Customers from "./components/Customers";
import SalesForm from "./components/SalesForm";
import SalesList from "./components/SalesList";
import SalesReport from "./components/SalesReport";
import "./App.css";

const NavLink = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      style={{
        borderBottomColor: isActive ? "white" : "transparent",
        backgroundColor: isActive ? "rgba(255, 255, 255, 0.15)" : "transparent",
      }}
    >
      {children}
    </Link>
  );
};

const App = () => (
  <Router>
    <div>
      <nav className="main-nav">
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/customers">Customers</NavLink>
        <NavLink to="/sales">Sales</NavLink>
        <NavLink to="/sales-list">Sales List</NavLink>
        <NavLink to="/sales-report">Sales Report</NavLink>
      </nav>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/sales" element={<SalesForm />} />
        <Route path="/" element={<Login />} />
        <Route path="/sales-list" element={<SalesList />} />
        <Route path="/sales-report" element={<SalesReport />} />
      </Routes>
    </div>
  </Router>
);

export default App;