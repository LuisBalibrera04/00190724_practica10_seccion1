import { pool } from "../data/conection.js";

export const getCustomers = (request, response) => {
  pool.query('SELECT * FROM customers', (error, results) => {
    if (error) {
        throw error;
    }
    response.status(200).json(results.rows);
    })
}

export const searchCustomerByCode = async (request, response) => {
  const { code } = request.query;

  if (!code) {
    return response.status(400).json({ 
      message: "El parámetro 'code' es requerido" 
    });
  }

  try {
    const result = await pool.query(
      'SELECT * FROM customers WHERE code = $1',
      [code]
    );

    if (result.rows.length === 0) {
      return response.status(404).json({ 
        message: "No se encontró ningún cliente con ese código" 
      });
    }

    response.status(200).json(result.rows);

  } catch (error) {
    console.error('Error al buscar cliente:', error);
    response.status(500).json({ 
      message: "Error al buscar el cliente",
      error: error.message 
    });
  }
};