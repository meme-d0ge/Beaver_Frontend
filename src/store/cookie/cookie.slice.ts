import {createSlice} from "@reduxjs/toolkit";

const checkStorage = () => {
    if (typeof window !== "undefined") {
        const value = localStorage.getItem('cookieAccepted')
        if (value && value !== 'false') {
            return true;
        } else {
            return false
        }
    }
    return false;
};
interface cookieState {
    accepted: boolean;
}
const initialState: cookieState = {
    accepted: checkStorage(),
}

const cookieSlice = createSlice({
    name: "cookie",
    initialState: initialState,
    reducers: {
        disableCookiesAccepted: (state: cookieState) => {
            state.accepted = false;
            localStorage.setItem('cookieAccepted', 'false')
        },
        enableCookiesAccepted: (state: cookieState) => {
            state.accepted = true;
            localStorage.setItem('cookieAccepted', 'true')
        }
    },
})

export const { disableCookiesAccepted, enableCookiesAccepted } = cookieSlice.actions
export default cookieSlice.reducer