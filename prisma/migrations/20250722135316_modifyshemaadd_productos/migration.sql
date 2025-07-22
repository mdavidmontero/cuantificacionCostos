-- CreateTable
CREATE TABLE "MateriaPrima" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "organizacionId" TEXT NOT NULL,

    CONSTRAINT "MateriaPrima_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MateriaPrima" ADD CONSTRAINT "MateriaPrima_organizacionId_fkey" FOREIGN KEY ("organizacionId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
