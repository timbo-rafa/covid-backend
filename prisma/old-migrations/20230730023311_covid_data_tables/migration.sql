-- CreateTable
CREATE TABLE "confirmed_covid_cases" (
    "country_id" INTEGER NOT NULL,
    "date" DATE NOT NULL,
    "new_cases" INTEGER,
    "total_cases" BIGINT
);

-- CreateTable
CREATE TABLE "confirmed_covid_deaths" (
    "country_id" INTEGER NOT NULL,
    "date" DATE NOT NULL,
    "new_deaths" INTEGER,
    "total_deaths" BIGINT
);

-- CreateTable
CREATE TABLE "covid_hospitalizations" (
    "country_id" INTEGER NOT NULL,
    "date" DATE NOT NULL,
    "icu_patients" INTEGER,
    "hosp_patients" INTEGER,
    "weekly_icu_admissions" INTEGER,
    "weekly_hosp_admissions" INTEGER
);

-- CreateTable
CREATE TABLE "covid_vaccinations" (
    "country_id" INTEGER NOT NULL,
    "date" DATE NOT NULL,
    "total_vaccinations" BIGINT,
    "people_vaccinated" BIGINT,
    "people_fully_vaccinated" BIGINT,
    "total_boosters" BIGINT,
    "new_vaccinations" INTEGER
);

-- CreateTable
CREATE TABLE "covid_tests" (
    "country_id" INTEGER NOT NULL,
    "date" DATE NOT NULL,
    "total_tests" BIGINT,
    "new_tests" INTEGER,
    "positive_rate" REAL,
    "tests_per_case" REAL
);

-- CreateIndex
CREATE UNIQUE INDEX "confirmed_covid_cases_country_id_date_key" ON "confirmed_covid_cases"("country_id", "date");

-- CreateIndex
CREATE UNIQUE INDEX "confirmed_covid_deaths_country_id_date_key" ON "confirmed_covid_deaths"("country_id", "date");

-- CreateIndex
CREATE UNIQUE INDEX "covid_hospitalizations_country_id_date_key" ON "covid_hospitalizations"("country_id", "date");

-- CreateIndex
CREATE UNIQUE INDEX "covid_vaccinations_country_id_date_key" ON "covid_vaccinations"("country_id", "date");

-- CreateIndex
CREATE UNIQUE INDEX "covid_tests_country_id_date_key" ON "covid_tests"("country_id", "date");

-- AddForeignKey
ALTER TABLE "confirmed_covid_cases" ADD CONSTRAINT "confirmed_covid_cases_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "confirmed_covid_deaths" ADD CONSTRAINT "confirmed_covid_deaths_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "covid_hospitalizations" ADD CONSTRAINT "covid_hospitalizations_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "covid_vaccinations" ADD CONSTRAINT "covid_vaccinations_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "covid_tests" ADD CONSTRAINT "covid_tests_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
