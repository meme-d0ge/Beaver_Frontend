import React from 'react';
import {useAppSelector} from "@/store/store";

const Body = ({children}: Readonly<{
    children: React.ReactNode;
}>) => {
    const theme = useAppSelector(state => state.themeSlice.theme);
    return (
        <body className={theme}>
        {children}
        </body>
    );
};

export default Body;