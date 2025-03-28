import { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const SearchStudent = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!name.trim() || !surname.trim()) {
      setError("Both name and surname are required.");
      setStudentData(null);
      return;
    }

    try {
      const response = await axios.get("http://localhost:7000/search-student", {
        params: { name, surname }, // Use params for GET request
      });

      setStudentData(response.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "Error fetching student data");
      setStudentData(null);
    }
  };

  return (
    <div className="w-full h-screen bg-[#FEF9F0]">
      <Navbar />
      <div className="max-w-lg mx-auto p-6 my-10 bg-[#FEF9F0] shadow-lg rounded-lg">
        <h2 className="text-[30px] md:text-[40px] font-bold mb-4 text-center text-[#560103]">
          Search Student
        </h2>

        <input
          type="text"
          placeholder="First Name"
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
                .toLowerCase() // Convert everything to lowercase first
                .replace(/\b\w/g, (char) => char.toUpperCase()) // Capitalize first letter of each word
            )
          }
          className="w-full border p-2 rounded text-[20px] my-2"
          required
        />
        <input
          type="text"
          placeholder="Surname"
          value={surname}
          onChange={(e) =>
            setSurname(
              e.target.value
                .toLowerCase() // Convert everything to lowercase first
                .replace(/\b\w/g, (char) => char.toUpperCase()) // Capitalize first letter of each word
            )
          }
          className="w-full border p-2 rounded text-[20px] my-2"
          required
        />
        <button
          onClick={handleSearch}
          className="w-full bg-[#560103] text-white text-[20px] font-bold py-2 mt-4 rounded hover:bg-opacity-80"
        >
          {" "}
          Search
        </button>
        <Link to={"/"}>
          <button className="w-full bg-green-500 my-5 text-white font-bold text-[20px] px-4 py-2 hover:bg-opacity-80">
            Back
          </button>
        </Link>

        {error && <p className="text-red-500 mt-3">{error}</p>}

        {studentData && (
          <div className="mt-4 p-4 rounded bg-[#FEF9F0] border-[2px] border-[#560103]">
            <h3 className="font-semibold text-[24px] mb-4 text-center text-[#560103]">
              Student Information
            </h3>
            <p className="text-[20px] text-[#560103]">
              <strong>Name:</strong> {studentData[0].name}{" "}
              {studentData[0].surname}
            </p>
            <p className="text-[20px] text-[#560103]">
              <strong>Age:</strong> {studentData[0].age}
            </p>
            <p className="text-[20px] text-[#560103]">
              <strong>Attendance:</strong> {studentData[0].attendance}
            </p>
            <p className="text-[20px] text-[#560103]">
              <strong>Incorporation Date:</strong>{" "}
              {studentData[0].date_of_incorporation}
            </p>
            <p className="text-[20px] text-[#560103]">
              <strong>Intime:</strong> {studentData[0].intime}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchStudent;
