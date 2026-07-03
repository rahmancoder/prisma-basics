import { catchAsync } from "../../utils/catch-async";
import { sendResponse } from "../../utils/send-response";
import { orderService } from "./order.service";
import httpStatus from "http-status";

const createOrder = catchAsync(async (req, res) => {
  const user = req.user;

  const payload = req.body;
  if (!payload.quantity || !payload.serviceId)
    throw new Error("Please provide Service Id and  Quantity");

  const { order, paymentUrl } = await orderService.createOrder(payload, user);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Order Placed",
    data: { order, paymentUrl },
  });
});

export const orderController = {
  createOrder,
};
