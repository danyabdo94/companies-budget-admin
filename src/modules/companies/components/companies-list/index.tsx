import { Flex } from "@chakra-ui/react";
import { useAppDispatch } from "../../../../common/hooks";
import { getCompaniesAsync } from "./company.slicer";
import CompaniesTable from "./companies-table";

export default function CompaniesList(): JSX.Element {
    const dispatch = useAppDispatch();
    dispatch(getCompaniesAsync());
    return (
        <Flex my={2} mx={4}>
            <CompaniesTable></CompaniesTable>
        </Flex>
    );
}
