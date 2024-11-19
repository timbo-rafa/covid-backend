/*
  Warnings:
  - A unique constraint covering the columns `[country_id,date]` on the table `country_covid_data` will be added. If there are existing duplicate values, this will fail.
  - Made the column `country_id` on table `country_covid_data` required. This step will fail if there are existing NULL values in that column.
*/


UPDATE country_covid_data ccd
SET country_id = c.id
FROM country c
WHERE c.iso_code = ccd.iso_code;

-- AlterTable
ALTER TABLE "country_covid_data" ALTER COLUMN "country_id" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "country_covid_data_country_id_date_key" ON "country_covid_data"("country_id", "date");

-- AddForeignKey
ALTER TABLE "country_covid_data" ADD CONSTRAINT "country_covid_data_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE country_covid_data DROP COLUMN "iso_code", DROP COLUMN "continent", DROP COLUMN "location";