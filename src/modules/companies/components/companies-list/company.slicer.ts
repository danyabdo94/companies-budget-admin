import { CompaniesState } from "./../../models";
import { ASYNC_STATUS } from "../../../../common/enums";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../../common/store";
import { editCompanyService, getCompaniesService } from "../../service";
import { iCompany } from "../../models";

const initialState: CompaniesState = {
    list: [],
    status: ASYNC_STATUS.IDLE,
};

export const getCompaniesAsync = createAsyncThunk("Companies/fetchCompanies", async () => {
    const response = await getCompaniesService();
    return response.data;
});

export const editCompanyAsync = createAsyncThunk(
    "Companies/editCompany",
    async ({ company, companyId }: { company: iCompany; companyId: number }) => {
        const response = await editCompanyService({ company, companyId });
        return response.data;
    },
);

export const CompaniesSlice = createSlice({
    name: "Companies",
    initialState,
    reducers: {
        editCompany: (state, action: PayloadAction<iCompany>) => {
            state.list = [...state.list];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCompaniesAsync.pending, (state) => {
                state.status = ASYNC_STATUS.LOADING;
            })
            .addCase(getCompaniesAsync.fulfilled, (state, action) => {
                state.status = ASYNC_STATUS.IDLE;
                const mappedItems = action.payload as [iCompany];
                state.list = mappedItems as [iCompany];
            })
            .addCase(editCompanyAsync.fulfilled, (state, action) => {
                const index = state.list.findIndex((item) => item.id == action.payload.id);
                const filteredList = [...state.list] as [iCompany];
                filteredList[index] = action.payload;
                state.list = filteredList;
            });
    },
});

export const { editCompany } = CompaniesSlice.actions;

export const selectCompanies = (state: RootState): CompaniesState => state.companies;

export default CompaniesSlice.reducer;
