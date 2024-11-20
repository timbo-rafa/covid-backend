-- @param {String} $1:tableName the table name
SELECT 
    table_schema,
    table_name,
    column_name
  FROM information_schema.columns
 WHERE table_schema NOT IN  ('pg_catalog', 'information_schema')
 AND table_name NOT IN ('_prisma_migrations')
 AND table_schema = 'public'
 AND table_name = $1
