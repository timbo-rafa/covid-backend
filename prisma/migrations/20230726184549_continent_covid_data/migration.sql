-- CreateTable
CREATE TABLE "continent_covid_data" (
    "continent_id" INTEGER NOT NULL,
    "date" DATE NOT NULL,
    "total_cases" BIGINT,
    "new_cases" INTEGER,
    "new_cases_smoothed" REAL,
    "total_deaths" INTEGER,
    "new_deaths" INTEGER,
    "new_deaths_smoothed" REAL,
    "total_cases_per_million" REAL,
    "new_cases_per_million" REAL,
    "new_cases_smoothed_per_million" REAL,
    "total_deaths_per_million" REAL,
    "new_deaths_per_million" REAL,
    "new_deaths_smoothed_per_million" REAL,
    "reproduction_rate" REAL,
    "icu_patients" INTEGER,
    "icu_patients_per_million" REAL,
    "hosp_patients" INTEGER,
    "hosp_patients_per_million" REAL,
    "weekly_icu_admissions" INTEGER,
    "weekly_icu_admissions_per_million" REAL,
    "weekly_hosp_admissions" INTEGER,
    "weekly_hosp_admissions_per_million" REAL,
    "total_tests" BIGINT,
    "new_tests" INTEGER,
    "total_tests_per_thousand" REAL,
    "new_tests_per_thousand" REAL,
    "new_tests_smoothed" REAL,
    "new_tests_smoothed_per_thousand" REAL,
    "positive_rate" REAL,
    "tests_per_case" REAL,
    "tests_units" VARCHAR(50),
    "total_vaccinations" BIGINT,
    "people_vaccinated" BIGINT,
    "people_fully_vaccinated" BIGINT,
    "total_boosters" BIGINT,
    "new_vaccinations" INTEGER,
    "new_vaccinations_smoothed" REAL,
    "total_vaccinations_per_hundred" REAL,
    "people_vaccinated_per_hundred" REAL,
    "people_fully_vaccinated_per_hundred" REAL,
    "total_boosters_per_hundred" REAL,
    "new_vaccinations_smoothed_per_million" REAL,
    "new_people_vaccinated_smoothed" REAL,
    "new_people_vaccinated_smoothed_per_hundred" REAL,
    "stringency_index" REAL,
    "population_density" REAL,
    "median_age" REAL,
    "aged_65_older" REAL,
    "aged_70_older" REAL,
    "gdp_per_capita" REAL,
    "extreme_poverty" REAL,
    "cardiovasc_death_rate" REAL,
    "diabetes_prevalence" REAL,
    "female_smokers" REAL,
    "male_smokers" REAL,
    "handwashing_facilities" REAL,
    "hospital_beds_per_thousand" REAL,
    "life_expectancy" REAL,
    "human_development_index" REAL,
    "population" BIGINT,
    "excess_mortality_cumulative_absolute" REAL,
    "excess_mortality_cumulative" REAL,
    "excess_mortality" REAL,
    "excess_mortality_cumulative_per_million" REAL
);

-- CreateIndex
CREATE UNIQUE INDEX "continent_covid_data_continent_id_date_key" ON "continent_covid_data"("continent_id", "date");

-- AddForeignKey
ALTER TABLE "continent_covid_data" ADD CONSTRAINT "continent_covid_data_continent_id_fkey" FOREIGN KEY ("continent_id") REFERENCES "continent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;