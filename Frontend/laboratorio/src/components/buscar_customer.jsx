import React, { useState } from 'react';
import API from '../utils/api'; // Importamos tu instancia configurada de axios
import './buscar_customer.css';

const BuscarCustomer = () => {
    const [code, setCode] = useState('');
    const [customers, setCustomers] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!code.trim()) return;

        setLoading(true);
        setError('');
        setCustomers([]);

        try {
            // Hacemos la petición GET enviando el code como query param
            const response = await API.get(`/api/customers/search?code=${code}`);
            
            // Asumiendo que el backend devuelve un array de clientes
            setCustomers(response.data); 
        } catch (err) {
            console.error(err);
            if (err.response && err.response.status === 404) {
                setError('No se encontró ningún cliente con ese código.');
            } else {
                setError('Error al buscar el cliente. Verifique su conexión o el token.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="search-container">
            <h2 className="search-title">Buscar Cliente por Código</h2>
            
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Ingrese código (ej: C001)"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="search-input"
                />
                <button type="submit" className="search-button" disabled={loading}>
                    {loading ? 'Buscando...' : 'Buscar'}
                </button>
            </form>

            {error && <p className="error-message">{error}</p>}

            {customers.length > 0 && (
                <table className="results-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Código</th>
                            <th>Nombre</th>
                            {/* Agrega más columnas según tu DB */}
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((cust) => (
                            <tr key={cust.id || cust.customer_code}>
                                <td>{cust.id}</td>
                                <td>{cust.customer_code}</td>
                                <td>{cust.name || cust.customer_name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default BuscarCustomer;