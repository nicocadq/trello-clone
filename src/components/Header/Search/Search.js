import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import _ from "lodash";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./Search.module.scss";

const Search = () => {
  const cards = useSelector((state) => Object.values(state.cards) || {});
  const [resultSet, setResultSet] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(false);
  const [inputText, setInputText] = useState("");

  const doesExistsValueInString = (value, string) => {
    const lowerCaseString = string.toLowerCase();
    const valuePosition = lowerCaseString.search(value);
    return !(valuePosition === -1);
  };

  const searchCards = (value) => {
    const matchedCards = [];
    cards.forEach((card) => {
      if (doesExistsValueInString(value, card.text)) matchedCards.push(card);
    });
    return matchedCards;
  };

  const delayedSearch = useCallback(
    _.debounce(() => setResultSet(searchCards(inputText)), 300),
    [inputText]
  );

  useEffect(() => {
    delayedSearch();
    return delayedSearch.cancel;
  }, [inputText, delayedSearch]);

  const handleOnChange = (e) => {
    const value = e.target.value;
    if (value === "\\") {
      return;
    } else {
      setInputText(e.target.value);
    }
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
            resultSet.map((card) => (
              <Link key={card.id} to={`/board/${card.boardID}`}>
                <p className={styles["drop-down__item"]}>{card.text}</p>
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
