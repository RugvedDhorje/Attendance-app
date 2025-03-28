require("dotenv").config();
const express = require("express");
const cors = require("cors");
// const { Pool } = require("pg");
const bodyParser = require("body-parser");
const fs = require("fs");
const fastCsv = require("fast-csv");
const path = require("path");
const { validateStudentInput } = require("./middleware/auth");
const { pool } = require("./config/database");

const app = express();
const port = process.env.PORT || 7000;

// PostgreSQL Connection Pool
// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASS,
//   port: process.env.DB_PORT,
// });

app.use(cors());
app.use(bodyParser.json());

//API to CREATE a new student
app.post("/createstudent", validateStudentInput, async (req, res) => {
  const { name, surname, age, date_of_incorporation, attendance, intime } =
    req.body;
  try {
    const result = await pool.query(
      "INSERT INTO students (name, surname, age, date_of_incorporation, attendance, intime) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [name, surname, age, date_of_incorporation, attendance, intime]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// //API to UPDATE a student
// app.put("/students/:id", async (req, res) => {
//   const { id } = req.params;
//   const { name, surname, age, date_of_incorporation, attendance, intime } =
//     req.body;

//   try {
//     const result = await pool.query(
//       "UPDATE students SET name = $1, surname = $2, age = $3, date_of_incorporation = $4, attendance = $5, intime = $6 WHERE id = $7 RETURNING *",
//       [name, surname, age, date_of_incorporation, attendance, intime, id]
//     );

//     if (result.rows.length === 0) {
//       return res.status(404).json({ message: "Student not found" });
//     }

//     res.json(result.rows[0]);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

//API to mark attendance
app.put("/studentattendance", async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ error: "Date parameter is required" });
  }

  try {
    const result = await pool.query(
      "UPDATE students SET attendance = 'Present', date = CURRENT_DATE, intime = CURRENT_TIMESTAMP::time WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
});

// API to download csv file
app.get("/download-attendance", async (req, res) => {
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ error: "Date parameter is required" });
  }

  try {
    const result = await pool.query(
      `SELECT id, name, surname, age, date_of_incorporation, attendance, intime, date 
           FROM students WHERE date = $1`,
      [date]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "No records found for this date" });
    }

    const sanitizedDate = date.trim(); // Remove any unwanted spaces/newlines
    const csvFilePath = path.join(__dirname, `attendance_${sanitizedDate}.csv`);

    // Ensure directory exists
    if (!fs.existsSync(__dirname)) {
      fs.mkdirSync(__dirname, { recursive: true });
    }

    const writeStream = fs.createWriteStream(csvFilePath);
    const csvStream = fastCsv.format({ headers: true });

    csvStream.pipe(writeStream);
    result.rows.forEach((row) => csvStream.write(row));
    csvStream.end();

    writeStream.on("finish", () => {
      res.download(csvFilePath, `attendance_${sanitizedDate}.csv`, (err) => {
        if (err) {
          console.error("Download Error:", err);
          res.status(500).json({ error: "Error downloading the file" });
        }
        fs.unlinkSync(csvFilePath); // Delete file after sending
      });
    });

    writeStream.on("error", (err) => {
      console.error("WriteStream Error:", err);
      res.status(500).json({ error: "Error writing CSV file" });
    });
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// API to search user by name
app.get("/search-student", async (req, res) => {
  const { name, surname } = req.query; // Use query parameters for GET request

  if (!name || !surname) {
    return res.status(400).json({ error: "Name and surname are required" });
  }

  try {
    const result = await pool.query(
      "SELECT * FROM students WHERE name = $1 AND surname = $2",
      [name, surname]
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ error: "No records found for this name and surname" });
    }

    res.status(200).json(result.rows); // Return the found records
  } catch (error) {
    res.status(500).json({ error: error.message }); // Correct error handling
  }
});

//API to DELETE a student
app.delete("/deletstudent", async (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: "Date parameter is required" });
  }

  try {
    const result = await pool.query(
      "DELETE FROM students WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
