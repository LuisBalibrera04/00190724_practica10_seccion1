import React, { useState, useEffect } from 'react';
import API from '../utils/api';
import './sales_report.css';

const SalesReport = () => {
    const [reportData, setReportData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const response = await API.get('/api/sales/report');
                setReportData(response.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Error al cargar el reporte de ventas.');
                setLoading(false);
            }
        };

        fetchReport();
    }, []);

    if (loading) return <div className="loading-text">Cargando reporte...</div>;
    if (error) return <div className="error-text">{error}</div>;

    return (
        <div className="report-container">
            <h2 className="report-title">Reporte de Ventas por Cliente</h2>
            
            <table className="report-table">
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Total Ventas ($)</th>
                    </tr>
                </thead>
                <tbody>
                    {reportData.length > 0 ? (
                        reportData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.customer_name}</td>
                                <td className="total-cell">
                                    {/* Formateamos a moneda si es necesario */}
                                    ${Number(item.total_sales).toFixed(2)}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="2" style={{textAlign: 'center'}}>No hay ventas registradas.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default SalesReport;