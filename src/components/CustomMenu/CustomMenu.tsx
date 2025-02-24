import React, {useState} from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Input} from "@/components/ui/input";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {useGetUserQuery} from "@/api/user.api";
import {useGetProfileQuery} from "@/api/profile.api";
import {Skeleton} from "@/components/ui/skeleton";
import {Button} from "@/components/ui/button";
import {useAppDispatch, useAppSelector} from "@/store/store";
import {disableCookiesAccepted} from "@/store/cookie/cookie.slice";
import {Switch} from "@/components/ui/switch";
import {Label} from "@/components/ui/label";
import {Theme, toggleTheme} from "@/store/theme/theme.slice";


export const CustomMenu = () => {
    const dispatch = useAppDispatch()
    const theme = useAppSelector(state => state.themeSlice.theme);

    const userData = useGetUserQuery('')
    const profileData = useGetProfileQuery('')
    const [isLoading, setIsLoading] = useState(true);

    return (
        <>
            <DropdownMenu>
                <div className={'flex flex-row items-center p-1 h-[44px] gap-x-2'}>
                    <DropdownMenuTrigger className={`w-[20px] h-[15px] relative after:absolute after:content('') after:left-0 after:right-0 after:bottom-0 after:h-[3px] after:bg-neutral-600 after:shadow-[0px_-6px_0px_0px_rgba(82,_82,_82,_1)]  before:absolute after:content('') before:left-0 before:right-0 before:top-0 before:h-[3px] before:bg-neutral-600`}></DropdownMenuTrigger>
                    <Input placeholder={'🔍︎ Search'} className={'h-full w-full bg-neutral-600'}/>
                </div>
                <DropdownMenuContent className={'max-w-[100vw] ml-2 mt-2'}>
                    <DropdownMenuLabel className={'max-w-max flex items-center gap-x-3'}>
                        <div className={'flex flex-col h-[45px] max-w-[100vw] gap-y-1'}>
                            {!profileData.isLoading && !userData.isLoading ? <>
                                <span className={'truncate'}>{profileData.data?.displayName}</span>
                                <span className={'truncate text-neutral-600'}>@{userData.data?.username}</span>
                            </>: <>
                                <Skeleton className={'min-w-[75px] h-full'}/>
                                <Skeleton className={'min-w-[75px] h-full'}/>
                            </>}
                        </div>
                        <Avatar className={'w-[45px] h-[45px]'}>
                            <AvatarImage onLoad={()=>{setIsLoading(false)}} src={profileData.data?.avatar ? profileData.data.avatar : process.env.NEXT_PUBLIC_DEFAULT_AVATAR} alt="user-avatar"/>
                            <AvatarFallback>{isLoading ? <Skeleton/> : <></>}</AvatarFallback>
                        </Avatar>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className={theme === Theme.dark ? Theme.light : Theme.dark}/>
                    <DropdownMenuItem className={'p-0'}>
                        <Button onClick={() => {}} className={'p-0 py-2 w-full h-full font-bold duration-0'} variant={'ghost'}>Profile</Button>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className={theme === Theme.dark ? Theme.light : Theme.dark}/>
                    <DropdownMenuItem className={'p-0'}>
                        <Button onClick={() => {}} className={'p-0 py-2 w-full h-full font-bold duration-0'} variant={'ghost'}>Setting</Button>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className={theme === Theme.dark ? Theme.light : Theme.dark}/>
                    <DropdownMenuItem className={'p-0'}>
                        <Button onClick={() => {dispatch(disableCookiesAccepted())}} className={'p-0 py-2 w-full h-full font-bold text-red-600'} variant={'ghost'}>Log out</Button>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className={theme === Theme.dark ? Theme.light : Theme.dark}/>
                    <div className="flex items-center justify-center space-x-2 h-[36px]">
                        <Switch onClick={()=>{dispatch(toggleTheme())}} defaultChecked={theme === Theme.dark} id="airplane-mode"/>
                        <Label className={''} htmlFor="airplane-mode">Dark Theme</Label>
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};