import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Note, Tag } from "../App";

type NoteListProps = {
  availableTags: Tag[];
  notes: Note[];
};

type SimplifiedNote = {
  tags: Tag[];
  title: string;
  id: string;
};

type EditTagModalProps = {
  availableTags: Tag[];
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const NoteList = ({ notes, availableTags }: NoteListProps) => {
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

const EditTagModal = ({
  availableTags,
  showModal,
  setShowModal,
}: EditTagModalProps) => {
  return (
    <section>
      {showModal ? (
        <>
          <article className="justify-center items-center flex fixed inset-0 z-50 outline-none focus:outline-none">
            {/* content */}
            <div className="border-0 rounded-lg shadow-lg flex flex-col w-full bg-white outline-none focus:outline-none max-w-xs">
              {/* header & close button */}
              <div className="flex items-center justify-between p-5 border-b border-solid border-slate-200">
                <h3 className="text-3xl font-semibold">Edit Tags</h3>
                <button
                  className="text-3xl background-transparent font-bold outline-none focus:outline-none "
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  &times;
                </button>
              </div>
              {/* tags */}
              <form className="flex flex-col my-2">
                {availableTags.map((tag) => (
                  <div
                    key={tag.id}
                    className="flex w-[100%] justify-between px-4"
                  >
                    <input
                      type="text"
                      value={tag.label}
                      className="my-2 p-1 text-slate-500"
                    />
                    <input
                      type="button"
                      value="&times;"
                      className="my-2 text-slate-500 border rounded-md px-3 py-1"
                    />
                  </div>
                ))}
              </form>
            </div>
          </article>
          <div className="opacity-60 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </section>
  );
};

export default NoteList;
