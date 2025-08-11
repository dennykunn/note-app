import React, { useState } from "react";

const NoteItem = ({ note, onDelete, onToggleImportant, onToggleCompleted, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(note.title);
  const [editContent, setEditContent] = useState(note.content);

  const handleEdit = () => {
    if (editTitle.trim() && editContent.trim()) {
      onEdit(note.id, {
        title: editTitle.trim(),
        content: editContent.trim(),
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(note.title);
    setEditContent(note.content);
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isEditing) {
    return (
      <div className="note-item editing" style={{ backgroundColor: note.color }}>
        <div className="note-header">
          <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="edit-title" placeholder="Judul catatan" />
        </div>
        <textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} className="edit-content" placeholder="Isi catatan" rows="4" />
        <div className="note-actions">
          <button onClick={handleEdit} className="btn btn-primary btn-sm">
            💾 Simpan
          </button>
          <button onClick={handleCancel} className="btn btn-secondary btn-sm">
            ❌ Batal
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`note-item ${note.completed ? "completed" : ""} ${note.important ? "important" : ""}`} style={{ backgroundColor: note.color }}>
      <div className="note-header">
        <h3 className={`note-title ${note.completed ? "completed" : ""}`}>{note.title}</h3>
        <div className="note-meta">
          {note.important && <span className="important-badge">⭐ Penting</span>}
          {note.completed && <span className="completed-badge">✅ Selesai</span>}
        </div>
      </div>

      <div className="note-content">
        <p className={note.completed ? "completed" : ""}>{note.content}</p>
      </div>

      <div className="note-footer">
        <small className="note-date">📅 {formatDate(note.createdAt)}</small>

        <div className="note-actions">
          <button onClick={() => onToggleImportant(note.id)} className={`btn btn-sm ${note.important ? "btn-warning" : "btn-outline"}`} title={note.important ? "Hapus dari penting" : "Tandai sebagai penting"}>
            {note.important ? "⭐" : "☆"}
          </button>

          <button onClick={() => onToggleCompleted(note.id)} className={`btn btn-sm ${note.completed ? "btn-success" : "btn-outline"}`} title={note.completed ? "Tandai belum selesai" : "Tandai selesai"}>
            {note.completed ? "✅" : "☐"}
          </button>

          <button onClick={() => setIsEditing(true)} className="btn btn-sm btn-outline" title="Edit catatan">
            ✏️
          </button>

          <button onClick={() => onDelete(note.id)} className="btn btn-sm btn-danger" title="Hapus catatan">
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
