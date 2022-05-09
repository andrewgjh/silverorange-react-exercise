import RepoItem from '../RepoItem/RepoItem';
const RepoList = ({ repos, repoClick }) => {
  return (
    <ul>
      {repos.map((repoDetails) => (
        <RepoItem key={repoDetails.id} {...repoDetails} repoClick={repoClick} />
      ))}
    </ul>
  );
};

export default RepoList;
