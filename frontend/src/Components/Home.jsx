import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="w-full h-screen mx-auto bg-[#FEF9F0]">
        <div className="max-w-screen-2xl mx-auto">
          <h1 className="md:text-[50px] text-[36px] font-bold text-center py-10">
            Attendance app
          </h1>
          <div className="w-full p-10 sm:flex sm:flex-wrap gap-y-5">
            <div className="md:w-1/2 w-full flex justify-center items-center my-4 md:my-0">
              <Link
                to={"/markAttendance"}
                className="w-full flex justify-center"
              >
                <button className="w-5/6 mx-auto text-center md:text-[30px] text-[24px] bg-green-300 font-semibold py-4 rounded-lg px-3">
                  Mark Attendance
                </button>
              </Link>
            </div>
            <div className="md:w-1/2 w-full flex justify-center items-center my-4 md:my-0">
              <Link
                to={"/createStudent"}
                className="w-full flex justify-center"
              >
                <button className="w-5/6 mx-auto text-center md:text-[30px] text-[24px] bg-pink-400 font-semibold py-4 rounded-lg px-3">
                  Create Student
                </button>
              </Link>
            </div>
            <div className="md:w-1/2 w-full flex justify-center items-center my-4 md:my-0">
              <Link
                to={"/createStudent"}
                className="w-full flex justify-center"
              >
                <button className="w-5/6 mx-auto text-center md:text-[30px] text-[24px] bg-yellow-400 font-semibold py-4 rounded-lg px-3">
                  Search Student
                </button>
              </Link>
            </div>
            <div className="md:w-1/2 w-full  flex justify-center items-center my-4 md:my-0">
              <Link to={"/delete"} className="w-full flex justify-center">
                <button className="w-5/6 bg-red-300 mx-auto text-center md:text-[30px] text-[24px] font-semibold py-4 rounded-lg px-3">
                  Delete Student
                </button>
              </Link>
            </div>
            <div className="md:w-1/2 w-full  flex justify-center items-center my-4 md:my-0">
              <Link
                to={"/downloadAttendance"}
                className="w-full flex justify-center"
              >
                <button className="w-5/6 bg-blue-300 mx-auto text-center md:text-[30px] text-[24px] font-semibold py-4 rounded-lg px-3">
                  Download Attendance
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
