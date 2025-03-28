import { useState } from "react";
import axios from "axios";

const DeleteStudent = () => {
  const [studentId, setStudentId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const markAttendance = async () => {
    if (!studentId.trim()) {
      setError("ID cannot be empty");
      setMessage("");
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:7000/deletstudent?id=${studentId}`
      );

      setMessage(
        `Successfully deleted ID: ${response.data.id} ${response.data.name} ${response.data.surname} `
      );
      setError("");
      setStudentId(" ");
    } catch (err) {
      setMessage("");
      setError(err.response?.data?.error || "Failed to mark attendance");
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 ">
      <h2 className="text-xl font-semibold mb-4">Delete Student</h2>

      <input
        type="text"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
        placeholder="Enter Student ID"
        className="px-4 py-2 border rounded-md w-64 mb-2"
      />

      <button
        onClick={markAttendance}
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
      >
        Delete Student
      </button>

      {error && <p className="text-red-500 mt-3">{error}</p>}
      {message && <p className="text-green-500 mt-3">{message}</p>}
    </div>
  );
};

export default DeleteStudent;
