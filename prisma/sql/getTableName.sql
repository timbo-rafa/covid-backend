-- @param {String} $1:tableName the table name
SELECT 
    table_name AS "tableName"
  FROM information_schema.columns
 WHERE table_schema NOT IN  ('pg_catalog', 'information_schema')
 AND table_name NOT IN ('_prisma_migrations')
 AND table_schema = 'public'
 AND table_name = $1
 LIMIT 1