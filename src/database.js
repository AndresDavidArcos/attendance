const {Pool} = require("pg");

const pool = new Pool({
    user: "postgres",
    password: "kamarex2002",
    host: "localhost",
    database: "attendancebd",
    port: "5432"

});

module.exports = pool;