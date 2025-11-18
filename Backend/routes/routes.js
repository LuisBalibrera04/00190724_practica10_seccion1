import express from "express";
import { verifyToken } from "../middleware/Index.js";
import { getUsers, getUserById } from "../controllers/getUsers.js";
import { createUser } from "../controllers/createUsers.js";
import { updateUser } from "../controllers/updateUsers.js";
import { deleteUser } from "../controllers/deleteUsers.js";
import { displayHome } from "../controllers/displayHome.js";
import { getCustomers, searchCustomerByCode } from "../controllers/getCustomers.js";
import { createSale } from "../controllers/createSales.js";
import { getSales, getSalesReport } from "../controllers/getSales.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../Keys/keys.js";

const router = express.Router();

// Ruta de login de prueba: devuelve un token válido para cualquier usuario/contraseña
router.post("/signin", (req, res) => {
	const { username = "test" } = req.body;
	const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });
	res.json({ token });
});

router.get("/", displayHome);
router.get("/users", verifyToken, getUsers);
router.get("/users/:id", verifyToken, getUserById);
router.post("/users", verifyToken, createUser);
router.put("/users/:id", verifyToken, updateUser);
router.delete("/users/:id", verifyToken, deleteUser);
router.get("/customers", verifyToken, getCustomers);
router.get("/customers/:code", verifyToken, searchCustomerByCode);
router.post("/sales", verifyToken, createSale);
router.get("/sales", verifyToken, getSales);
router.get("/sales/report", verifyToken, getSalesReport);

export default router;