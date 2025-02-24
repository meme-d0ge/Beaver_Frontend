import {createSlice} from "@reduxjs/toolkit";


const checkTheme = () => {
    const theme = localStorage.getItem("theme");
    if (theme) {
        if (theme === "dark") {
            return Theme.dark
        } else if (theme === "light") {
            return Theme.light
        }
    }
};
export enum Theme{
    dark = "dark",
    light = "light",
}
interface themeState {
    theme: Theme;
}
const initialState: themeState = {
    theme: checkTheme() || Theme.dark,
};
const themeSlice = createSlice({
    name: 'theme',
    initialState: initialState,
    reducers:{
        toggleTheme(state) {
            if (state.theme === Theme.dark) {
                state.theme = Theme.light;
                localStorage.setItem("theme", Theme.light);
            } else {
                state.theme = Theme.dark;
                localStorage.setItem("theme", Theme.dark);
            }
        }
    }
})

export const { toggleTheme } = themeSlice.actions
export default themeSlice.reducer