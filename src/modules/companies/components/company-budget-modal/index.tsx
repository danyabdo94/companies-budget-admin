import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/modal";
import { Box } from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import { iCompany } from "../../models";
import {
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
} from "@chakra-ui/number-input";
import { useTranslation } from "react-i18next";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Field, Form, Formik } from "formik";

export default function CompanyBudgetModal({
    onClose,
    saveData,
    isOpen,
    company,
}: {
    onClose: () => void;
    saveData: ({ companyData }: { companyData: iCompany }) => void;
    isOpen: boolean;
    company: iCompany;
}): JSX.Element {
    const { t } = useTranslation("companiesListTranslations");

    const { company_name, budget, budget_spent } = company;

    const validateBudget = (value: number) => {
        let error;
        if (!value) {
            error = "Budget is required";
        } else if (value < budget_spent) {
            error = "Budget can't be less than budget spent 😱";
        }
        return error;
    };
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />

            <ModalContent>
                <Formik
                    initialValues={{ budget: budget }}
                    onSubmit={(values) => {
                        const tempCompany: iCompany = { ...company, budget: values.budget } as iCompany;

                        saveData({ companyData: tempCompany });
                    }}
                >
                    {() => (
                        <Form>
                            <ModalHeader data-testid="company_name">{company_name}</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Field id="budget" name="budget" validate={validateBudget}>
                                    {({ field, form }: { field: any; form: any }) => (
                                        <FormControl isInvalid={form.errors.budget && form.touched.budget}>
                                            <FormLabel htmlFor="budget">{t("budget")}</FormLabel>

                                            <NumberInput
                                                {...field}
                                                onChange={(val) => form.setFieldValue(field.name, Number(val))}
                                            >
                                                <NumberInputField data-testid="number-input-field" />
                                                <NumberInputStepper>
                                                    <NumberIncrementStepper />
                                                    <NumberDecrementStepper />
                                                </NumberInputStepper>
                                            </NumberInput>

                                            {form.errors.budget && (
                                                <Box mt={2} fontSize="sm" color="red" data-testid="input-error">
                                                    {form.errors.budget}
                                                </Box>
                                            )}
                                        </FormControl>
                                    )}
                                </Field>
                            </ModalBody>

                            <ModalFooter>
                                <Button colorScheme="teal" mr={3} type="submit">
                                    Submit
                                </Button>
                                <Button variant="ghost" onClick={onClose}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </Form>
                    )}
                </Formik>
            </ModalContent>
        </Modal>
    );
}
