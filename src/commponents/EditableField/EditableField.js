import React, { useState, useLayoutEffect } from "react";
import { useDispatch } from "react-redux";

const EditableField = ({ actionOnSave, textDefault }) => {
  const [text, setText] = useState("");
  const [active, setActive] = useState(!textDefault);
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    setText(e.target.value);
    actionOnSave(text);
  };

  const handleOnBlur = () => {
    setActive(false);
    dispatch(actionOnSave(text));
  };

  return (
    <>
      {active ? (
        <textarea
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          value={text}
        />
      ) : (
        <p onClick={() => setActive(true)}> {textDefault || text} </p>
      )}
    </>
  );
};

export default EditableField;
