import React, { useState } from "react";
import PropTypes from "prop-types";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./AddForm.module.scss";

const AddForm = ({
  buttonText,
  cancelAction,
  submitAction,
  placeholderText,
}) => {
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    if (text.length > 0) {
      submitAction(text);
      setText("");
    }
    e.preventDefault();
  };

  const handleCancel = () => {
    cancelAction();
    setText("");
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <input
        className={styles["input-text"]}
        type="text"
        onChange={handleChange}
        placeholder={placeholderText}
        value={text}
        autoFocus
      />
      <div className={styles.controls}>
        <button className={styles["button-submit"]}>{buttonText}</button>
        <button onClick={handleCancel}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
    </form>
  );
};

AddForm.defaultProps = {
  buttonText: "Submit",
  placeholderText: "Type something...",
};

AddForm.propTypes = {
  buttonText: PropTypes.string,
  submitAction: PropTypes.func.isRequired,
  cancelAction: PropTypes.func.isRequired,
  placeholderText: PropTypes.string,
};

export default AddForm;
