"use client"
import {useState} from "react";
import {ask, exchange} from "@/lib/aiReq";
import MessageDisplayer from "@/app/components/messageDisplayer";
import useSpeechRecognition from "@/lib/useSpeechRecognition"
import NavBar from "@/app/components/navBar";
import LecturePage from "@/app/components/LecturePage";
import AIChatPage from "@/app/components/AIChatPage";

export default function Home() {
    const [page, setPage] = useState(1);

    return (
        <main>
            <NavBar onPageChange={setPage} />
            <div className={"container"}>
                {
                    page==1 ? <LecturePage/> : ""
                }
                {
                    page==2 ? <AIChatPage/> : ""
                }
            </div>
        </main>
    );
}
