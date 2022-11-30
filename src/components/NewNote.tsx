import React from "react";
import { NoteData, Tag } from "../App";
import NoteForm from "./NoteForm";

type NewNoteProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

const NewNote = ({ onSubmit, onAddTag, availableTags }: NewNoteProps) => {
  return (
    <section className="w-10/12 max-w-[1000px] h-screen mx-auto pt-20">
      <h1 className="text-3xl font-bold">New Note</h1>
      <NoteForm
        onSubmit={onSubmit}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </section>
  );
};

export default NewNote;
