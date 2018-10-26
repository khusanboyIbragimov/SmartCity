var pgp = require("pg-promise")({});
var connectionString = "postgres://localhost/gulapp";
var db = pgp(connectionString);

module.exports = db;
