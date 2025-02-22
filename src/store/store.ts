import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import themeSlice from "@/store/theme/theme.slice";
import {useDispatch, useSelector, useStore} from "react-redux";
import {api} from "@/api/api";
import {setupListeners} from "@reduxjs/toolkit/query";
import cookieSlice from "@/store/cookie/cookie.slice";

const rootReducer = combineReducers({
    themeSlice: themeSlice,
    cookieSlice: cookieSlice,
    [api.reducerPath]: api.reducer,
})
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
    devTools: true,
});
setupListeners(store.dispatch)

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector = useSelector.withTypes<AppState>()
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppStore = useStore.withTypes<typeof store>()