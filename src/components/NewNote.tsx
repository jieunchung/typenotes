import React from "react";
import { NoteData } from "../App";
import NoteForm from "./NoteForm";

type Props = {
  onSubmit: (data: NoteData) => void;
};

const NewNote = ({ onSubmit }: Props) => {
  return (
    <section>
      <h1 className="text-3xl font-bold">New Note</h1>
      <NoteForm onSubmit={onSubmit} />
    </section>
  );
};

export default NewNote;
