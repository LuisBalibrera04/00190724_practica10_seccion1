import { pool } from "../data/conection.js";

export const getCustomerByCode = async (req, res) => {
   
    const { code } = req.query;

    if (!code) {
        return res.status(400).json({ message: "El parámetro 'code' es requerido." });
    }

    try {
       
        const query = 'SELECT * FROM customers WHERE code = $1';
        const result = await pool.query(query, [code]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Cliente no encontrado con ese código." });
        }

       
        res.json(result.rows); 
        
    } catch (error) {
        console.error("Error al buscar cliente:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};