import { Pool } from "../data/conection";
export const getCustomers = (request, response) => {
    pool.query('SELECT * FROM customers', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    })
}
