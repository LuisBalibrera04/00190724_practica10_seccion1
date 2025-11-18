import { pool } from "../data/conection.js";

export const createSale = async (request, response) => {
  const { amount, id_customer } = request.body;

  if (!amount || !id_customer) {
    return response.status(400).json({ 
      message: "Los campos amount y id_customer son requeridos" 
    });
  }

  if (isNaN(amount) || amount <= 0) {
    return response.status(400).json({ 
      message: "El monto debe ser un número positivo" 
    });
  }

  try {
    const customerCheck = await pool.query(
      'SELECT id FROM customers WHERE id = $1',
      [id_customer]
    );

    if (customerCheck.rows.length === 0) {
      return response.status(404).json({ 
        message: "El cliente no existe" 
      });
    }

    const result = await pool.query(
      'INSERT INTO sales (amount, created_at, id_customer) VALUES ($1, NOW(), $2) RETURNING *',
      [amount, id_customer]
    );

    response.status(201).json({
      message: "Venta registrada exitosamente",
      sale: result.rows[0]
    });

  } catch (error) {
    console.error('Error al crear venta:', error);
    response.status(500).json({ 
      message: "Error al registrar la venta",
      error: error.message 
    });
  }
};