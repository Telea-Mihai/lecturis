import React, {useState} from "react"
import {ask, exchange} from "@/lib/aiReq";
import MessageDisplayer from "@/app/components/messageDisplayer";
import styles from "./Page.module.css"

const AIChatPage = () => {
    const [question, setQuestion] = useState<string>("");
    const [messages, setMessages] = useState<exchange[]>([])

    async function askQuestion() {
        if (!question)
            return;
        const response = await ask(question, messages);
        setMessages([...messages, response]);
        setQuestion("");
    }

    return <div className={styles.container}>
        <div className={styles.header}>
            <h1>AI chat</h1>
            <h3>Ask a question about a problem, or provide a lecture in order for him to help you understand it</h3>
        </div>
        <MessageDisplayer messages={messages}/>
        <form onSubmit={(e) => {
            e.preventDefault();
            askQuestion()
        }}>
            <input type={"text"} placeholder={"Type here..."}
                   onChange={(e) => setQuestion(e.target.value)} value={question}/>

            <button type={"submit"}>Send <i className="fa-solid fa-paper-plane-top"></i></button>
        </form>
    </div>
}

export default AIChatPage;