import {createSlice} from "@reduxjs/toolkit";

enum Theme{
    dark = "dark",
    light = "light",
}
interface themeState {
    theme: Theme;
}
const initialState: themeState = {
    theme: Theme.dark,
};
const themeSlice = createSlice({
    name: 'theme',
    initialState: initialState,
    reducers:{
        changeTheme(state, action: { payload: Theme;}) {
            state.theme = action.payload;
        }
    }
})

export const { changeTheme } = themeSlice.actions
export default themeSlice.reducer