export const GET_COMPANIES = `${process.env.REACT_APP_API_BASE}/company`;

export const EDIT_COMPANY = (id: number): string => `${process.env.REACT_APP_API_BASE}/company/${id}`;
