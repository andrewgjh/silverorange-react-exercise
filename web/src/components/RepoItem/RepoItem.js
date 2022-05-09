const RepoItem = ({
  id,
  name,
  description,
  language,
  forks_count: forksCount,
  created_at: createdAt,
}) => {
  return (
    <li>
      <h1>{name}</h1>
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
