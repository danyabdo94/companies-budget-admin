import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/modal";
import { Button } from "@chakra-ui/button";
import { iCompany } from "../../models";
import {
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
} from "@chakra-ui/number-input";
import { Text } from "@chakra-ui/layout";
import { useTranslation } from "react-i18next";
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/form-control";
import { Field, Form, Formik } from "formik";
import { useAppDispatch } from "../../../../common/hooks";
import { editCompanyAsync } from "../companies-list/company.slicer";

export default function CompanyBudgetModal({
    onClose,
    isOpen,
    company,
}: {
    onClose: () => void;
    isOpen: boolean;
    company: iCompany;
}): JSX.Element {
    const { t } = useTranslation("companiesListTranslations");

    const { company_name, budget, budget_spent, id } = company;
    const dispatch = useAppDispatch();

    const validateName = (value: number) => {
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
                    onSubmit={(values, actions) => {
                        console.log("test submit", values, actions);
                        dispatch(editCompanyAsync({ company: { ...company, budget: values.budget }, companyId: id }));
                        actions.setSubmitting(false);
                        onClose();
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <ModalHeader data-test-id="company_name">{company_name}</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Field id="budget" name="budget" validate={validateName}>
                                    {({ field, form }: { field: any; form: any }) => (
                                        <FormControl isInvalid={form.errors.budget && form.touched.budget}>
                                            <FormLabel htmlFor="budget">{t("budget")}</FormLabel>

                                            <NumberInput
                                                {...field}
                                                min={budget_spent}
                                                onChange={(val) => form.setFieldValue(field.name, Number(val))}
                                            >
                                                <NumberInputField />
                                                <NumberInputStepper>
                                                    <NumberIncrementStepper />
                                                    <NumberDecrementStepper />
                                                </NumberInputStepper>
                                            </NumberInput>

                                            <FormErrorMessage>{form.errors.budget}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                            </ModalBody>

                            <ModalFooter>
                                <Button colorScheme="teal" mr={3} type="submit" disabled={isSubmitting}>
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
