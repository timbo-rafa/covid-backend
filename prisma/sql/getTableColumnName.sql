-- @param {String} $1:tableName the table name
-- @param {String} $2:columnName the column name
SELECT 
    table_name AS "tableName",
    column_name AS "columnName"
  FROM information_schema.columns
 WHERE table_schema NOT IN  ('pg_catalog', 'information_schema')
 AND table_name NOT IN ('_prisma_migrations')
 AND table_schema = 'public'
 AND table_name = $1
 AND column_name = $2
