import { Routes, Route, Navigate } from "react-router-dom";
import NewNote from "./components/NewNote";
import { useLocalStorage } from "./useLocalStorage";
import { useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import NoteList from "./components/NoteList";
import { NoteLayout } from "./components/NoteLayout";
import Note from "./components/Note";
import EditNote from "./components/EditNote";
import Navbar from "./components/Navbar";
import Spinner from "./components/Spinner";
import ThemeContextWrapper from "./context/ThemeContextWrapper";

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
  const [loading, setloading] = useState<boolean>(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setloading(false);
    }, 2000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

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
        { ...data, id: uuidv4(), tagIds: tags.map((tag) => tag.id) },
        ...prevNotes,
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
    <ThemeContextWrapper>
      <main
        className="w-full min-h-screen box-border
          dark:bg-[#181818] dark:text-white bg-[#fff]"
      >
        {loading && <Spinner />}

        <div className="sticky top-5 z-40">
          <Navbar
            availableTags={tags}
            onUpdateTag={updateTag}
            onDeleteTag={deleteTag}
          />
        </div>

        <div className="w-full flex flex-col justify-center items-center px-2 py-10 md:p-10 lg:p-20">
          <Routes>
            <Route
              path="/"
              element={
                <NoteList
                  notes={notesWithTags}
                  availableTags={tags}
                  onUpdateTag={updateTag}
                  onDeleteTag={deleteTag}
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
                />
              }
            />
            <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
              <Route
                index
                element={
                  <Note onDeleteNote={onDeleteNote} />
                }
              />
              <Route
                path="edit"
                element={
                  <EditNote
                    onSubmit={onUpdateNote}
                    onAddTag={addTag}
                    availableTags={tags}
                  />
                }
              />
            </Route>
            {/* Redirect back home if it doesn't exist */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </main>
    </ThemeContextWrapper>
  );
}

export default App;
