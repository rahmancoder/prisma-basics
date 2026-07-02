import { Router } from "express";
import { serviceController } from "./service.controller";
import auth from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";

const serviceRoutes = Router();

serviceRoutes.get("/", serviceController.getAllServices);

serviceRoutes.get("/:id", serviceController.getServiceById);

serviceRoutes.post("/", auth(Role.ADMIN), serviceController.createService);

serviceRoutes.put("/:id", serviceController.updateService);

serviceRoutes.delete("/:id", serviceController.deleteService);

export default serviceRoutes;
