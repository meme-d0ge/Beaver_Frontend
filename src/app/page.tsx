'use client'

import {useAppSelector} from "@/store/store";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import Loader from "@/components/Loader/Loader";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable";
import {CustomMenu} from "@/components/CustomMenu/CustomMenu";


export default function Home() {
    const [loadingCookie, setLoadingCookie] = useState(true)
    const cookieAccepted = useAppSelector(state => state.cookieSlice.accepted)
    const router = useRouter()

    useEffect(() => {
        if (!cookieAccepted) {
            router.push('/auth')
        } else if (cookieAccepted) {
            setLoadingCookie(false)
        }
    }, [cookieAccepted]);

    // enum pageVariant {
    //     chats = 'chats',
    //     setting = 'setting',
    // }
    // const [activePage, setActivePage] = useState(pageVariant.chats)

    if (loadingCookie) {
        return (
            <main>
                <Loader className="absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center"/>
            </main>
        );
    } else {
        return (
            <main>
                <ResizablePanelGroup direction="horizontal" className={'min-h-screen'}>
                    <ResizablePanel minSize={15} defaultValue={30} maxSize={35} className={'bg-neutral-800 px-1 pl-2 py-1'}>
                        <CustomMenu/>
                    </ResizablePanel>
                    <ResizableHandle className={'bg-neutral-600'}/>

                    <ResizablePanel minSize={65} defaultValue={70} maxSize={85} className={'relative px-1 pr-2 py-1'}>

                    </ResizablePanel>
                </ResizablePanelGroup>
            </main>
        );
    }
};
