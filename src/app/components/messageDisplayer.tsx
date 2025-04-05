import React from "react"
import {exchange} from "@/lib/aiReq";
import styles from "./messageDisplayer.module.css";
import Message from "@/app/components/message"

interface props{
    messages?: exchange[];
}

const MessageDisplayer = ({messages}:props)=>{
    return <div className={styles.container}>
        {messages?.map((m, i) =>(
            <div  key={i}>
                <Message icon={"fa-solid fa-user"} sender={"You"} content={m.question}/>
                <Message  icon="fa-solid fa-robot" sender={"Lecturatu' AI"} content={m.answer}/>
            </div>
        ))}
    </div>
}

export default MessageDisplayer;