-- @param {String} $1:tableName the table name
SELECT 
  CONCAT(table_schema, '.', table_name, '.', column_name) AS "id",
  table_name AS "tableName",
  column_name AS "columnName",
  data_type AS "dataType"
FROM information_schema.columns
 WHERE table_schema NOT IN  ('pg_catalog', 'information_schema')
 AND table_name NOT IN ('_prisma_migrations')
 AND table_schema = 'public'
 AND table_name = $1
