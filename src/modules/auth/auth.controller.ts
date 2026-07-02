import httpStatus from "http-status";
import { catchAsync } from "../../utils/catch-async";
import { sendResponse } from "../../utils/send-response";
import { authService } from "./auth.service";

const login = catchAsync(async (req, res) => {
  const payload = req.body;

  // Validate email and password
  if (!payload?.email || !payload?.password) {
    throw new Error("Email and password are required");
  }

  const response = await authService.login(payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Login successful",
    data: response,
  });
});

const register = catchAsync(async (req, res) => {
  const payload = req.body;

  // Validate name, email and password
  if (!payload?.name || !payload?.email || !payload?.password) {
    throw new Error("Name, email and password are required");
  }

  const response = await authService.register(payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User registered successfully",
    data: response,
  });
});

export const authController = {
  login,
  register,
};
