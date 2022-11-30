import React, { useState } from "react";
import {
  HiOutlinePencilAlt,
  HiOutlineHashtag,
  HiOutlineMoon,
  HiOutlineSun,
} from "react-icons/hi";
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
        className={`w-full h-[40px] fixed flex justify-between items-center border ${
          isDarkMode ? "bg-[#0F182A] text-white" : "bg-white text-black"
        } z-20 `}
      >
        <div className="w-5/12 flex items-center justify-between mx-auto">
          <ul className="flex justify-between items-center">
            <li>
              <a href="/">Notes</a>
            </li>
          </ul>
          <ul className="flex items-center gap-2 text-xl">
            <li>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="text-xl text-[#7c72dc]"
              >
                {isDarkMode ? <HiOutlineMoon /> : <HiOutlineSun />}
              </button>
            </li>
            <li>
              <Link to="/new">
                <button className="text-xl">
                  <HiOutlinePencilAlt />
                </button>
              </Link>
            </li>
            <li>
              <button
                onClick={() => {
                  setShowModal(true);
                }}
                className="text-xl"
              >
                <HiOutlineHashtag />
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
