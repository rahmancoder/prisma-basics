import { Router } from "express";
import { paymentController } from "./payment.controller";

const paymentRoutes = Router();

paymentRoutes.post("/", paymentController.verifyPayment);

export default paymentRoutes;
