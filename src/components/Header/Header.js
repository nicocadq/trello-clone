import React from "react";
import { Link } from "react-router-dom";
import { faHome, faRedo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Search from "./Search";

import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.container}>
      <nav className={styles.nav}>
        <Link to="/" className={styles.link}>
          <FontAwesomeIcon icon={faHome} />
        </Link>
      </nav>
      <Search />
      <div className={styles.arrows}>
        <span
          className={
            (styles.arrow, styles["arrow--active"], styles["arrow--left"])
          }
        >
          <FontAwesomeIcon icon={faRedo} />
        </span>
        <span className={styles.arrow}>
          <FontAwesomeIcon icon={faRedo} />
        </span>
      </div>
    </header>
  );
};

export default Header;
