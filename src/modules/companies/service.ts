import { iCompany } from "./models";
import { EDIT_COMPANY, GET_COMPANIES } from "./consts";
import axios from "axios";

export const getCompaniesService = (): Promise<{ data: [iCompany] }> => axios.get(GET_COMPANIES);

export const editCompanyService = async ({
    company,
    companyId,
}: {
    company: iCompany;
    companyId: number;
}): Promise<{ data: iCompany }> =>
    axios.put(EDIT_COMPANY(companyId), {
        ...company,
    });
