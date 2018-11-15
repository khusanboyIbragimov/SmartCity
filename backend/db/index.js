var pgp = require("pg-promise")({});
// var connectionString = "postgres://localhost/db_smartcity";
var connectionString = process.env.DATABASE_URL;
var db = pgp(connectionString);

module.exports = db;
