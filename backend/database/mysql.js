import mysql from "mysql2/promise";

export const db = mysql.createPool({
    host: "localhost",
    user: "root",
    port: 3306,
    password: "asesino",
    database: "high_street_gym",
});

async function testDbConnection() {
    try {
        await db.getConnection();
        console.log("Connection succeeded in MySQL Workbench");
    } catch (err) {
        console.error("Connection failed", err);
    } finally {
        db.end(); // end the connection pool when done
    }
}

testDbConnection();
