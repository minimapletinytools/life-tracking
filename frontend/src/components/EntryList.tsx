import React from 'react';
import { Entry } from '../types';

interface EntryListProps {
  entries: Entry[];
  isLoading: boolean;
}

const EntryList: React.FC<EntryListProps> = ({ entries, isLoading }) => {
  if (isLoading) {
    return <div className="loading">Loading entries...</div>;
  }

  if (entries.length === 0) {
    return <div className="no-entries">No entries yet. Create your first one!</div>;
  }

  return (
    <div className="entries-container">
      <h2>Your Entries</h2>
      <div className="entries-list">
        {entries.map(entry => (
          <div key={entry.id} className="entry-card">
            <div className="entry-title">{entry.title}</div>
            <div className="entry-date">
              {new Date(entry.created_at).toLocaleString()}
            </div>
            <div className="entry-content">{entry.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EntryList;