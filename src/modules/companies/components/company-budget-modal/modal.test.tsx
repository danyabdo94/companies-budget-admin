import "@testing-library/jest-dom/extend-expect";
import { iCompany } from "../../models";
import CompanyBudgetModal from "./";

import { render, cleanup, fireEvent, wait } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../../common/store";
import { debug } from "console";

const company: iCompany = {
    company_name: "Apple",
    budget: 100,
    budget_spent: 50,
    id: 1,
    date_of_contract_sign: "2005-10-12",
};
let mockSave = jest.fn();

describe("Company Budget Modal", () => {
    beforeEach(() => (mockSave = jest.fn()));
    afterEach(() => cleanup());
    const onClose = () => undefined;

    test("should render title", () => {
        const { getByText } = render(
            <Provider store={store}>
                <CompanyBudgetModal saveData={mockSave} onClose={onClose} isOpen={true} company={company} />
            </Provider>,
        );
        const title = getByText(company.company_name);
        expect(title).toBeDefined();
    });

    test("renders input with numbers pattern", () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <CompanyBudgetModal saveData={mockSave} onClose={onClose} isOpen={true} company={company} />
            </Provider>,
        );

        expect(getByTestId("number-input-field")).toHaveAttribute("pattern", "[0-9]*(.[0-9]+)?");
    });

    test("renders input pre filled with right data", () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <CompanyBudgetModal saveData={mockSave} onClose={onClose} isOpen={true} company={company} />
            </Provider>,
        );

        expect(getByTestId("number-input-field")).toHaveValue(String(company.budget));
    });

    test("input shouldn't be empty", async () => {
        const { getByTestId, findByTestId } = render(
            <Provider store={store}>
                <CompanyBudgetModal saveData={mockSave} onClose={onClose} isOpen={true} company={company} />
            </Provider>,
        );

        const input = getByTestId("number-input-field");

        fireEvent.change(input, { target: { value: "" } });
        fireEvent.blur(input);

        const validationErrors = await findByTestId("input-error");

        expect(validationErrors.innerHTML).toBe("Budget is required");
    });

    test("input should be > spent", async () => {
        const { getByTestId, findByTestId } = render(
            <Provider store={store}>
                <CompanyBudgetModal saveData={mockSave} onClose={onClose} isOpen={true} company={company} />
            </Provider>,
        );

        const input = getByTestId("number-input-field");

        fireEvent.change(input, { target: { value: "1" } });
        fireEvent.blur(input);

        const validationErrors = await findByTestId("input-error");

        expect(validationErrors.innerHTML).toBe("Budget can't be less than budget spent 😱");
    });

    test("submit shall not be triggered if budget < spent", async () => {
        const { getByTestId, getByText } = render(
            <Provider store={store}>
                <CompanyBudgetModal saveData={mockSave} onClose={onClose} isOpen={true} company={company} />
            </Provider>,
        );

        const input = getByTestId("number-input-field");

        fireEvent.change(input, { target: { value: "1" } });

        const button = getByText("Submit");
        fireEvent.click(button);

        await wait(() => expect(mockSave).not.toHaveBeenCalled());
    });

    test("submit shall be triggered just once", async () => {
        const { getByTestId, getByText } = render(
            <Provider store={store}>
                <CompanyBudgetModal saveData={mockSave} onClose={onClose} isOpen={true} company={company} />
            </Provider>,
        );

        const input = getByTestId("number-input-field");

        fireEvent.change(input, { target: { value: "53" } });

        const button = getByText("Submit");
        fireEvent.click(button);

        await wait(() => expect(mockSave).toHaveBeenCalledTimes(1));
    });

    test("submit shall be triggered if budget > spent", async () => {
        const { getByTestId, getByText } = render(
            <Provider store={store}>
                <CompanyBudgetModal saveData={mockSave} onClose={onClose} isOpen={true} company={company} />
            </Provider>,
        );

        const input = getByTestId("number-input-field");

        fireEvent.change(input, { target: { value: "53" } });

        const button = getByText("Submit");
        fireEvent.click(button);

        await wait(() => {
            expect(mockSave).toHaveBeenCalledWith({ companyData: { ...company, budget: 53 } });
        });
    });
});
