import { Table, Thead, Tbody, Tr, Th, Center, Box } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../../../common/hooks";
import { iCompany } from "../../../models";
import { selectCompanies } from "../company.slicer";
import CompanyTableRow from "./company-row";

export default function CompaniesTable(): JSX.Element {
    const { t } = useTranslation("companiesListTranslations");

    const companiesState = useAppSelector(selectCompanies);

    return (
        <Box width="100%" overflowX="auto">
            <Table variant="simple" styles={{ overflowX: "auto" }}>
                <Thead>
                    <Tr>
                        <Th>
                            <Center>{t("id")}</Center>
                        </Th>
                        <Th>
                            <Center>{t("company_name")}</Center>
                        </Th>
                        <Th>
                            <Center>{t("budget")}</Center>
                        </Th>
                        <Th>
                            <Center>{t("date_of_contract_sign")}</Center>
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {companiesState?.list?.map((company: iCompany) => (
                        <CompanyTableRow company={company} key={company.id} />
                    ))}
                </Tbody>
                {/* TODO: Add pagination */}
            </Table>
        </Box>
    );
}
