// import { useState } from "react";
// import axios from "axios";

// const StudentForm = () => {
//   const getCurrentDate = () => {
//     const today = new Date();
//     return today.toISOString().split("T")[0]; // YYYY-MM-DD format
//   };

//   const getCurrentTime = () => {
//     const now = new Date();
//     return now.toTimeString().split(" ")[0]; // HH:MM:SS format
//   };

//   // Individual states for each input
//   const [name, setName] = useState("");
//   const [surname, setSurname] = useState("");
//   const [age, setAge] = useState();
//   const [dateOfIncorporation, setDateOfIncorporation] = useState(
//     getCurrentDate()
//   );
//   const [attendance, setAttendance] = useState("Present");
//   const [intime, setIntime] = useState(getCurrentTime());

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = {
//       name,
//       surname,
//       age,
//       date_of_incorporation: dateOfIncorporation,
//       attendance,
//       intime,
//     };
//     console.log(formData);
//     try {
//       const response = await axios.post(
//         "http://localhost:7000/createstudent",
//         formData
//       );
//       alert(`Student ${response.data.name} added successfully!`);
//     } catch (error) {
//       console.error("Error adding student:", error);
//       alert("Failed to add student. Check the console for details.");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg">
//       <h2 className="text-xl font-bold mb-4">Register Student</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           placeholder="First Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="w-full border p-2 rounded"
//           required
//         />
//         <input
//           type="text"
//           placeholder="Surname"
//           value={surname}
//           onChange={(e) => setSurname(e.target.value)}
//           className="w-full border p-2 rounded"
//           required
//         />
//         <input
//           type="number"
//           placeholder="Age"
//           value={age}
//           onChange={(e) => setAge(e.target.value)}
//           className="w-full border p-2 rounded"
//           required
//         />
//         <input
//           type="date"
//           value={dateOfIncorporation}
//           onChange={(e) => setDateOfIncorporation(e.target.value)}
//           className="w-full border p-2 rounded"
//           required
//         />
//         <select
//           value={attendance}
//           onChange={(e) => setAttendance(e.target.value)}
//           className="w-full border p-2 rounded"
//           required
//         >
//           <option value="Present">Present</option>
//           <option value="Absent">Absent</option>
//         </select>
//         <input
//           type="time"
//           value={intime}
//           onChange={(e) => setIntime(e.target.value)}
//           className="w-full border p-2 rounded"
//           required
//         />
//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default StudentForm;
import { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const StudentForm = () => {
  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // YYYY-MM-DD format
  };

  const getCurrentTime = () => {
    const now = new Date();
    return now.toTimeString().split(" ")[0]; // HH:MM:SS format
  };

  // Individual states for each input
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [age, setAge] = useState("");
  const [dateOfIncorporation, setDateOfIncorporation] = useState(
    getCurrentDate()
  );
  const [attendance, setAttendance] = useState("Present");
  const [intime, setIntime] = useState(getCurrentTime());

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate age
    const parsedAge = parseInt(age, 10);
    if (isNaN(parsedAge) || parsedAge <= 0) {
      alert("Please enter a valid positive number for age.");
      return;
    }

    const formData = {
      name,
      surname,
      age: parsedAge, // Ensuring age is a number
      date_of_incorporation: dateOfIncorporation,
      attendance,
      intime,
    };

    console.log(formData);

    try {
      const response = await axios.post(
        "http://localhost:7000/createstudent",
        formData
      );
      alert(`Student ${response.data.name} added successfully!`);
    } catch (error) {
      console.error("Error adding student:", error);
      alert("Failed to add student. Check the console for details.");
    }
  };

  return (
    <div className="w-full h-screen bg-[#FEF9F0]">
      <Navbar />
      <div className="max-w-md mx-auto bg-[#FEF9F0] p-6 rounded-xl shadow-lg my-10">
        <h2 className="text-[30px] md:text-[40px] font-bold mb-4 text-center text-[#560103]">
          Register Student
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            className="w-full border p-2 rounded text-[20px]"
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
            className="w-full border p-2 rounded text-[20px]"
            required
          />
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                // Only allow numbers
                setAge(value);
              }
            }}
            className="w-full border p-2 rounded text-[20px]"
            required
          />
          <input
            type="date"
            value={dateOfIncorporation}
            onChange={(e) => setDateOfIncorporation(e.target.value)}
            className="w-full border p-2 rounded text-[20px]"
            required
          />
          <select
            value={attendance}
            onChange={(e) => setAttendance(e.target.value)}
            className="w-full border p-2 rounded text-[20px]"
            required
          >
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
          <input
            type="time"
            value={intime}
            onChange={(e) => setIntime(e.target.value)}
            className="w-full border p-2 rounded text-[20px]"
            required
          />
          <button
            type="submit"
            className="w-full bg-[#560103] text-white text-[20px] font-bold py-2 rounded hover:bg-opacity-80"
          >
            Submit
          </button>
        </form>
        <Link to={"/"}>
          <button className="w-full bg-green-500 my-5 text-white font-bold text-[20px] px-4 py-2 hover:bg-opacity-80">
            Back
          </button>
        </Link>
      </div>
    </div>
  );
};

export default StudentForm;
