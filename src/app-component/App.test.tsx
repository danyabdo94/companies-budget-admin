import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../common/store";
import App from "./App";

test("renders app", () => {
    const { getByTestId } = render(
        <Provider store={store}>
            <App />
        </Provider>,
    );

    expect(getByTestId("header-companies")).toHaveTextContent(/companies/i);
});
