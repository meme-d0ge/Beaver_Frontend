'use client'
import React, {useEffect, useState} from 'react';
import {useRouter} from "next/navigation";
import {RegisterData, useRegisterUserMutation} from "@/api/user.api";
import {LoginData, useLoginMutation} from "@/api/auth.api";
import {SubmitHandler, useForm} from "react-hook-form";
import {useAppDispatch, useAppSelector} from "@/store/store";
import {QueryStatus} from "@reduxjs/toolkit/query";
import {toast} from "sonner";
import {enableCookiesAccepted} from "@/store/cookie/cookie.slice";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

const Auth = () => {
    const router = useRouter()

    const [registryUser, resultRegister] = useRegisterUserMutation({});
    const [loginUser, resultLogin] = useLoginMutation({});

    const {register: registerLogin, handleSubmit: handleSubmitLogin} = useForm<LoginData>();
    const onSubmitLogin: SubmitHandler<LoginData> = (loginData) => {
        loginUser({
            username: loginData.username,
            password: loginData.password,
        } as LoginData)
    };
    const {register: registerRegister, handleSubmit: handleSubmitRegister} = useForm<RegisterData>();
    const onSubmitRegister: SubmitHandler<RegisterData> = async (registerData) => {
        registryUser({
            displayName: registerData.displayName,
            username: registerData.username,
            password: registerData.password,
        } as RegisterData);
    }

    const [toastId, setToastId] = useState(0)
    const dispatch = useAppDispatch()
    const accepted = useAppSelector(state => state.cookieSlice.accepted);

    useEffect(() => {
        if (resultLogin.status !== QueryStatus.uninitialized){
            switch (resultLogin.status){
                case QueryStatus.pending:
                    if (toastId){
                        setToastId(0);
                        toast.dismiss(toastId);
                    }
                    setToastId(Number(toast("Loading:", {
                        description: "Loading...",
                        position: "bottom-left",
                        action: {
                            label: "Close",
                            onClick: () => {},
                        },
                    })));
                    break
                case QueryStatus.fulfilled:
                    if (toastId){
                        setToastId(0);
                        toast.dismiss(toastId);
                    }
                    setToastId(Number(toast("Status Login:", {
                        description: "Successfully Login",
                        position: "bottom-left",
                        style:{
                            fontWeight: "bold",
                            color: 'green',
                        },
                        action: {
                            label: "Close",
                            onClick: () => {},
                        },
                    })));
                    resultLogin.reset()
                    dispatch(enableCookiesAccepted())
                    router.push('/')
                    break
                case QueryStatus.rejected:
                    if (toastId){
                        setToastId(0);
                        toast.dismiss(toastId);
                    }
                    setToastId(Number(toast("Error Login:", {
                        description: `${resultLogin.error.data.message}`,
                        position: "bottom-left",
                        style: {
                            fontWeight: "bold",
                            color: 'red',
                        },
                        action: {
                            label: "Close",
                            onClick: () => {},
                        },
                    })));
                    resultLogin.reset()
                    break
            }
        } else if (resultRegister.status !== QueryStatus.uninitialized){
            switch (resultRegister.status){
                case QueryStatus.pending:
                    if (toastId) {
                        setToastId(0);
                        toast.dismiss(toastId);
                    }
                    setToastId(Number(toast("Loading", {
                        description: "Loading...",
                        position: "bottom-left",
                        action: {
                            label: "Close",
                            onClick: () => {},
                        },
                    })));
                    break;
                case QueryStatus.fulfilled:
                    if (toastId){
                        setToastId(0);
                        toast.dismiss(toastId);
                    }
                    setToastId(Number(toast("Registration", {
                        description: "Successfully Registered",
                        style:{
                            fontWeight: "bold",
                            color: 'green',
                        },
                        position: "bottom-left",
                        action: {
                            label: "Close",
                            onClick: () => {},
                        },
                    })));
                    resultRegister.reset()
                    break
                case QueryStatus.rejected:
                    if (toastId){
                        setToastId(0);
                        toast.dismiss(toastId);
                    }
                    setToastId(Number(toast("Error registration:", {
                        description: `Error Registered ${resultRegister.error.data.message}`,
                        style:{
                            fontWeight: "bold",
                            color: 'red',
                        },
                        position: "bottom-left",
                        action: {
                            label: "Close",
                            onClick: () => {},
                        },
                    })));
                    resultRegister.reset()
                    break
            }
        }
    }, [resultLogin, resultRegister]);
    useEffect(() => {
        if (accepted){
            router.push('/');
        }
    }, [accepted]);
    return (
        <main
            className={`min-h-[100vh] flex flex-col items-center justify-center px-[25px] bg-neutral-900`}>
            <Tabs defaultValue={'login'} className={'max-w-[1024px] mx-auto'}>
                <TabsList>
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                    <form onSubmit={handleSubmitLogin(onSubmitLogin)}>
                        <Card>
                            <CardHeader>
                                <CardTitle className={'mx-auto text-[20px]'}>Login</CardTitle>
                                <CardDescription>Login to your account to start communicating</CardDescription>
                            </CardHeader>
                            <CardContent className={'flex flex-col gap-y-4'}>
                                <div className={'flex flex-col gap-y-[5px]'}>
                                    <Label className={'text-[16px] px-[5px] font-bold'} htmlFor="name">Username</Label>
                                    <Input {...registerLogin('username', {required: 'Username field is required'})}
                                           id='username' placeholder={'Username'}></Input>
                                </div>
                                <div className={'flex flex-col gap-y-[5px]'}>
                                    <Label className={'text-[16px] px-[5px] font-bold'}
                                           htmlFor="password">Password</Label>
                                    <Input
                                        type={'password'} {...registerLogin('password', {required: 'Password field is required'})}
                                        id='password' placeholder={'Password'}></Input>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button type={'submit'} className={'mx-auto'}>Login</Button>
                            </CardFooter>
                        </Card>
                    </form>
                </TabsContent>
                <TabsContent value="register">
                    <form onSubmit={handleSubmitRegister(onSubmitRegister)}>
                        <Card>
                            <CardHeader>
                                <CardTitle className={'mx-auto text-[20px]'}>Register</CardTitle>
                                <CardDescription>Register an account to start communicating.</CardDescription>
                            </CardHeader>
                            <CardContent className={'flex flex-col gap-y-4'}>
                                <div className={'flex flex-col gap-y-[5px]'}>
                                    <Label className={'text-[16px] px-[5px] font-bold'} htmlFor="displayName">Public
                                        name</Label>
                                    <Input {...registerRegister('displayName', {required: 'Public name field is required'})}
                                           id='displayName' placeholder={'Public name'}></Input>
                                </div>
                                <div className={'flex flex-col gap-y-[5px]'}>
                                    <Label className={'text-[16px] px-[5px] font-bold'} htmlFor="name">Username</Label>
                                    <Input {...registerRegister('username', {required: 'Username field is required'})}
                                           id='username' placeholder={'Username'}></Input>
                                </div>
                                <div className={'flex flex-col gap-y-[5px]'}>
                                    <Label className={'text-[16px] px-[5px] font-bold'}
                                           htmlFor="password">Password</Label>
                                    <Input
                                        type={'password'} {...registerRegister('password', {required: 'Password field is required'})}
                                        id='password' placeholder={'Password'}></Input>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button type={'submit'} className={'mx-auto'}>Login</Button>
                            </CardFooter>
                        </Card>
                    </form>
                </TabsContent>
            </Tabs>
        </main>
    );
};

export default Auth;