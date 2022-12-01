import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Note, Tag } from "../App";
import { customStyles, customStylesDark } from "./Select";

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
    <section className="w-10/12 min-h-screen max-w-[1000px] p-10">
      <div className="grid grid-cols-2 items-center mb-10">
        {/* title */}
        <h1 className={`text-6xl font-extrabold font-sans`}>View Notes</h1>
        {/* search title | tags */}
        <form className="pt-10">
          <fieldset className="grid grid-cols-2 gap-4 mb-4 font-serif text-sm">
            <label className="flex flex-col">
              Title
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                type="text"
                className={`border shadow rounded-[4px] min-h-[30px] px-2 outline-0 ${
                  isDarkMode ? "bg-[#222021] border-black" : "border-[#FDFDFE]"
                }`}
              />
            </label>
            <label>
              Tags
              <ReactSelect
                isMulti
                placeholder=""
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
              />
            </label>
          </fieldset>
        </form>
      </div>
      {/* preview notes */}
      <section className="grid grid-cols-2 gap-4 box-border">
        {filteredNotes.map((note) => (
          <article
            key={note.id}
            className={`border bg-white p-4 rounded-xl shadow hover:shadow-lg transition duration-300 ${
              isDarkMode ? "bg-[#262626] border-black" : "border-[#FDFDFE]"
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
      <header className="text-lg font-semibold text-center mb-4 font-sans">
        {title}
      </header>
      <footer className="flex items-center justify-center mb-2 gap-1">
        {tags.map((tag) => {
          return (
            <div key={tag.id} className="text-xs font-serif">
              #{tag.label}
            </div>
          );
        })}
      </footer>
    </Link>
  );
};

export default NoteList;
