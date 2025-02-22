'use client'
import "./globals.css";
import {Provider} from "react-redux";
import {store} from "@/store/store";
import React from "react";
import {Toaster} from "sonner";
import Body from "@/components/Body/Body";

export default function RootLayout({children}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <Provider store={store}>
            <Body>
                {children}
                <Toaster/>
            </Body>
        </Provider>
        </html>
    );
};