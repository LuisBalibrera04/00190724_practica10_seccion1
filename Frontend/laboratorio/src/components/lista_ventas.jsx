import React, { useState } from 'react';
import './lista_venta.css'; 

const RegistrarVenta = () => {
  const [formData, setFormData] = useState({
    id_customer: '',
    amount: ''
  });

  const [message, setMessage] = useState({ text: '', type: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setMessage({ text: 'Procesando...', type: 'loading' });

    try {
      const response = await fetch('http://localhost:3000/api/sales', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id_customer: parseInt(formData.id_customer), 
            amount: parseFloat(formData.amount)          
        }),
      });

      if (response.ok) {
        setMessage({ text: '¡Venta registrada con éxito!', type: 'success' });
        setFormData({ id_customer: '', amount: '' }); 
      } else {
        
        const errorData = await response.json(); 
        setMessage({ text: errorData.message || 'Error al registrar la venta.', type: 'error' });
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage({ text: 'Error de conexión con el servidor.', type: 'error' });
    }
  };

  return (
    <div className="form-container">
      <h2>Registrar Nueva Venta</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="id_customer">ID del Cliente:</label>
          <input
            type="number"
            id="id_customer"
            name="id_customer"
            placeholder="Ej: 1"
            value={formData.id_customer}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Monto Total ($):</label>
          <input
            type="number"
            step="0.01"
            id="amount"
            name="amount"
            placeholder="Ej: 150.50"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn">Registrar Venta</button>
      </form>

      {/* Mensaje de feedback */}
      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}
    </div>
  );
};

export default RegistrarVenta;