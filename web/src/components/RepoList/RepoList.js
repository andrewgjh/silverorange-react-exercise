import RepoItem from '../RepoItem/RepoItem';
import styles from './RepoList.module.css';
const RepoList = ({ repos, repoClick }) => {
  return (
    <ul className={styles.repo_list}>
      {repos.map((repoDetails) => (
        <RepoItem key={repoDetails.id} {...repoDetails} repoClick={repoClick} />
      ))}
    </ul>
  );
};

export default RepoList;
