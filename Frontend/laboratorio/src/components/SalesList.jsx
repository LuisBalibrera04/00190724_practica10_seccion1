import React, { useEffect, useState } from "react";
import API from "../utils/api";
import "./SalesList.css";

const SalesList = () => {
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchSales = async () => {
            try {
                const response = await API.get("/sales");
                setSales(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error al cargar ventas:", err);
                setError(err.response?.data?.message || "Error al cargar las ventas");
                setLoading(false);
            }
        };

        fetchSales();
    }, []);

    // Función para formatear la fecha
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Función para formatear el monto
    const formatAmount = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    if (loading) {
        return (
            <div className="sales-list-container">
                <div className="loading">Cargando ventas...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="sales-list-container">
                <div className="error-message">{error}</div>
            </div>
        );
    }

    return (
        <div className="sales-list-container">
            {sales.length === 0 ? (
                <div className="no-data">
                    <p>No hay ventas registradas</p>
                </div>
            ) : (
                <div className="table-wrapper">
                    <table className="sales-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Fecha</th>
                                <th>Cliente</th>
                                <th>Monto</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sales.map((sale) => (
                                <tr key={sale.id}>
                                    <td className="sale-id">#{sale.id}</td>
                                    <td className="sale-date">{formatDate(sale.created_at)}</td>
                                    <td className="customer-name">
                                        <div className="customer-info">
                                            <span className="name">{sale.customer_name}</span>
                                        </div>
                                    </td>
                                    <td className="sale-amount">{formatAmount(sale.amount)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default SalesList;