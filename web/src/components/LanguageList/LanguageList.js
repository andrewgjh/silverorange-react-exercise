import LanguageFilterButton from '../LanguageFilterButton/LanguageFilterButton';
const LanguageList = ({ languages, filterBy }) => {
  return (
    <>
      {languages.map((language) => (
        <LanguageFilterButton
          key={language}
          language={language}
          filterBy={filterBy}
        />
      ))}
    </>
  );
};

export default LanguageList;
