import {
    Tr,
    Td,
    Box,
    Flex,
    Center,
    StatGroup,
    Stat,
    StatNumber,
    Tooltip,
    useDisclosure,
    Grid,
    GridItem,
} from "@chakra-ui/react";
import { useAppDispatch } from "../../../../../../common/hooks";
import { iCompany } from "../../../../models";
import CompanyBudgetModal from "../../../company-budget-modal";
import { editCompanyAsync } from "../../company.slicer";

{
    /* TODO: make it country based */
}

const formatCurrency = (curr: number) =>
    Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(curr);

const formatDate = (date: Date) => Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(date);

export default function CompanyTableRow({ company }: { company: iCompany }): JSX.Element {
    const { id, company_name, budget, budget_spent, date_of_contract_sign } = company;
    const tempDate = new Date(date_of_contract_sign);
    const { isOpen, onOpen: openDialog, onClose } = useDisclosure();
    const dispatch = useAppDispatch();

    const editCompany = ({ companyData }: { companyData: iCompany }) => {
        dispatch(editCompanyAsync({ company: companyData, companyId: companyData.id })).then(() => {
            onClose();
        });
    };
    return (
        <>
            <Tr
                key={id}
                onClick={openDialog}
                _hover={{
                    background: "teal.400",
                    boxShadow: "lg",
                    cursor: "pointer",
                    color: "white",
                }}
            >
                <Td>
                    <Center>{id}</Center>
                    {/* TODO: Find another way => it's hidden  */}
                    <CompanyBudgetModal saveData={editCompany} isOpen={isOpen} onClose={onClose} company={company} />
                </Td>
                <Td>
                    <Center>
                        <Flex alignItems="center">
                            <Box> {company_name} </Box>
                        </Flex>
                    </Center>
                </Td>
                <Td>
                    <Tooltip
                        label={`spent:${formatCurrency(budget_spent)} | remaining:${formatCurrency(
                            budget - budget_spent,
                        )} `}
                        aria-label="budget"
                    >
                        <Center>
                            <Grid templateRows="repeat(2, 1fr)" templateColumns="repeat(2, 1fr)" gap={4}>
                                <GridItem colSpan={2}>
                                    <StatGroup>
                                        <Stat>
                                            <StatNumber>
                                                <Box textAlign="center" data-testid="budget">
                                                    {formatCurrency(budget)}
                                                </Box>
                                            </StatNumber>
                                        </Stat>
                                    </StatGroup>
                                </GridItem>
                                <GridItem>
                                    <StatGroup>
                                        <Stat>
                                            <StatNumber>
                                                <Box textAlign="center" color="red.700" data-testid="budget_spent">
                                                    {formatCurrency(budget_spent)}
                                                </Box>
                                            </StatNumber>
                                        </Stat>
                                    </StatGroup>
                                </GridItem>
                                <GridItem>
                                    <StatGroup>
                                        <Stat>
                                            <StatNumber>
                                                <Box textAlign="center" data-testid="budget_remaining">
                                                    {formatCurrency(budget - budget_spent)}
                                                </Box>
                                            </StatNumber>
                                        </Stat>
                                    </StatGroup>
                                </GridItem>
                            </Grid>
                        </Center>
                    </Tooltip>
                </Td>
                <Td>
                    <Center>{formatDate(tempDate)}</Center>
                </Td>
            </Tr>
        </>
    );
}
