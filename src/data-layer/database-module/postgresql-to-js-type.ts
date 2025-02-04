const postgresToJsType: Record<string, string> = {
  // Numeric Types
  "smallint": "number",
  "integer": "number",
  "bigint": "bigint",
  "decimal": "number", // Can be represented as a string to preserve precision
  "numeric": "number",
  "real": "number",
  "double precision": "number",
  "serial": "number",
  "bigserial": "bigint",
  
  // Boolean Type
  "boolean": "boolean",

  // Character Types
  "char": "string",
  "character": "string",
  "varchar": "string",
  "character varying": "string",
  "text": "string",

  // Date/Time Types
  "date": "date", // Usually represented as an ISO date string
  "time": "date", // Format: HH:MM:SS
  "time with time zone": "date",
  "time without time zone": "date",
  "timestamp": "string", // ISO string or Date object
  "timestamp with time zone": "date",
  "timestamp without time zone": "date",
  "interval": "string", // Interval is best represented as a string

  // UUID
  "uuid": "string",
};

export default postgresToJsType;
