import { Flex, Box, Text, Spacer } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { CompaniesList } from "../../components";

export default function Companies(): JSX.Element {
    const { t } = useTranslation("common");

    return (
        <>
            <Flex my={2} mx={4} alignItems="center">
                <Box p="2">
                    <Text fontSize="4xl">{t("companies")}</Text>
                </Box>
                <Spacer />
            </Flex>
            <CompaniesList />
        </>
    );
}
