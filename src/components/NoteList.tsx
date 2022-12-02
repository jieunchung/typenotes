import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Note, Tag } from "../App";
import { customStyles, customStylesDark } from "./Select";
import { AiFillTag } from "react-icons/ai";

type NoteListProps = {
  availableTags: Tag[];
  notes: Note[];
  onUpdateTag: (id: string, label: string) => void;
  onDeleteTag: (id: string) => void;
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

type SimplifiedNote = {
  tags: Tag[];
  title: string;
  id: string;
};

const NoteList = ({ notes, availableTags, isDarkMode }: NoteListProps) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === "" ||
          //show the notes with matching titles
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        //loop through all of our selected tags.
        (selectedTags.length === 0 ||
          //make sure that every single one returns true for the statement
          selectedTags.every((tag) =>
            //check our note to see if it has all the tags that we're looping through.
            note.tags.some((noteTag) => noteTag.id === tag.id)
          ))
      );
    });
  }, [title, selectedTags, notes]);

  return (
    <section className="w-full md:w-10/12 min-h-screen max-w-[1000px] py-6 px-2 lg:p-10">
      <div className="flex flex-col lg:grid lg:grid-cols-2 items-center mb-10">
        {/* title */}
        <h1
          className={`text-4xl md:text-5xl lg:text-6xl font-extrabold font-sans`}
        >
          Typed notes
        </h1>
        {/* search title | tags */}
        <form className="pt-10 w-full">
          <fieldset className="flex flex-col gap-2 mb-4 font-serif text-sm">
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              type="text"
              placeholder="Search title"
              className={`border shadow rounded-[4px] min-h-[35px] px-2 outline-0 ${
                isDarkMode
                  ? "bg-[#262626] border-[#1e1e1e]"
                  : "border-[#FDFDFE] bg-[#fff]"
              }`}
            />
            <ReactSelect
              isMulti
              value={selectedTags.map((tag) => {
                return { label: tag.label, value: tag.id };
              })}
              options={availableTags.map((tag) => {
                return { label: tag.label, value: tag.id };
              })}
              onChange={(newTags) =>
                setSelectedTags(
                  newTags.map((tag) => {
                    return { label: tag.label, id: tag.value };
                  })
                )
              }
              styles={isDarkMode ? customStylesDark : customStyles}
              placeholder="Search tags"
            />
          </fieldset>
        </form>
      </div>
      {/* preview notes */}
      <section className="flex flex-col md:grid grid-cols-2 gap-4 box-border">
        {filteredNotes.map((note) => (
          <article
            key={note.id}
            className={`border bg-white p-4 rounded-xl transition duration-300 ${
              isDarkMode
                ? "bg-[#262626] border-[#1e1e1e] shadow-[0_1px_3px_0_rgb(10,10,10)] hover:shadow-[0_10px_15px_-3px_rgb(10,10,10)]"
                : "border-[#FDFDFE] shadow hover:shadow-lg"
            }`}
          >
            <NotePreview id={note.id} title={note.title} tags={note.tags} />
          </article>
        ))}
      </section>
    </section>
  );
};

const NotePreview = ({ id, title, tags }: SimplifiedNote) => {
  return (
    <Link to={`/${id}`}>
      <header className="text-base md:text-lg text-center mb-4 font-sans font-extrabold">
        {title}
      </header>
      <footer className="flex items-center md:justify-center mb-2 gap-1 md:gap-2 overflow-scroll scrollbar-hide">
        {tags.map((tag) => {
          return (
            <div
              key={tag.id}
              className="text-xs font-serif flex items-center justify-center mx-auto md:mx-0"
            >
              <AiFillTag className="rotate-[-90deg]" />
              {tag.label}
            </div>
          );
        })}
      </footer>
    </Link>
  );
};

export default NoteList;
