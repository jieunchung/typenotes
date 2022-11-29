import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useNote } from "./NoteLayout";
import ReactMarkdown from "react-markdown";

type NoteProps = {
  onDeleteNote: (id: string) => void;
};

const Note = ({ onDeleteNote }: NoteProps) => {
  const note = useNote();
  const navigate = useNavigate();

  return (
    <section>
      <section className="flex justify-between items-center mb-8">
        {/* title and tags */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl mb-2">{note.title}</h1>
          <ul className="flex items-center gap-1">
            {note.tags.map((tag) => {
              return (
                <li className="border border-[#d1cfcf] px-2 py-1 rounded-lg text-sm">
                  {tag.label}
                </li>
              );
            })}
          </ul>
        </div>
        {/* edit, delete, back buttons */}
        <div className="flex gap-x-2">
          <Link to={`/${note.id}/edit`}>
            <button className="border border-[#d1cfcf] py-1 px-2 rounded-[4px]">
              Edit
            </button>
          </Link>
          <button
            onClick={() => {
              onDeleteNote(note.id);
              navigate("/");
            }}
            className="border border-[#d1cfcf] py-1 px-2 rounded-[4px]"
          >
            Delete
          </button>
          <Link to="/">
            <button className="border border-[#d1cfcf] py-1 px-2 rounded-[4px]">
              Back
            </button>
          </Link>
        </div>
      </section>
      <ReactMarkdown className="prose">{note.markdown}</ReactMarkdown>
    </section>
  );
};

export default Note;
