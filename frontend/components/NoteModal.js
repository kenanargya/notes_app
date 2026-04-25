"use client";

import { useState, useEffect, useRef } from "react";

export default function NoteModal({ isOpen, onClose, onSubmit, note }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const titleRef = useRef(null);
  const textareaRef = useRef(null);

  const isEditing = !!note;

  useEffect(() => {
    if (isOpen) {
      setTitle(note?.title || "");
      setContent(note?.content || "");
      setErrors({});
      // Focus title and auto-resize textarea
      setTimeout(() => {
        titleRef.current?.focus();
        if (textareaRef.current) {
          textareaRef.current.style.height = "auto";
          textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
      }, 100);
    }
  }, [isOpen, note]);

  const handleContentChange = (e) => {
    setContent(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!content.trim()) newErrors.content = "Content is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      await onSubmit({
        id: note?.id,
        title: title.trim(),
        content: content.trim(),
      });
      onClose();
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        setErrors({ general: "Something went wrong. Please try again." });
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            {isEditing ? "Edit Note" : "Add Note"}
          </h2>
          <button onClick={onClose} className="modal-close">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        {errors.general && (
          <div className="alert alert-error">{errors.general}</div>
        )}

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="note-title" className="form-label">
              Title
            </label>
            <input
              ref={titleRef}
              id="note-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`form-input ${errors.title ? "input-error" : ""}`}
              placeholder="Enter note title..."
            />
            {errors.title && (
              <span className="form-error">{errors.title}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="note-content" className="form-label">
              Content
            </label>
            <textarea
              ref={textareaRef}
              id="note-content"
              value={content}
              onChange={handleContentChange}
              className={`form-textarea ${errors.content ? "input-error" : ""}`}
              placeholder="Write your note content..."
              rows={4}
              style={{ minHeight: "120px", overflow: "hidden" }}
            />
            {errors.content && (
              <span className="form-error">{errors.content}</span>
            )}
          </div>

          <div className="modal-actions">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost"
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting || !title.trim()}
            >
              {submitting
                ? "Saving..."
                : isEditing
                ? "Update Note"
                : "Create Note"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
