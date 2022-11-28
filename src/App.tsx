import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<h1>home</h1>} />
        <Route path="new" element={<h1>new</h1>} />
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
