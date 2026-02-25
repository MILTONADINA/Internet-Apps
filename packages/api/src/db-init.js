require("dotenv").config();
const database = require("./database");

console.log("Initializing database tables...");

async function run() {
  try {
    await database.init();
    console.log("Database initialized successfully!");
  } catch (err) {
    console.error("Failed to initialize database:", err);
  } finally {
    process.exit(0);
  }
}

run();
