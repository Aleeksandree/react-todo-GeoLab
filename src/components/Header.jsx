import React from "react";

const Header = () => {
  return (
    <div className="w-full bg-black h-[200px] relative">
      <div className="w-full max-w-[1440px] mx-auto flex items-center justify-center h-full">
        <h2 className="text-blue-500 font-bold text-[40px]">
          <span className="text-blue-300">to</span>do
        </h2>
      </div>
    </div>
  );
};

export default Header;
