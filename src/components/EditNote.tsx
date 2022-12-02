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
    <section className={`w-10/12 max-w-[750px] h-screen mx-auto p-10`}>
      <h1 className="text-5xl font-bold mb-10">Edit Note</h1>
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
