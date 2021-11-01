import { ASYNC_STATUS } from "../../common/enums";

export interface iCompany {
    id: number;
    company_name: string;
    budget: number;
    budget_spent: number;
    date_of_contract_sign: string;
}

export interface CompaniesState {
    list: [iCompany] | [];
    status: ASYNC_STATUS;
}
