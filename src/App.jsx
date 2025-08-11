import React, { useState, useEffect } from "react";
import "./App.css";
import NoteList from "./components/NoteList";
import NoteForm from "./components/NoteForm";
import SearchBar from "./components/SearchBar";
import Header from "./components/Header";

function App() {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all"); // all, important, completed

  // Load notes from localStorage on component mount
  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = (newNote) => {
    const note = {
      id: Date.now(),
      title: newNote.title,
      content: newNote.content,
      important: newNote.important,
      completed: false,
      createdAt: new Date().toISOString(),
      color: newNote.color || "#ffffff",
    };
    setNotes([note, ...notes]);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const toggleImportant = (id) => {
    setNotes(notes.map((note) => (note.id === id ? { ...note, important: !note.important } : note)));
  };

  const toggleCompleted = (id) => {
    setNotes(notes.map((note) => (note.id === id ? { ...note, completed: !note.completed } : note)));
  };

  const editNote = (id, updatedNote) => {
    setNotes(notes.map((note) => (note.id === id ? { ...note, ...updatedNote } : note)));
  };

  const filteredNotes = notes.filter((note) => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) || note.content.toLowerCase().includes(searchTerm.toLowerCase());

    if (filter === "important") return matchesSearch && note.important;
    if (filter === "completed") return matchesSearch && note.completed;
    return matchesSearch;
  });

  const clearCompleted = () => {
    setNotes(notes.filter((note) => !note.completed));
  };

  const clearAll = () => {
    if (window.confirm("Apakah Anda yakin ingin menghapus semua catatan?")) {
      setNotes([]);
    }
  };

  return (
    <div className="app">
      <Header />
      <div className="container">
        <NoteForm onAddNote={addNote} />
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} filter={filter} onFilterChange={setFilter} />
        <div className="stats">
          <span>Total: {notes.length}</span>
          <span>Penting: {notes.filter((n) => n.important).length}</span>
          <span>Selesai: {notes.filter((n) => n.completed).length}</span>
        </div>
        <NoteList notes={filteredNotes} onDelete={deleteNote} onToggleImportant={toggleImportant} onToggleCompleted={toggleCompleted} onEdit={editNote} />
        {notes.length > 0 && (
          <div className="actions">
            <button onClick={clearCompleted} className="btn btn-secondary">
              Hapus Selesai
            </button>
            <button onClick={clearAll} className="btn btn-danger">
              Hapus Semua
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
