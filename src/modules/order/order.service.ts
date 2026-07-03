import { JwtPayload } from "jsonwebtoken";
import { Order } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import { paymentService } from "../payment/payment.service";

const createOrder = async (
  payload: Pick<Order, "quantity" | "serviceId">,
  user?: JwtPayload,
) => {
  if (!user) throw new Error("User Not Found");

  const service = await prisma.service.findUnique({
    where: { id: payload.serviceId },
  });
  if (!service) throw new Error("Service not available");

  const totalPrice = Number(service.price) * payload.quantity;

  const data = { ...payload, userId: user.id, totalPrice };

  // we created out order
  const order = await prisma.order.create({ data });

  // we have to payment
  const paymentUrl = await paymentService.initiatePayment(order, user);

  return { order, paymentUrl };
};

export const orderService = {
  createOrder,
};
