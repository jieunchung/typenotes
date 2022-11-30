import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Note, Tag } from "../App";
import EditTagModal from "./EditTagModal";

type NoteListProps = {
  availableTags: Tag[];
  notes: Note[];
  onUpdateTag: (id: string, label: string) => void;
  onDeleteTag: (id: string) => void;
};

type SimplifiedNote = {
  tags: Tag[];
  title: string;
  id: string;
};

const NoteList = ({
  notes,
  availableTags,
  onUpdateTag,
  onDeleteTag,
}: NoteListProps) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");
  const [showModal, setShowModal] = useState(false);

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
    <section>
      {/* title && buttons */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Notes</h1>
        <div className="flex gap-x-2">
          <Link to="/new">
            <button className="border border-[#d1cfcf] py-2 px-4 rounded-[4px]">
              Create
            </button>
          </Link>
          <button
            onClick={() => {
              setShowModal(true);
            }}
            className="border border-[#d1cfcf] py-2 px-4 rounded-[4px]"
          >
            Edit Tags
          </button>
        </div>
      </div>
      {/* search title | tags */}
      <form className="mt-10">
        <fieldset className="grid grid-cols-2 gap-2 mb-4">
          <label className="flex flex-col">
            Title
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              type="text"
              className="border border-[#d1cfcf] rounded-[4px] min-h-[38px]"
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
            />
          </label>
        </fieldset>
      </form>
      {/* preview notes */}
      <section className="grid grid-cols-2 gap-2">
        {filteredNotes.map((note) => (
          <article
            key={note.id}
            className="border border-[#d1cfcf] p-4 rounded-[4px]"
          >
            <NotePreview id={note.id} title={note.title} tags={note.tags} />
          </article>
        ))}
      </section>
      <EditTagModal
        availableTags={availableTags}
        showModal={showModal}
        setShowModal={setShowModal}
        onDeleteTag={onDeleteTag}
        onUpdateTag={onUpdateTag}
      />
    </section>
  );
};

const NotePreview = ({ id, title, tags }: SimplifiedNote) => {
  return (
    <Link to={`/${id}`}>
      <header className="text-lg font-semibold text-center">{title}</header>
      <footer className="flex items-center justify-center gap-1">
        {tags.map((tag) => {
          return (
            <div
              key={tag.id}
              className="border border-[#d1cfcf] px-2 py-1 rounded-lg text-sm"
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
