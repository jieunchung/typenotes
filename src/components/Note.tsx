import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useNote } from "./NoteLayout";
import ReactMarkdown from "react-markdown";
import {
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineArrowLeft,
} from "react-icons/hi";

type NoteProps = {
  onDeleteNote: (id: string) => void;
};

const Note = ({ onDeleteNote }: NoteProps) => {
  const note = useNote();
  const navigate = useNavigate();

  return (
    <section className="w-10/12 h-full max-w-[1000px] mx-auto mt-10">
      <section className="flex justify-between items-baseline mb-8">
        {/* title and tags */}
        <div className="flex flex-col justify-center">
          <h1 className="text-5xl mb-4">{note.title}</h1>
          <ul className="flex items-center gap-1">
            {note.tags.map((tag) => {
              return (
                <li className="border border-[##E6E6E6] bg-[#E6E6E6] px-3 py-1 rounded-sm text-sm">
                  {tag.label}
                </li>
              );
            })}
          </ul>
        </div>
        {/* edit, delete, back buttons */}
        <div className="flex gap-2 items-baseline">
          <Link to="/">
            <button className="text-2xl">
              <HiOutlineArrowLeft />
            </button>
          </Link>
          <Link to={`/${note.id}/edit`}>
            <button className="text-2xl">
              <HiOutlinePencil />
            </button>
          </Link>
          <button
            onClick={() => {
              onDeleteNote(note.id);
              navigate("/");
            }}
            className="text-2xl"
          >
            <HiOutlineTrash />
          </button>
        </div>
      </section>
      <ReactMarkdown className="prose">{note.markdown}</ReactMarkdown>
    </section>
  );
};

export default Note;
