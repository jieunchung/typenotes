import React, { useState } from "react";
import { BsPencilSquare } from "react-icons/bs";
import { AiFillTag } from "react-icons/ai";
import { RiSunFill, RiMoonClearFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { Tag } from "../App";
import EditTagModal from "./EditTagModal";

type NavbarProps = {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  onUpdateTag: (id: string, label: string) => void;
  onDeleteTag: (id: string) => void;
  availableTags: Tag[];
};

const Navbar = ({
  isDarkMode,
  setIsDarkMode,
  onDeleteTag,
  onUpdateTag,
  availableTags,
}: NavbarProps) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <section>
      <nav
        className={`w-11/12 lg:w-8/12 xl:w-5/12 mx-auto h-12 md:h-16 rounded-full flex items-center border shadow ${
          isDarkMode
            ? "bg-[#262626] text-white border-[#1e1e1e]"
            : "bg-[#fff] text-black border-[#FDFDFE]"
        }`}
      >
        <div className="w-full flex items-center justify-between mx-6 md:mx-12">
          <ul className="flex justify-between items-center text-lg font-bold font-sans">
            <li>
              <a href="/">Typenotes</a>
            </li>
          </ul>
          <ul className={`flex items-center text-lg md:gap-2`}>
            <li>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`px-2 py-1 md:px-4 md:py-2 md:border rounded-lg hover:shadow hover:translate-y-1 transition duration-300 ${
                  isDarkMode
                    ? "border-[#101010] md:bg-[#181818] shadow-none md:shadow-[-6px_6px_0_0_rgb(15,15,15)]"
                    : "border-[#FDFDFE] shadow-none md:shadow-[-6px_6px_0_0_rgb(244,244,242)]"
                }`}
              >
                {isDarkMode ? <RiSunFill /> : <RiMoonClearFill />}
              </button>
            </li>
            <li>
              <Link to="/new">
                <button
                  className={`px-2 py-1 md:px-4 md:py-2 md:border rounded-lg hover:shadow hover:translate-y-1 transition duration-300 ${
                    isDarkMode
                      ? "border-[#101010] md:bg-[#181818] shadow-none md:shadow-[-6px_6px_0_0_rgb(15,15,15)]"
                      : "border-[#FDFDFE] shadow-none md:shadow-[-6px_6px_0_0_rgb(244,244,242)]"
                  }`}
                >
                  <BsPencilSquare />
                </button>
              </Link>
            </li>
            <li>
              <button
                onClick={() => {
                  setShowModal(true);
                }}
                className={`px-2 py-1 md:px-4 md:py-2 md:border rounded-lg hover:shadow hover:translate-y-1 transition duration-300 ${
                  isDarkMode
                    ? "border-[#101010] md:bg-[#181818] shadow-none md:shadow-[-6px_6px_0_0_rgb(15,15,15)]"
                    : "border-[#FDFDFE] shadow-none md:shadow-[-6px_6px_0_0_rgb(244,244,242)]"
                }`}
              >
                <AiFillTag className="rotate-[-90deg]" />
              </button>
            </li>
          </ul>
        </div>
      </nav>
      <EditTagModal
        availableTags={availableTags}
        showModal={showModal}
        setShowModal={setShowModal}
        onDeleteTag={onDeleteTag}
        onUpdateTag={onUpdateTag}
        isDarkMode={isDarkMode}
      />
    </section>
  );
};

export default Navbar;
