import React, { useState, useEffect, useCallback } from 'react';
import RepoList from './components/RepoList/RepoList';
import RepoDetailLatest from './components/RepoDetailsLatest/RepoDetailsLatest';
import LanguageList from './components/LanguageList/LanguageList';
import './App.css';

import './App.css';

export function App() {
  const [repos, setRepos] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [error, setError] = useState(null);
  const [languages, setLanguages] = useState([]);
  const [showDetailRepo, setShowDetailRepo] = useState(false);
  const [detailRepo, setDetailRepo] = useState(null);

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
      //sort in reverse chronological order by creation date
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
  const repoDetailed = (id) => {
    console.log(id);
    setShowDetailRepo(true);
    const clickedRepo = repos.find((repo) => repo.id === id);
    setDetailRepo(clickedRepo.name);
  };
  const showAll = () => {
    setShowDetailRepo(false);
    setFiltered(repos);
  };

  return (
    <div className="App">
      <button onClick={showAll}>Show All Repos</button>
      {showDetailRepo && <RepoDetailLatest name={detailRepo} />}
      {!showDetailRepo && (
        <LanguageList languages={languages} filterBy={filterBy} />
      )}
      {!showDetailRepo && (
        <RepoList repos={filtered} repoClick={repoDetailed} />
      )}
      {!showDetailRepo && error && <p>{error}</p>}
    </div>
  );
}
