import jwt, { JwtPayload } from "jsonwebtoken";
import { catchAsync } from "../utils/catch-async";
import { Role } from "../../generated/prisma/client";
import config from "../config";

declare global {
  namespace Express {
    interface Request {
      user?:
        | {
            id: string;
            name: string;
            email: string;
            role: Role;
          }
        | JwtPayload;
    }
  }
}

const auth = (...roles: Role[]) =>
  catchAsync(async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - No token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(
        token as string,
        config.jwt_access_secret as string,
      ) as JwtPayload;

      console.log("Decoded Token:", decoded);

      if (!roles.includes(decoded.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden - Unauthorized access",
        });
      }

      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - Invalid token",
      });
    }
  });

export default auth;
