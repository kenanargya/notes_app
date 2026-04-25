"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { noteService } from "@/services/noteService";
import Navbar from "@/components/Navbar";
import NoteCard from "@/components/NoteCard";
import NoteModal from "@/components/NoteModal";
import ConfirmModal from "@/components/ConfirmModal";
import EmptyState from "@/components/EmptyState";
import LoadingSpinner from "@/components/LoadingSpinner";
import Toast from "@/components/Toast";

export default function HomePage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState(null);

  // Delete confirmation state
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const showToast = (message, type = "success") => {
    setToast({ message, type, id: Date.now() });
  };

  const fetchNotes = useCallback(async (pageNumber = 1, append = false) => {
    try {
      setError(null);
      if (append) setLoadingMore(true);
      else setLoading(true);

      const response = await noteService.getNotes(pageNumber);
      const newNotes = response.data || [];
      
      setNotes((prev) => (append ? [...prev, ...newNotes] : newNotes));
      setPage(pageNumber);
      
      // Determine if there are more pages
      if (response.meta) {
        setHasMore(response.meta.current_page < response.meta.last_page);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      setError("Failed to load notes. Please try again.");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  const loadMore = () => {
    if (!loadingMore && hasMore) {
      fetchNotes(page + 1, true);
    }
  };

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.push("/login");
      return;
    }
    fetchNotes();
  }, [user, authLoading, router, fetchNotes]);

  // Filter notes by search query
  const filteredNotes = useMemo(() => {
    if (!searchQuery.trim()) return notes;
    const q = searchQuery.toLowerCase();
    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(q) ||
        note.content.toLowerCase().includes(q)
    );
  }, [notes, searchQuery]);

  const handleCreate = () => {
    setEditingNote(null);
    setModalOpen(true);
  };

  const handleEdit = (note) => {
    setEditingNote(note);
    setModalOpen(true);
  };

  const handleSubmit = async ({ id, title, content }) => {
    if (id) {
      await noteService.updateNote(id, { title, content });
      showToast("Note updated successfully");
    } else {
      await noteService.createNote({ title, content });
      showToast("Note created successfully");
    }
    await fetchNotes();
  };

  // Delete flow — request → confirm → execute
  const handleDeleteRequest = (note) => {
    setDeleteTarget(note);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await noteService.deleteNote(deleteTarget.id);
      showToast("Note deleted", "info");
      await fetchNotes();
    } catch {
      showToast("Failed to delete note", "error");
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteTarget(null);
  };

  if (authLoading || (!user && !authLoading)) {
    return (
      <div className="page-wrapper">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <Navbar />
      <main className="main-content">
        {/* Header */}
        <div className="content-header">
          <div>
            <h1 className="page-title">My Notes</h1>
            <p className="page-subtitle">
              {notes.length > 0
                ? `${notes.length} note${notes.length !== 1 ? "s" : ""}`
                : "Organize your thoughts"}
            </p>
          </div>
          {notes.length > 0 && (
            <button
              onClick={handleCreate}
              className="btn btn-primary"
              id="create-note-btn"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
              Add Note
            </button>
          )}
        </div>

        {/* Search Bar */}
        {notes.length > 0 && (
          <div className="search-bar">
            <svg
              className="search-icon"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
              id="search-notes"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="search-clear"
                aria-label="Clear search"
              >
                <svg
                  width="16"
                  height="16"
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
            )}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="alert alert-error">
            <span>{error}</span>
            <button onClick={fetchNotes} className="btn btn-ghost btn-sm">
              Retry
            </button>
          </div>
        )}

        {/* Content */}
        {loading ? (
          <LoadingSpinner />
        ) : notes.length === 0 ? (
          <EmptyState onCreateNote={handleCreate} />
        ) : filteredNotes.length === 0 ? (
          <div className="search-empty">
            <p className="search-empty-text">
              No notes matching &ldquo;
              <strong>{searchQuery}</strong>&rdquo;
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="btn btn-ghost btn-sm"
            >
              Clear search
            </button>
          </div>
        ) : (
          <>
            <div className="notes-grid">
              {filteredNotes.map((note, index) => (
                <div
                  key={note.id}
                  className="note-card-wrapper"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <NoteCard
                    note={note}
                    onEdit={handleEdit}
                    onDeleteRequest={handleDeleteRequest}
                  />
                </div>
              ))}
            </div>

            {hasMore && !searchQuery && (
              <div style={{ marginTop: "2.5rem", display: "flex", justifyContent: "center" }}>
                <button
                  onClick={loadMore}
                  disabled={loadingMore}
                  className="btn btn-ghost"
                  style={{ minWidth: "140px" }}
                >
                  {loadingMore ? (
                    <>
                      <svg
                        className="animate-spin"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                      </svg>
                      Loading...
                    </>
                  ) : (
                    "Load More"
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {/* Create/Edit Modal */}
      <NoteModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        note={editingNote}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!deleteTarget}
        title="Delete Note"
        message={`Delete "${deleteTarget?.title}"? This action cannot be undone.`}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        loading={deleting}
      />

      {/* Toast */}
      {toast && (
        <div className="toast-container">
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        </div>
      )}
    </div>
  );
}
