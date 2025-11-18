import React, { useEffect, useState } from "react";
import API from "../utils/api";
import "./SalesReport.css";

const SalesReport = () => {
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSalesReport();
  }, []);

  const fetchSalesReport = async () => {
    try {
      const response = await API.get("/sales/report");
      setReportData(response.data);
      setLoading(false);
      setError("");
    } catch (err) {
      console.error("Error al cargar reporte:", err);
      setError(err.response?.data?.message || "Error al cargar el reporte de ventas");
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  // Calcular total general
  const totalGeneral = reportData.reduce((sum, item) => sum + parseFloat(item.total_sales), 0);

  if (loading) {
    return (
      <div className="sales-report-container">
        <div className="loading">Cargando reporte...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="sales-report-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="sales-report-container">
      <h1>Reporte de Ventas por Cliente</h1>

      {reportData.length === 0 ? (
        <p className="no-data">No hay datos de ventas para mostrar</p>
      ) : (
        <>
          <div className="table-wrapper">
            <table className="report-table">
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Total Ventas</th>
                </tr>
              </thead>
              <tbody>
                {reportData.map((item, index) => (
                  <tr key={index}>
                    <td className="customer-name">{item.name}</td>
                    <td className="total-sales">{formatCurrency(item.total_sales)}</td>
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

export default SalesReport;