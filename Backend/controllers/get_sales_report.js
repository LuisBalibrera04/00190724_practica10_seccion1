import { pool } from "../data/conection.js";

export const getSalesReport = async (req, res) => {
    try {
        const query = `SELECT c.name, SUM(s.amount) FROM customers as C JOIN sales AS S ON s.id_customer = c.id GROUP BY c.name
        `;

        const result = await pool.query(query);

        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Error al obtener reporte de ventas:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};