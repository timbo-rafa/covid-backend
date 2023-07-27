CREATE EXTENSION IF NOT EXISTS timescaledb;
SELECT create_hypertable('country_covid_data','date', migrate_data => true);