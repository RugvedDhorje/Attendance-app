const { pool } = require("../config/database");

const validateStudentInput = async (req, res, next) => {
  const { name, surname, age, date_of_incorporation, attendance, intime } =
    req.body;

  // Trim input to remove spaces
  if (
    !name.trim() ||
    !surname.trim() ||
    !date_of_incorporation.trim() ||
    !attendance.trim()
  ) {
    return res
      .status(400)
      .json({ error: "Fields cannot be empty or contain only spaces." });
  }

  // Age validation (must be a valid number and positive)
  if (!Number.isInteger(age) || age <= 0) {
    return res
      .status(400)
      .json({ error: "Age must be a valid positive number." });
  }

  // Attendance validation (only "Present" or "Absent")
  if (attendance !== "Present" && attendance !== "Absent") {
    return res
      .status(400)
      .json({ error: 'Attendance must be either "Present" or "Absent".' });
  }

  // If attendance is "Present", intime must be a valid time
  if (attendance === "Present") {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/; // Matches HH:MM:SS format
    if (!timeRegex.test(intime)) {
      return res
        .status(400)
        .json({ error: 'Intime must be in "HH:MM:SS" format when Present.' });
    }
  } else {
    // If "Absent", intime must be "00:00:00"
    if (intime !== "00:00:00") {
      return res
        .status(400)
        .json({ error: 'Intime must be "00:00:00" when Absent.' });
    }
  }
  // Check for duplicate user registration
  const existingUser = await pool.query(
    "SELECT * FROM students WHERE name = $1 AND surname = $2",
    [name, surname]
  );

  if (existingUser.rows.length > 0) {
    return res
      .status(400)
      .json({ error: "User with this name and surname already exists." });
  }

  // If all validations pass, move to next middleware or route handler
  next();
};

module.exports = { validateStudentInput };
