import { catchAsync } from "../../utils/catch-async";
import { paymentService } from "./payment.service";

const verifyPayment = catchAsync(async (req, res) => {
  const { orderId, tranId, status } = req.query;

  const payload = req.body;

  const response = await paymentService.validatePayment(
    orderId as string,
    tranId as string,
    status as string,
    payload,
  );

  if (response === "success") {
    res.redirect("https://web.programming-hero.com/dashboard");
  } else if (response === "fail") {
    res.redirect("https://www.facebook.com");
  } else if (response === "cancel") res.redirect("https://www.youtube.com");
});

export const paymentController = {
  verifyPayment,
};
