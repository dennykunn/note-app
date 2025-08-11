import React from "react";
import NoteItem from "./NoteItem";

const NoteList = ({ notes, onDelete, onToggleImportant, onToggleCompleted, onEdit }) => {
  if (notes.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📝</div>
        <h3>Tidak ada catatan</h3>
        <p>Mulai dengan membuat catatan pertama Anda!</p>
      </div>
    );
  }

  return (
    <div className="note-list">
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} onDelete={onDelete} onToggleImportant={onToggleImportant} onToggleCompleted={onToggleCompleted} onEdit={onEdit} />
      ))}
    </div>
  );
};

export default NoteList;
