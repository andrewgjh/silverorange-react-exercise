import { useEffect, useCallback, useState } from 'react';

import styles from './RepoDetailsLatest.module.css';
import ReactMarkdown from 'react-markdown';

const RepoDetailLatest = ({ name }) => {
  const [latestCommit, setLatestCommit] = useState(null);
  const [readme, setReadMe] = useState('');
  const [error, setError] = useState(null);
  const fetchCommits = useCallback(async () => {
    try {
      const response = await fetch(
        `https://api.github.com/repos/silverorange/${name}/commits`
      );
      if (!response.ok) {
        throw new Error('Unable to fetch data!');
      }
      const data = await response.json();
      //sorting to make sure the first element of array is the newest commit
      data.sort(
        (a, b) =>
          new Date(b.commit.author.date) - new Date(a.commit.author.date)
      );
      // set the latestCommit state to the first element of data returned from get request
      setLatestCommit(data[0]);
    } catch (err) {
      setError(err.message);
    }
  }, [setError, name]);

  const fetchReadMe = useCallback(async () => {
    try {
      const response = await fetch(
        `https://raw.githubusercontent.com/silverorange/${name}/master/README.md`
      );
      if (!response.ok) {
        throw new Error('Unable to fetch data!');
      }
      const data = await response.text();

      setReadMe(data);
    } catch (err) {
      setError(err.message);
    }
  }, [name]);

  useEffect(() => {
    fetchCommits();
    fetchReadMe();
  }, [fetchCommits, fetchReadMe]);
  return (
    <section>
      <main className={styles.latest}>
        <h1>{name}</h1>
        <h3>Latest Commit</h3>
        {error && <p>{error}</p>}
        {latestCommit && <p>Author: {latestCommit.commit.author.name}</p>}
        {latestCommit && <p>Commit Message: {latestCommit.commit.message}</p>}
        {latestCommit && <p>Commit Date: {latestCommit.commit.author.date}</p>}
      </main>
      <aside className={styles.markdown}>
        <ReactMarkdown>{readme}</ReactMarkdown>
      </aside>
    </section>
  );
};

export default RepoDetailLatest;
