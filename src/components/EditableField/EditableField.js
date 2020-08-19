import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

const EditableField = ({ actionOnSave, textDefault }) => {
  const [text, setText] = useState("");
  const [active, setActive] = useState(!textDefault);
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    setText(e.target.value);
  };

  const handleOnBlur = () => {
    setActive(false);
    if (text.length > 0) {
      dispatch(actionOnSave(text));
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
