import React, { useEffect, useState } from "react";
import API from "../utils/api";
import "./Customers.css";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchCode, setSearchCode] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState(null);

  useEffect(() => {
    fetchAllCustomers();
  }, []);

  const fetchAllCustomers = async () => {
    try {
      const response = await API.get("/customers");
      setCustomers(response.data);
      setLoading(false);
      setError("");
      setSearchResults(null);
    } catch (err) {
      console.error("Error fetching customers:", err);
      setError(err.response?.data?.message || "Error al cargar los clientes");
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchCode.trim()) {
      setError("Ingresa un código para buscar");
      return;
    }

    setSearching(true);
    setError("");
    setSearchResults(null);

    try {
      const response = await API.get(`/customers/search?code=${searchCode.trim()}`);
      setSearchResults(response.data);
      setSearching(false);
    } catch (err) {
      console.error("Error searching customer:", err);
      setError(err.response?.data?.message || "No se encontraron clientes con ese código");
      setSearchResults([]);
      setSearching(false);
    }
  };

  const handleClearSearch = () => {
    setSearchCode("");
    setError("");
    setSearchResults(null);
  };

  if (loading) {
    return (
      <div className="customers-container">
        <div className="loading">Cargando clientes...</div>
      </div>
    );
  }

  const displayData = searchResults !== null ? searchResults : customers;

  return (
    <div className="customers-container">
      <h1>Lista de Clientes</h1>
      <div className="search-section">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Buscar por código..."
            value={searchCode}
            onChange={(e) => setSearchCode(e.target.value)}
            className="search-input"
          />
          
          <button 
            type="submit"
            className="search-btn"
            disabled={searching}
          >
            {searching ? "Buscando..." : "Buscar"}
          </button>

          {searchCode && (
            <button 
              type="button"
              onClick={handleClearSearch}
              className="clear-btn"
            >
            </button>
          )}
        </form>

        {searchResults && searchResults.length > 0 && (
          <div className="search-info">
            ✓ {searchResults.length} cliente{searchResults.length > 1 ? 's' : ''} encontrado{searchResults.length > 1 ? 's' : ''}
          </div>
        )}
      </div>

      {error && <div className="error-message">{error}</div>}

      {displayData.length === 0 && !error ? (
        <p className="no-data">No hay clientes registrados</p>
      ) : (
        <>
          <div className="table-wrapper">
            <table className="customers-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Dirección</th>
                  <th>Teléfono</th>
                  <th>Código</th>
                </tr>
              </thead>
              <tbody>
                {displayData.map((customer) => (
                  <tr key={customer.id}>
                    <td>{customer.id}</td>
                    <td>{customer.name}</td>
                    <td>{customer.address}</td>
                    <td>{customer.phone}</td>
                    <td className="customer-code">{customer.code}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Customers;