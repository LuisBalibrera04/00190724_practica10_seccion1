import React, { useState, useEffect } from 'react';
import './tabla_customer.css';

const CustomerList = () => {

  const [customers, setCustomers] = useState([]);
  

  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const API_URL = 'http://localhost:3000/api/customers'; 

    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        }
        return response.json();
      })
      .then((data) => {
        setCustomers(data); 
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching customers:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando clientes...</p>;

  return (
    <div className="customer-container">
      <h2>Lista de Clientes</h2>
      
      {/* Renderizado de la tabla */}
      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2', textAlign: 'left' }}>
            <th>ID</th>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Código</th>
          </tr>
        </thead>
        <tbody>
          {customers.length > 0 ? (
            customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.name}</td>
                <td>{customer.address}</td>
                <td>{customer.phone}</td>
                <td>{customer.code}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>No hay clientes registrados.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;