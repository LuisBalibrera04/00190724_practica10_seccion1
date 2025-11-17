import { pool } from "../data/conection.js";

export const createSale = async (req, res) => {
  const { id_customer, amount } = req.body;

  try {

    const customerCheck = await pool.query('SELECT * FROM customers WHERE id = $1', [id_customer]);

    if (customerCheck.rows.length === 0) {
      return res.status(404).json({ message: "El cliente con ese ID no existe." });
    }


    const newSale = await pool.query(
      'INSERT INTO sales (id_customer, amount, created_at) VALUES ($1, $2, NOW()) RETURNING *',
      [id_customer, amount]
    );

    res.status(201).json({
      message: "Venta registrada exitosamente",
      sale: newSale.rows[0]
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};