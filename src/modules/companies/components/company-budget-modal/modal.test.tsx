import "@testing-library/jest-dom/extend-expect";
import { iCompany } from "../../models";
import CompanyBudgetModal from "./";

import { render, cleanup, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../../common/store";

const company: iCompany = {
    company_name: "Apple",
    budget: 100,
    budget_spent: 50,
    id: 1,
    date_of_contract_sign: "21-10-2005",
};

describe("Company Budget Modal", () => {
    afterEach(() => cleanup());
    const onClose = () => undefined;

    it("should render title", () => {
        const { getByText } = render(
            <Provider store={store}>
                <CompanyBudgetModal onClose={onClose} isOpen={true} company={company} />
            </Provider>,
        );
        const title = getByText(company.company_name);
        expect(title).toBeDefined();
    });

    it("renders input with numbers pattern", () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <CompanyBudgetModal onClose={onClose} isOpen={true} company={company} />
            </Provider>,
        );

        expect(getByTestId("number-input-field")).toHaveAttribute("pattern", "[0-9]*(.[0-9]+)?");
    });

    it("renders input pre filled with right data", () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <CompanyBudgetModal onClose={onClose} isOpen={true} company={company} />
            </Provider>,
        );

        expect(getByTestId("number-input-field")).toHaveValue(String(company.budget));
    });

    it("input shouldn't be empty", async () => {
        const { getByTestId, findByTestId } = render(
            <Provider store={store}>
                <CompanyBudgetModal onClose={onClose} isOpen={true} company={company} />
            </Provider>,
        );

        const input = getByTestId("number-input-field");

        fireEvent.change(input, { target: { value: "" } });
        fireEvent.blur(input);

        const validationErrors = await findByTestId("input-error");

        expect(validationErrors.innerHTML).toBe("Budget is required");
    });

    it("input should be > spent", async () => {
        const { getByTestId, findByTestId } = render(
            <Provider store={store}>
                <CompanyBudgetModal onClose={onClose} isOpen={true} company={company} />
            </Provider>,
        );

        const input = getByTestId("number-input-field");

        fireEvent.change(input, { target: { value: "1" } });
        fireEvent.blur(input);

        const validationErrors = await findByTestId("input-error");

        expect(validationErrors.innerHTML).toBe("Budget can't be less than budget spent 😱");
    });
});
