import React from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import store from "../store";

const renderWithProviders = (ui, { history = createMemoryHistory() } = {}) => {
  const Wrapper = ({ children }) => (
    <Provider store={store}>
      <Router history={history}>{children}</Router>
    </Provider>
  );

  Wrapper.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return render(ui, { wrapper: Wrapper });
};

// re-export everything
export * from "@testing-library/react";

// override render method
export { renderWithProviders as render };
