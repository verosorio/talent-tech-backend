/*
  Warnings:

  - The primary key for the `companies` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `departments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `employees` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "departments" DROP CONSTRAINT "departments_company_id_fkey";

-- DropForeignKey
ALTER TABLE "employees" DROP CONSTRAINT "employees_company_id_fkey";

-- DropForeignKey
ALTER TABLE "employees" DROP CONSTRAINT "employees_department_id_fkey";

-- AlterTable
ALTER TABLE "companies" DROP CONSTRAINT "companies_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "companies_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "companies_id_seq";

-- AlterTable
ALTER TABLE "departments" DROP CONSTRAINT "departments_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "company_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "departments_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "departments_id_seq";

-- AlterTable
ALTER TABLE "employees" DROP CONSTRAINT "employees_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "company_id" SET DATA TYPE TEXT,
ALTER COLUMN "department_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "employees_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "employees_id_seq";

-- AddForeignKey
ALTER TABLE "departments" ADD CONSTRAINT "departments_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
