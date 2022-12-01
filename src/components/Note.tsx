import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useNote } from "./NoteLayout";
import ReactMarkdown from "react-markdown";
import { HiTrash } from "react-icons/hi";

import { RiEdit2Fill, RiArrowGoBackFill } from "react-icons/ri";

type NoteProps = {
  onDeleteNote: (id: string) => void;
  isDarkMode: boolean;
};

const Note = ({ onDeleteNote, isDarkMode }: NoteProps) => {
  const note = useNote();
  const navigate = useNavigate();

  return (
    <section
      className={`w-10/12 h-full max-w-[1000px] mx-auto p-10 m-10 shadow ${
        isDarkMode
          ? "bg-[#262626] text-white"
          : "bg-white text-black border border-[#FDFDFE]"
      }`}
    >
      <section className="flex justify-between items-baseline mb-8">
        {/* title and tags */}
        <div className="flex flex-col justify-center">
          <h1 className="text-5xl mb-4 font-sans">{note.title}</h1>
          <ul className="flex items-center gap-2 font-serif">
            {note.tags.map((tag) => {
              return (
                <li key={tag.id} className="py-1 text-sm">
                  #{tag.label}
                </li>
              );
            })}
          </ul>
        </div>

        {/* edit, delete, back buttons */}
        <div
          className={`flex items-center text-xl leading-3 border rounded-lg px-1 shadow ${
            isDarkMode ? "border-black bg-[#181818]" : "border-[#FDFDFE]"
          }`}
        >
          <Link to="/">
            <button className="text-lg px-3 py-1">
              <RiArrowGoBackFill />
            </button>
          </Link>
          <Link to={`/${note.id}/edit`}>
            <button
              className={`border-l px-3 py-1 ${
                isDarkMode ? "border-black bg-[#181818]" : "border-[#efeded]"
              }`}
            >
              <RiEdit2Fill />
            </button>
          </Link>
          <button
            onClick={() => {
              onDeleteNote(note.id);
              navigate("/");
            }}
            className={`border-l px-3 py-1 ${
              isDarkMode ? "border-black bg-[#181818]" : "border-[#efeded]"
            }`}
          >
            <HiTrash />
          </button>
        </div>
      </section>
      <hr className="mb-6" />
      <ReactMarkdown className={`prose font-sans ${isDarkMode && "prose-invert"}`}>
        {note.markdown}
      </ReactMarkdown>
    </section>
  );
};

export default Note;
