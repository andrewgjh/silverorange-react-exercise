import styles from './LanguageFilterButton.module.css';

const LanguageFilterButton = ({ language, filterBy }) => {
  const clickHandler = (e) => {
    filterBy(e.target.innerHTML);
  };
  return (
    <button className={styles.language_filter} onClick={clickHandler}>
      {language}
    </button>
  );
};

export default LanguageFilterButton;
