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
    <section className="w-10/12 h-full mx-auto max-w-[1000px] pt-20">
      {/* title */}
      <h1 className="text-6xl font-bold">Your Notes</h1>
      {/* search title | tags */}
      <form className="pt-10">
        <fieldset className="grid grid-cols-2 gap-4 mb-4">
          <label className="flex flex-col">
            Title
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              type="text"
              className={`border border-[#272a2b] rounded-[4px] min-h-[38px] px-2 outline-0 ${
                isDarkMode && "bg-[#334155] border-white"
              }`}
            />
          </label>
          <label>
            Tags
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
            />
          </label>
        </fieldset>
      </form>
      {/* preview notes */}
      <section className="grid grid-cols-2 gap-4">
        {filteredNotes.map((note) => (
          <article
            key={note.id}
            className={`border border-[#272a2b] p-4 rounded-[4px] ${
              isDarkMode && "border-white"
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
      <header className="text-lg font-semibold text-center mb-2">
        {title}
      </header>
      <footer className="flex items-center justify-center gap-2 mb-2">
        {tags.map((tag) => {
          return (
            <div
              key={tag.id}
              className="border px-3 py-1 rounded-sm text-sm border-[#7c72dc] bg-[#7c72dc] text-white"
            >
              {tag.label}
            </div>
          );
        })}
      </footer>
    </Link>
  );
};

export default NoteList;
