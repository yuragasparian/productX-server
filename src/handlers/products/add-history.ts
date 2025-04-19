import { PrismaClient } from "@prisma/client";

type Params = {
  product_id: number;
  change_made: string;
};

export async function addHistory(historyDetails: Params) {
  const prisma = new PrismaClient();
  const historyAdded = prisma.productHistory.create({ data: historyDetails });
  return historyAdded;
}
