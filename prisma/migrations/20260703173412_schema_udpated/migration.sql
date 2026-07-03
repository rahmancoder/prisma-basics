/*
  Warnings:

  - A unique constraint covering the columns `[tranId]` on the table `payments` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "payments_tranId_key" ON "payments"("tranId");
