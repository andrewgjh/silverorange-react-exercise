import React, { useState, useEffect, useCallback } from 'react';
import RepoList from './components/RepoList/RepoList';
import LanguageList from './components/LanguageList/LanguageList';
import './App.css';

import './App.css';

export function App() {
  const [repos, setRepos] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [error, setError] = useState(null);
  const [languages, setLanguages] = useState([]);

  const fetchRepos = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:4000/repos');
      if (!response.ok) {
        throw new Error('Unable to fetch data!');
      }
      const data = await response.json();
      const repoLanguages = [];
      //loop through repos data to get all languages that repos are written in
      for (let i = 0; i < data.length; ++i) {
        if (repoLanguages.indexOf(data[i].language) < 0) {
          repoLanguages.push(data[i].language);
        }
      }
      data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setLanguages(repoLanguages);
      setRepos(data);
      setFiltered(data);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  useEffect(() => {
    fetchRepos();
  }, [fetchRepos]);

  const filterBy = (language) => {
    const filteredByLanguage = repos.filter(
      (repo) => repo.language === language
    );
    setFiltered(filteredByLanguage);
  };

  return (
    <div className="App">
      <LanguageList languages={languages} filterBy={filterBy} />
      <RepoList repos={filtered} />
      {error && <p>{error}</p>}
    </div>
  );
}
