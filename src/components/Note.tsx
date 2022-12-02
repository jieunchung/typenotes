import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useNote } from "./NoteLayout";
import ReactMarkdown from "react-markdown";
import { AiFillTag } from "react-icons/ai";
import { TfiPencil, TfiTrash } from "react-icons/tfi";
import { RiArrowGoBackFill } from "react-icons/ri";

type NoteProps = {
  onDeleteNote: (id: string) => void;
  isDarkMode: boolean;
};

const Note = ({ onDeleteNote, isDarkMode }: NoteProps) => {
  const note = useNote();
  const navigate = useNavigate();

  return (
    <section
      className={`w-full md:w-10/12 h-full max-w-[750px] mx-auto p-4 md:p-10 m-10 border rounded-xl ${
        isDarkMode
          ? "border-[#1e1e1e] bg-[#262626] shadow-[0_1px_3px_0_rgb(30,30,30)]"
          : "border-[#FDFDFE] shadow"
      }`}
    >
      <section className="flex flex-col md:flex-row justify-between items-center md:items-baseline mb-4 md:mb-8 overflow-scroll scrollbar-hide">
        {/* title and tags */}
        <div className="flex flex-col justify-center items-center md:items-start">
          <h1 className="text-3xl sm:text-4xl md:text-5xl mb-4 font-sans font-extrabold">
            {note.title}
          </h1>
          <footer className="flex items-center md:justify-center mb-4 gap-1 md:gap-2 overflow-scroll scrollbar-hide">
            {note.tags.map((tag) => {
              return (
                <div
                  key={tag.id}
                  className="text-xs md:text-sm font-serif flex items-center justify-center mx-auto md:mx-0"
                >
                  <AiFillTag className="rotate-[-90deg]" />
                  {tag.label}
                </div>
              );
            })}
          </footer>
        </div>

        {/* edit, delete, back buttons */}
        <div
          className={`flex items-center text-base md:text-xl leading-3 border rounded-lg px-1 mb-1 md:mr-1 ${
            isDarkMode
              ? "border-[#101010] bg-[#181818] shadow-[0_1px_2px_-1px_rgb(15,15,15)]"
              : "border-[#FDFDFE] shadow"
          }`}
        >
          <Link to="/">
            <button className="px-3 py-1">
              <RiArrowGoBackFill className="hover:scale-125 transition duration-150" />
            </button>
          </Link>
          <Link to={`/${note.id}/edit`}>
            <button
              className={`border-l px-3 py-1 ${
                isDarkMode
                  ? "border-[#101010] bg-[#181818]"
                  : "border-[#efeded]"
              }`}
            >
              <TfiPencil className="hover:scale-125 transition duration-150" />
            </button>
          </Link>
          <button
            onClick={() => {
              onDeleteNote(note.id);
              navigate("/");
            }}
            className={`border-l px-3 py-1 ${
              isDarkMode ? "border-[#101010] bg-[#181818]" : "border-[#efeded]"
            }`}
          >
            <TfiTrash className="hover:scale-125 transition duration-150" />
          </button>
        </div>
      </section>

      <hr className="mb-6" />
      <ReactMarkdown
        className={`prose font-sans ${isDarkMode && "prose-invert"}`}
      >
        {note.markdown}
      </ReactMarkdown>
    </section>
  );
};

export default Note;
