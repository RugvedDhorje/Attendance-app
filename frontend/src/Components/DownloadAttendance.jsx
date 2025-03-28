import { useState } from "react";
import axios from "axios";

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
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg text-center">
      <h2 className="text-xl font-bold mb-4">Download Attendance</h2>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      />
      <button
        onClick={handleDownload}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Download CSV
      </button>
      {error && <p className="text-red-500 mt-3">{error}</p>}
    </div>
  );
};

export default DownloadAttendance;
