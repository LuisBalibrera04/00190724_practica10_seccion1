import express from "express";
import { verifyToken } from "../middleware/Index.js";
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

import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../Keys/keys.js";


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
router.post("/ventas", verifyToken, createSale );
router.get("/ventas", verifyToken, getSales );
router.get("/customers/search", verifyToken, getCustomerByCode);
router.get("/sales/report", verifyToken, getSalesReport);

export default router;