import { Routes, Route, Navigate } from "react-router-dom";
import NewNote from "./components/NewNote";
import { useLocalStorage } from "./useLocalStorage";
import { useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import NoteList from "./components/NoteList";
import { NoteLayout } from "./components/NoteLayout";
import Note from "./components/Note";
import EditNote from "./components/EditNote";
import Navbar from "./components/Navbar";

export type RawNote = {
  id: string;
} & RawNoteData;

export type RawNoteData = {
  title: string;
  markdown: string;
  tagIds: string[];
};

export type Note = {
  id: string;
} & NoteData;

export type NoteData = {
  title: string;
  tags: Tag[];
  markdown: string;
};

export type Tag = {
  id: string;
  label: string;
};

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      };
    });
  }, [notes, tags]);

  const onCreateNote = ({ tags, ...data }: NoteData) => {
    setNotes((prevNotes) => {
      return [
        ...prevNotes,
        { ...data, id: uuidv4(), tagIds: tags.map((tag) => tag.id) },
      ];
    });
  };

  const onUpdateNote = (id: string, { tags, ...data }: NoteData) => {
    setNotes((prevNotes) => {
      return prevNotes.map((note) => {
        if (note.id === id) {
          return { ...note, ...data, tagIds: tags.map((tag) => tag.id) };
        } else {
          return note;
        }
      });
    });
  };

  const onDeleteNote = (id: string) => {
    setNotes((prevNotes) => {
      return prevNotes.filter((note) => note.id !== id);
    });
  };

  const addTag = (tag: Tag) => {
    setTags((prev) => [...prev, tag]);
  };

  const updateTag = (id: string, label: string) => {
    setTags((prevTags) => {
      return prevTags.map((tag) => {
        if (tag.id === id) {
          return { ...tag, label };
        } else {
          return tag;
        }
      });
    });
  };

  const deleteTag = (id: string) => {
    setTags((prevTags) => {
      return prevTags.filter((tag) => tag.id !== id);
    });
  };

  return (
    <main
      className={`w-full min-h-screen box-border transition duration-150 ${
        isDarkMode ? "bg-[#181818] text-white" : "bg-[#fff]"
      }`}
    >
      <div className="sticky top-5 z-50">
        <Navbar
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          availableTags={tags}
          onUpdateTag={updateTag}
          onDeleteTag={deleteTag}
        />
      </div>
      <div className="flex flex-col justify-center items-center p-20">
        <Routes>
          <Route
            path="/"
            element={
              <NoteList
                notes={notesWithTags}
                availableTags={tags}
                onUpdateTag={updateTag}
                onDeleteTag={deleteTag}
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
              />
            }
          />
          <Route
            path="new"
            element={
              <NewNote
                onSubmit={onCreateNote}
                onAddTag={addTag}
                availableTags={tags}
                isDarkMode={isDarkMode}
              />
            }
          />
          <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
            <Route
              index
              element={
                <Note onDeleteNote={onDeleteNote} isDarkMode={isDarkMode} />
              }
            />
            <Route
              path="edit"
              element={
                <EditNote
                  onSubmit={onUpdateNote}
                  onAddTag={addTag}
                  availableTags={tags}
                  isDarkMode={isDarkMode}
                />
              }
            />
          </Route>
          {/* Redirect back home if it doesn't exist */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </main>
  );
}

export default App;
