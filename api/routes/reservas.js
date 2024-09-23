import express from "express";
import { addReservas, deleteReservas, getReservas, updateReserva } from "../controllers/reservas.js";

const router = express.Router()

router.get("/", getReservas)

router.post("/", addReservas)

router.put("/:id", updateReserva)

router.delete("/:id", deleteReservas)

export default router