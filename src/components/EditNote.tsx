import React from "react";
import { NoteData, Tag } from "../App";
import NoteForm from "./NoteForm";
import { useNote } from "./NoteLayout";

type EditNoteProps = {
  onSubmit: (id: string, { tags, ...data }: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
  isDarkMode: boolean;
};

const EditNote = ({
  onSubmit,
  onAddTag,
  availableTags,
  isDarkMode,
}: EditNoteProps) => {
  const note = useNote();
  return (
    <section
      className={`w-full md:w-10/12 max-w-[750px] h-screen mx-auto p-4 md:p-10`}
    >
      <div>
        <h4 className="font-bold text-indigo-400">
          Anything else on your mind?
        </h4>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 md:mb-10">
          Retype a note
        </h1>
      </div>
      <NoteForm
        title={note.title}
        markdown={note.markdown}
        tags={note.tags}
        onSubmit={(data) => onSubmit(note.id, data)}
        onAddTag={onAddTag}
        availableTags={availableTags}
        isDarkMode={isDarkMode}
      />
    </section>
  );
};

export default EditNote;
