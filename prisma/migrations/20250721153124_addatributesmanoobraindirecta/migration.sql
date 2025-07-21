/*
  Warnings:

  - Added the required column `cantidad` to the `ManoObraIndirecta` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ManoObraIndirecta" ADD COLUMN     "cantidad" DOUBLE PRECISION NOT NULL;
