import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Home = () => {
  return (
    <div className="w-full bg-[#FEF9F0] h-screen">
      <Navbar />
      <div className="w-full mx-auto">
        <div className="max-w-screen-2xl mx-auto">
          <h1 className="md:text-[50px] text-[40px] text-[#560103] font-bold text-center py-10">
            Attendance app
          </h1>
          <div className="w-full p-10 sm:flex sm:flex-wrap gap-y-5">
            <div className="md:w-1/2 w-full flex justify-center items-center my-4 md:my-0">
              <Link
                to={"/markAttendance"}
                className="w-full flex justify-center"
              >
                <button className="w-5/6 mx-auto text-center md:text-[30px] text-[24px] bg-[#8B0000] text-white font-semibold py-4 rounded-lg px-3">
                  Mark Attendance
                </button>
              </Link>
            </div>
            <div className="md:w-1/2 w-full flex justify-center items-center my-4 md:my-0">
              <Link
                to={"/createStudent"}
                className="w-full flex justify-center"
              >
                <button className="w-5/6 mx-auto text-center md:text-[30px] text-[24px] bg-[#8B0000] text-white font-semibold py-4 rounded-lg px-3">
                  Create Student
                </button>
              </Link>
            </div>
            <div className="md:w-1/2 w-full flex justify-center items-center my-4 md:my-0">
              <Link to={"/search"} className="w-full flex justify-center">
                <button className="w-5/6 mx-auto text-center md:text-[30px] text-[24px] bg-[#8B0000] text-white font-semibold py-4 rounded-lg px-3">
                  Search Student
                </button>
              </Link>
            </div>
            <div className="md:w-1/2 w-full  flex justify-center items-center my-4 md:my-0">
              <Link to={"/delete"} className="w-full flex justify-center">
                <button className="w-5/6 bg-[#8B0000] text-white mx-auto text-center md:text-[30px] text-[24px] font-semibold py-4 rounded-lg px-3">
                  Delete Student
                </button>
              </Link>
            </div>
            <div className="md:w-1/2 w-full  flex justify-center items-center my-4 md:my-0">
              <Link
                to={"/downloadAttendance"}
                className="w-full flex justify-center"
              >
                <button className="w-5/6 bg-[#8B0000] text-white mx-auto text-center md:text-[30px] text-[24px] font-semibold py-4 rounded-lg px-3">
                  Download Attendance
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
