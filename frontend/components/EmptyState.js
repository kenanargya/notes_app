"use client";

export default function EmptyState({ onCreateNote }) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        <svg
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
          <path d="M14 2v4a2 2 0 0 0 2 2h4" />
          <path d="M10 18v-1" />
          <path d="M14 18v-3" />
          <path d="M10 13.5V12" />
        </svg>
      </div>
      <h3 className="empty-state-title">No notes yet</h3>
      <p className="empty-state-text">
        No notes yet. Click 'Add Note' to create one.
      </p>
      <button onClick={onCreateNote} className="btn btn-primary">
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
    </div>
  );
}
