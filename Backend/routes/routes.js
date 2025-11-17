import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../Keys/keys.js";
import { verifyToken } from "../middleware/Index.js";

// Importamos tus controladores corregidos
import { getUsers, getUserById } from "../controllers/getUsers.js";
import { createUser } from "../controllers/createUsers.js";
import { updateUser } from "../controllers/updateUsers.js";
import { deleteUser } from "../controllers/deleteUsers.js";
import { displayHome } from "../controllers/displayHome.js";
import { createSale } from "../controllers/post_venta.js";
import { getSales } from "../controllers/get_venta.js";
import { getCustomerByCode } from "../controllers/get_customerbycode.js";
import { getSalesReport } from "../controllers/get_sales_report.js";

const router = express.Router();

// --- LOGIN ---
router.post("/signin", (req, res) => {
    const { username, password } = req.body;

    // Validación básica para evitar errores vacíos
    if (!username || !password) {
        return res.status(400).json({ message: "Faltan credenciales" });
    }

    // NOTA: Aquí deberías validar contra la BD. Por ahora generamos el token.
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
});

router.get("/", displayHome);

// --- USUARIOS ---
router.get("/users", verifyToken, getUsers);
router.get("/users/:id", verifyToken, getUserById);
router.post("/users", verifyToken, createUser);
router.put("/users/:id", verifyToken, updateUser);
router.delete("/users/:id", verifyToken, deleteUser);

// --- VENTAS Y CLIENTES ---
router.post("/ventas", verifyToken, createSale);
router.get("/ventas", verifyToken, getSales);
router.get("/sales/report", verifyToken, getSalesReport);
router.get("/customers/search", verifyToken, getCustomerByCode);

export default router;