SELECT create_hypertable('country_covid_data','date', migrate_data => true);
SELECT create_hypertable('confirmed_covid_cases','date', migrate_data => true);
SELECT create_hypertable('confirmed_covid_deaths','date', migrate_data => true);
SELECT create_hypertable('covid_hospitalizations','date', migrate_data => true);
SELECT create_hypertable('covid_vaccinations','date', migrate_data => true);
SELECT create_hypertable('covid_tests','date', migrate_data => true);