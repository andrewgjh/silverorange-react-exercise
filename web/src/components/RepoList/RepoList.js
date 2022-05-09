import RepoItem from '../RepoItem/RepoItem';
const RepoList = ({ repos }) => {
  return (
    <ul>
      {repos.map((repoDetails) => (
        <RepoItem key={repoDetails.id} {...repoDetails} />
      ))}
    </ul>
  );
};

export default RepoList;
