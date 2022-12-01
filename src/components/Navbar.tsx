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
        className={`w-full h-[60px] flex justify-between items-center border border-transparent font-serif ${
          isDarkMode ? "bg-[#262626] text-white" : "bg-white text-black"
        } z-20 `}
      >
        <div className="w-6/12 flex items-center justify-between mx-auto">
          <ul className="flex justify-between items-center">
            <li>
              <a href="/">Notes</a>
            </li>
          </ul>
          <ul
            className={`flex items-center text-xl leading-3 border rounded-lg shadow ${
              isDarkMode ? "border-black bg-[#181818]" : "border-[#FDFDFE]"
            }`}
          >
            <li>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="px-3 py-1"
              >
                {isDarkMode ? <RiSunFill /> : <RiMoonClearFill />}
              </button>
            </li>
            <li>
              <Link to="/new">
                <button
                  className={`border-l px-3 py-1 ${
                    isDarkMode
                      ? "border-black bg-[#181818]"
                      : "border-[#efeded]"
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
                className={`border-l px-3 py-1 ${
                  isDarkMode ? "border-black bg-[#181818]" : "border-[#efeded]"
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
