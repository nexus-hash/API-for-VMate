const { Pool } = require("pg");
const pool = new Pool({
  connectionString:
    "postgres://odtjadrpczsruh:7095fc1946c353472111f800b930df3fb7665b7fe0fd5717c7af97cbb8ee6530@ec2-54-159-35-35.compute-1.amazonaws.com:5432/d1sbnkb6knbdkc",
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
