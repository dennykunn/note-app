import React, { useState } from "react";

const NoteForm = ({ onAddNote }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [important, setImportant] = useState(false);
  const [color, setColor] = useState("#ffffff");
  const [isExpanded, setIsExpanded] = useState(false);

  const colors = ["#ffffff", "#ffebee", "#e8f5e8", "#fff3e0", "#f3e5f5", "#e0f2f1", "#fff8e1", "#fce4ec"];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      onAddNote({ title: title.trim(), content: content.trim(), important, color });
      setTitle("");
      setContent("");
      setImportant(false);
      setColor("#ffffff");
      setIsExpanded(false);
    }
  };

  const handleExpand = () => {
    if (!isExpanded) {
      setIsExpanded(true);
    }
  };

  return (
    <div className="note-form">
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <input type="text" placeholder="Judul catatan..." value={title} onChange={(e) => setTitle(e.target.value)} onFocus={handleExpand} className="title-input" required />
          <div className="form-controls">
            <label className="checkbox-label">
              <input type="checkbox" checked={important} onChange={(e) => setImportant(e.target.checked)} />
              <span className="checkmark">⭐</span>
              Penting
            </label>
          </div>
        </div>

        {isExpanded && (
          <>
            <textarea placeholder="Tulis isi catatan Anda di sini..." value={content} onChange={(e) => setContent(e.target.value)} className="content-input" rows="4" required />
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                💾 Simpan Catatan
              </button>
              <button type="button" onClick={() => setIsExpanded(false)} className="btn btn-secondary">
                ❌ Batal
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default NoteForm;
