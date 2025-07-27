import express from "express";
import {  placeOrder } from "../controllers/ordersController.js";


const router = express.Router();

router.post("/",  placeOrder);


export default router;
