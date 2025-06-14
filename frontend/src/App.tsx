import React, { useState, useEffect } from 'react';
import EntryForm from './components/EntryForm';
import EntryList from './components/EntryList';
import { Entry, EntryFormData } from './types';

const API_URL = 'http://localhost:3333/api';

const App: React.FC = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/entries`);
      if (!response.ok) {
        throw new Error('Failed to fetch entries');
      }
      const data = await response.json();
      setEntries(data);
    } catch (error) {
      console.error('Error fetching entries:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (formData: EntryFormData) => {
    try {
      const response = await fetch(`${API_URL}/entries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create entry');
      }

      // Refresh entries after successful submission
      fetchEntries();
    } catch (error) {
      console.error('Error creating entry:', error);
      throw error;
    }
  };

  return (
    <div className="app">
      <h1>Life Tracking</h1>
      <EntryForm onSubmit={handleSubmit} />
      <EntryList entries={entries} isLoading={isLoading} />
    </div>
  );
};

export default App;