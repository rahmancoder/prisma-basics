import { ServiceType } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

//   id          String      @id @default(uuid())
//   title       String // e.g., "AC Deep Cleaning", "Sofa Washing"
//   description String?
//   serviceType ServiceType
//   price       Decimal     @db.Decimal(10, 2) // Single source of truth for base pricing

//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt

const createService = async (payload: {
  title: string;
  description: string;
  serviceType: ServiceType;
  price: number;
}) => {
  const service = await prisma.service.create({
    data: payload,
  });
  return service;
};

const getAllServices = async () => {
  const services = await prisma.service.findMany();
  return services;
};

const getServiceById = async (id: string) => {
  const service = await prisma.service.findUnique({
    where: { id },
  });
  return service;
};

const updateService = async (
  id: string,
  payload: {
    title?: string;
    description?: string;
    serviceType?: ServiceType;
    price?: number;
  },
) => {
  const { title, description, serviceType, price } = payload;
  const service = await prisma.service.update({
    where: { id },
    data: {
      title,
      description,
      serviceType,
      price,
    },
  });
  return service;
};

const deleteService = async (id: string) => {
  const service = await prisma.service.delete({
    where: { id },
  });
  return service;
};

export const serviceService = {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
};
