import styles from './RepoItem.module.css';

const RepoItem = ({
  id,
  name,
  description,
  language,
  forks_count: forksCount,
  created_at: createdAt,
  repoClick,
}) => {
  return (
    <li
      className={styles.repo_item}
      onClick={() => {
        repoClick(id);
      }}
    >
      <h1 className={styles.repo_name}>{name}</h1>
      <h3>Fork Count: {forksCount}</h3>
      <h3>Language: {language}</h3>
      <p>
        Description: {description || 'This repo does not have a description.'}
      </p>
      <p>Created at : {createdAt}</p>
    </li>
  );
};

export default RepoItem;
