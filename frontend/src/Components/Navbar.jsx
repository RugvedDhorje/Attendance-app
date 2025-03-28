import React from "react";

export default function Navbar() {
  return (
    <nav className="w-full mx-auto bg-[#8B0000]">
      <div className="max-w-screen-2xl mx-auto p-3 flex justify-between items-center px-5 md:px-[100px]">
        <div className="w-1/3">
          <img src="/RSSB logo nav.png" alt="rssb logo" className="w-14" />
        </div>
        <div className="w-2/3 md:text-center">
          <h2 className="md:text-[36px] text-[24px] tracking-wider text-white font-bold">
            Radha Soami Satsang Beas
          </h2>
        </div>
      </div>
    </nav>
  );
}
