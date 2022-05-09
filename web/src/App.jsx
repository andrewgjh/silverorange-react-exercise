import React, { useState, useEffect, useCallback } from 'react';
import RepoList from './components/RepoList/RepoList';
import './App.css';

import './App.css';

export function App() {
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState(null);

  const fetchRepos = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:4000/repos');
      if (!response.ok) {
        throw new Error('Unable to fetch data!');
      }
      const data = await response.json();
      data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

      setRepos(data);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  useEffect(() => {
    fetchRepos();
  }, [fetchRepos]);

  return (
    <div className="App">
      <RepoList repos={repos} />
      {error && <p>{error}</p>}
    </div>
  );
}
