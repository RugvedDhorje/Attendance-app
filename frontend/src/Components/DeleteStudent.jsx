import { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

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
    <div className="bg-[#FEF9F0] h-screen ">
      <Navbar />
      <div className="flex flex-col items-center p-6 ">
        <h2 className="text-[30px] md:text-[50px] text-center font-bold my-10 text-[#560103]">
          Delete Student
        </h2>

        <input
          type="text"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          placeholder="Enter Student ID"
          className="px-4 py-2 border rounded-md w-64 md:w-80 mb-2 text-[24px]"
        />

        <button
          onClick={markAttendance}
          className="bg-red-800 text-[24px] font-semibold text-white px-5 py-2 my-5 rounded-md"
        >
          Delete Student
        </button>
        <Link to={"/"}>
          <button
            onClick={markAttendance}
            className="bg-green-600 text-[24px] font-semibold text-white px-6 py-2 my-3 rounded-md hover:bg-green-400"
          >
            Back
          </button>
        </Link>
        {error && <p className="text-red-500 mt-3">{error}</p>}
        {message && <p className="text-green-500 mt-3">{message}</p>}
      </div>
    </div>
  );
};

export default DeleteStudent;
