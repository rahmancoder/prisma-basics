import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";
import { prisma } from "../../lib/prisma";
import config from "../../config";
import { Role } from "../../../generated/prisma/client";

const login = async (payload: { email: string; password: string }) => {
  const { email, password } = payload;

  // Find user by email
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Compare passwords
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  // Generate JWT token
  const token = jwt.sign(jwtPayload, config.jwt_access_secret, {
    expiresIn: config.jwt_access_expires_in,
  } as SignOptions);

  return {
    accessToken: token,
    user: jwtPayload,
  };
};

const register = async (payload: {
  name: string;
  email: string;
  password: string;
  role?: Role;
}) => {
  const { name, email, password, role } = payload;

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: role,
    },
  });

  return newUser;
};

export const authService = {
  login,
  register,
};
