import { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const DownloadAttendance = () => {
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  const handleDownload = async () => {
    if (!date) {
      setError("Please select a date.");
      return;
    }
    setError("");

    try {
      const response = await axios.get(
        `http://localhost:7000/download-attendance?date=${date}`,
        {
          responseType: "blob", // Ensure proper handling of binary data
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `attendance_${date}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Download Error:", err);
      setError("Failed to download the attendance file.");
    }
  };

  return (
    <div className="w-full h-screen bg-[#FEF9F0]">
      <Navbar />
      <div className="max-w-md mx-auto bg-[#FEF9F0] p-6 rounded-xl shadow-lg text-center">
        <h2 className="text-[30px] md:text-[50px] text-center font-bold my-10 text-[#560103]">
          Download Attendance
        </h2>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="px-4 py-2 border rounded-md w-64 md:w-80 mb-2 text-[24px]"
        />
        <button
          onClick={handleDownload}
          className="bg-red-800 text-[24px] w-full font-semibold text-white py-2 my-5 rounded-md"
        >
          Download CSV
        </button>
        <Link to={"/"}>
          <button className="bg-green-500 text-[24px] w-full font-semibold text-white py-2 my-3 rounded-md">
            Back
          </button>
        </Link>
        {error && <p className="text-red-500 mt-3">{error}</p>}
      </div>
    </div>
  );
};

export default DownloadAttendance;
