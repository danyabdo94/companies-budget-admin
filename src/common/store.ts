import { configureStore, ThunkAction, Action, combineReducers } from "@reduxjs/toolkit";
import companiesReducer from "../modules/companies/components/companies-list/company.slicer";
const rootReducer = combineReducers({ companies: companiesReducer });
export const store = configureStore({
    reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
