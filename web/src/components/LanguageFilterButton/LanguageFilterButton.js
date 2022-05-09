const LanguageFilterButton = ({ language, filterBy }) => {
  const clickHandler = (e) => {
    filterBy(e.target.innerHTML);
  };
  return <button onClick={clickHandler}>{language}</button>;
};

export default LanguageFilterButton;
