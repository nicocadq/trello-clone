import React, { useState } from "react";
import PropTypes from "prop-types";

import styles from "./EditableField.module.scss";

const EditableField = ({ actionOnSave, textDefault }) => {
  const [text, setText] = useState("");
  const [active, setActive] = useState(!textDefault);

  const handleOnChange = (e) => {
    setText(e.target.value);
  };

  const handleOnBlur = () => {
    setActive(false);
    if (text.length > 0) {
      actionOnSave(text);
      setText("");
    }
  };

  return (
    <>
      {active ? (
        <input
          className={styles.input}
          type="text"
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          value={text}
          autoFocus
        />
      ) : (
        <p onClick={() => setActive(true)}> {textDefault || text} </p>
      )}
    </>
  );
};

EditableField.defaultProp = {
  textDefault: "",
};

EditableField.propTypes = {
  actionOnSave: PropTypes.func.isRequired,
  textDefault: PropTypes.string,
};

export default EditableField;
