import React, { useState } from "react";
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
    if (text.length > 0) {
      dispatch(actionOnSave(text));
      setText("");
    }
  };

  return (
    <>
      {active ? (
        <textarea
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

export default EditableField;
