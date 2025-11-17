import { pool } from "../data/conection.js";

// Función para obtener ventas (ya la tenías)
export const getSales = (request, response) => {
  pool.query('SELECT s.id, s.amount, s.created_at, c.name AS customer_name FROM sales AS s JOIN customers AS c ON s.id_customer = c.id', (error, results) => {
    if (error) {
        throw error;
    }
    response.status(200).json(results.rows);
  });
};