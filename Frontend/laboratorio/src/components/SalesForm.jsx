import React, { useState, useEffect } from "react";
import API from "../utils/api";
import "./SalesForm.css";

const SalesForm = () => {
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({
    amount: "",
    id_customer: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loadingCustomers, setLoadingCustomers] = useState(true);

  // Cargar lista de clientese
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await API.get("/customers");
        setCustomers(response.data);
        setLoadingCustomers(false);
      } catch (err) {
        console.error("Error al cargar clientes:", err);
        setMessage({
          type: "error",
          text: "No se pudieron cargar los clientes"
        });
        setLoadingCustomers(false);
      }
    };

    fetchCustomers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar mensajes al escribir
    if (message.text) setMessage({ type: "", text: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validaciones del frontend
    if (!formData.amount || !formData.id_customer) {
      setMessage({
        type: "error",
        text: "Todos los campos son requeridos"
      });
      return;
    }

    if (parseFloat(formData.amount) <= 0) {
      setMessage({
        type: "error",
        text: "El monto debe ser mayor a 0"
      });
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await API.post("/sales", {
        amount: parseFloat(formData.amount),
        id_customer: parseInt(formData.id_customer)
      });

      setMessage({
        type: "success",
        text: response.data.message || "¡Venta registrada exitosamente!"
      });

      // Limpiar formulario
      setFormData({
        amount: "",
        id_customer: ""
      });

    } catch (err) {
      console.error("Error al registrar venta:", err);
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Error al registrar la venta"
      });
    } finally {
      setLoading(false);
    }
  };

  if (loadingCustomers) {
    return (
      <div className="sales-container">
        <div className="loading">Cargando información...</div>
      </div>
    );
  }

  return (
    <div className="sales-container">
      <div className="sales-form-wrapper">
        <h1>Registrar Nueva Venta</h1>
        
        <form className="sales-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="id_customer">Cliente *</label>
            <select
              id="id_customer"
              name="id_customer"
              value={formData.id_customer}
              onChange={handleChange}
              required
              disabled={loading}
            >
              <option value="">Selecciona un cliente</option>
              {customers.map(customer => (
                <option key={customer.id} value={customer.id}>
                  {customer.name} - {customer.code}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="amount">Monto (USD) *</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              min="0.01"
              required
              disabled={loading}
            />
          </div>

          {message.text && (
            <div className={`message ${message.type}`}>
              {message.text}
            </div>
          )}

          <button 
            type="submit" 
            className="submit-btn"
            disabled={loading}
          >
            {loading ? "Registrando..." : "Registrar Venta"}
          </button>
        </form>

        {customers.length === 0 && (
          <div className="warning-box">
            <p>No hay clientes registrados. Por favor, registra clientes primero.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesForm;