import { Router } from "express";
import auth from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { orderController } from "./order.controller";

const orderRoutes = Router();

orderRoutes.post("/", auth(Role.CUSTOMER), orderController.createOrder);

export default orderRoutes;
