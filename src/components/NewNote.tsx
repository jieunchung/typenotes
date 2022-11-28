import React from "react";
import NoteForm from "./NoteForm";

const NewNote = () => {
  return (
    <section>
      <h1 className="text-3xl font-bold">New Note</h1>
      <NoteForm />
    </section>
  );
};

export default NewNote;
