import { NoteData, Tag } from "../App";
import NoteForm from "./NoteForm";

type NewNoteProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

const NewNote = ({
  onSubmit,
  onAddTag,
  availableTags,
}: NewNoteProps) => {
  return (
    <section
      className="w-full h-full md:w-10/12 max-w-[750px] mx-auto p-4 md:p-10"
    >
      <div>
        <h4 className="text-indigo-400 font-bold lg:text-xl">
          What's on your mind?
        </h4>
        <h1 className="text-4xl md:text-6xl font-black mb-5 md:mb-10">
          Type a note
        </h1>
      </div>
      <NoteForm
        onSubmit={onSubmit}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </section>
  );
};

export default NewNote;
