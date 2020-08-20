import React, { useState } from "react";
import PropTypes from "prop-types";

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
          type="text"
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          value={text}
          autoFocus
          style={{
            padding: "2px",
            width: "100%",
          }}
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
