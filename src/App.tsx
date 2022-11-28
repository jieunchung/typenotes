import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import NewNote from "./components/NewNote";

export type Note = {
  id: string
} & NoteData

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
  return (
    <main className="m-4">
      <Routes>
        <Route path="/" element={<h1>home</h1>} />
        <Route path="new" element={<NewNote />} />
        <Route path="/:id">
          <Route index element={<h1>show</h1>} />
          <Route path="edit" element={<h1>edit</h1>} />
        </Route>
        {/* Redirect back home if it doesn't exist */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </main>
  );
}

export default App;
