import { Link, useNavigate } from "react-router-dom";
import { useNote } from "./NoteLayout";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { AiFillTag } from "react-icons/ai";
import {
  RiArrowLeftSLine,
  RiEditCircleLine,
  RiCloseLine,
} from "react-icons/ri";

type NoteProps = {
  onDeleteNote: (id: string) => void;
};

const Note = ({ onDeleteNote }: NoteProps) => {
  const note = useNote();
  const navigate = useNavigate();

  return (
    <section
      className="w-full md:w-10/12 h-full max-w-[750px] mx-auto p-4 md:p-10 m-10 border rounded-xl
          dark:border-[#1e1e1e] dark:bg-[#262626] dark:shadow-[0_1px_3px_0_rgb(30,30,30)]
          border-[#FDFDFE] shadow"
    >
      <section className="flex flex-col justify-center items-center mb-4 md:mb-8">
        {/* title and tags */}
        <div className="flex flex-col justify-center items-center w-full">
          <h4 className="text-indigo-400 font-bold lg:text-xl mb-2">
            Welcome to your typed note
          </h4>
          <h1 className="text-4xl md:text-6xl mb-4 main-text font-black text-center">
            {note.title}
          </h1>
          <footer className="w-full text-gray-400 text-center overflow-x-scroll scrollbar-hide whitespace-nowrap mb-8">
            {note.tags.map((tag) => {
              return (
                <div
                  key={tag.id}
                  className="text-sm body-text text-center inline-block mx-[2px]"
                >
                  <AiFillTag className="rotate-[-90deg] inline" />
                  {tag.label}
                </div>
              );
            })}
          </footer>
        </div>

        {/* edit, delete, back buttons */}
        <div
          className="flex items-center text-base md:text-xl leading-3 border rounded-lg px-1 py-2 mb-1 md:mr-1
              dark:border-[#101010] dark:bg-[#181818] dark:shadow-[0_1px_2px_-1px_rgb(15,15,15)]
              border-[#FDFDFE] shadow"
        >
          <Link to="/">
            <button className="px-3 py-1 flex justify-center items-center text-xs md:text-sm text-gray-400 hover:text-inherit">
              <RiArrowLeftSLine /> Back
            </button>
          </Link>
          <Link to={`/${note.id}/edit`}>
            <button
              className="border-l px-3 py-1 flex justify-center items-center text-xs md:text-sm text-gray-400 hover:text-inherit
                  dark:border-[#101010] dark:bg-[#181818]
                  border-[#efeded]"
            >
              <RiEditCircleLine />
              Edit
            </button>
          </Link>
          <button
            onClick={() => {
              onDeleteNote(note.id);
              navigate("/");
            }}
            className="border-l px-3 py-1 flex justify-center items-center text-xs md:text-sm text-gray-400 hover:text-inherit
              dark:border-[#101010] dark:bg-[#181818] border-[#efeded]"
          >
            <RiCloseLine /> Delete
          </button>
        </div>
      </section>

      <hr className="mb-6" />
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        className="prose body-text max-w-full dark:prose-invert"
      >
        {note.markdown}
      </ReactMarkdown>
    </section>
  );
};

export default Note;
