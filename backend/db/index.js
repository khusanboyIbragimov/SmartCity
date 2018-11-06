var pgp = require("pg-promise")({});
var connectionString = "postgres://localhost/db_smartcity";
var db = pgp(connectionString);

module.exports = db;
