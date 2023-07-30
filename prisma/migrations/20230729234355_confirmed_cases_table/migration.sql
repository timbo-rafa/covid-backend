-- CreateTable
CREATE TABLE "confirmed_covid_cases" (
    "country_id" INTEGER NOT NULL,
    "date" DATE NOT NULL,
    "new_cases" INTEGER NOT NULL,
    "total_cases" BIGINT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "confirmed_covid_cases_country_id_date_key" ON "confirmed_covid_cases"("country_id", "date");

-- AddForeignKey
ALTER TABLE "confirmed_covid_cases" ADD CONSTRAINT "confirmed_covid_cases_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
