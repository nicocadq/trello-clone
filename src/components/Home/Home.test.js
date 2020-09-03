import React from "react";

import { render, fireEvent } from "../../testUtils";
import Home from "./Home";

test("Create board", () => {
  const boardTitle = "New Board";

  const { getByTestId, getByText } = render(<Home />);

  const addBoardFormInput = getByTestId("input-text");
  const addBoardFormButton = getByTestId("button-submit");
  fireEvent.change(addBoardFormInput, {
    target: { value: boardTitle },
  });
  fireEvent.click(addBoardFormButton);

  getByText(boardTitle);
});
