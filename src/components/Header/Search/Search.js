import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import _ from "lodash";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./Search.module.scss";

const Search = () => {
  const cards = useSelector((state) => Object.values(state.cards));
  const [resultSet, setResultSet] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(false);
  const [inputText, setInputText] = useState("");

  const doesExistsValueInString = (value, currentSearch) => {
    const lowerCaseSearch = currentSearch.toLowerCase();
    const valuePosition = lowerCaseSearch.search(value);
    return valuePosition !== -1;
  };

  const searchCards = (value) => {
    return cards.filter((card) => doesExistsValueInString(value, card.text));
  };

  const delayedSearch = useCallback(
    _.debounce(() => setResultSet(searchCards(inputText)), 300),
    [inputText]
  );

  useEffect(() => {
    delayedSearch();
    return delayedSearch.cancel;
  }, [delayedSearch]);

  const handleOnChange = (e) => {
    const value = e.target.value;
    if (value === "\\") return;
    setInputText(e.target.value);
  };

  const handleOnBlur = () => {
    setTimeout(() => {
      setActiveDropdown(false);
      setResultSet([]);
    }, 50);
  };

  const handleOnFocus = () => {
    setActiveDropdown(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles["search-form"]}>
        <input
          className={styles.input}
          type="text"
          value={inputText}
          onChange={handleOnChange}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
        />
        <button className={styles.button}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      {activeDropdown && (
        <div
          className={
            activeDropdown ? styles["drop-down"] : styles["drop-down--disabled"]
          }
        >
          {resultSet.length > 0 ? (
            resultSet.map(({ id, boardID, text }) => (
              <Link key={id} to={`/board/${boardID}`}>
                <p className={styles["drop-down__item"]}>{text}</p>
              </Link>
            ))
          ) : (
            <p>No results yet</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
