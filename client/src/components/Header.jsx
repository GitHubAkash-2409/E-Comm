import React from "react";
import Logo from "./Logo";
import { GrFormSearch } from "react-icons/gr";
import { HiMiniUserCircle } from "react-icons/hi2";
import { FaCartPlus } from "react-icons/fa";

const AppHeader = () => {
  return (
    <header className="h-16 shadow-md">
      <div className="h-full container mx-auto flex items-center px-2 justify-between">
        <div>
          <Logo w={75} h={45} />
        </div>

        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2">
          <input
            type="text"
            placeholder="search product here..."
            className="w-full outline-none"
          />
          <div className="text-white min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full">
            <GrFormSearch size={30} />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-3xl cursor-pointer">
            <HiMiniUserCircle />
          </div>

          <div className="text-2xl cursor-pointer relative">
            <span>
              <FaCartPlus />
            </span>

            <div className="bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
              <p className="text-sm">0</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;

///35  minute completed
