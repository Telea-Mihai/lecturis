import React, {useState} from "react"
import useSpeechRecognition from "@/lib/useSpeechRecognition";
import {correctText, createQuiz, createSummary} from "@/lib/aiReq";
import MDEditor from "@uiw/react-md-editor";
import Style from "./Page.module.css"
import jsPDF from "jspdf";


const LecturePage = () => {
    const {
        text,
        startListening,
        stopListening,
        isListening,
        hasRecognitionSupport
    } = useSpeechRecognition();

    const [mode, setMode] = useState<boolean>(false);
    const [correctedText, setCorrectedText] = useState<string>("");
    const [mText, setMText] = useState<string>("");
    const [summary, setSummary] = useState<string>("");
    const [quiz, setQuiz] = useState<string>("");

    const [correctVisible, setCorrectVisible] = useState<boolean>(false);
    const [summaryVisible, setSummaryVisible] = useState<boolean>(false);
    const [quizVisible, setQuizVisible] = useState<boolean>(false);

    async function cText() {
        if (mode)
            setCorrectedText(await correctText(mText))
        else
            setCorrectedText(await correctText(text));
        setCorrectVisible(true);
    }

    async function mkR() {
        if (correctedText == "")
            cText();
        setSummary(await createSummary(correctedText));
        setSummaryVisible(true);
    }

    async function mkQ() {
        if (correctedText == "")
            cText();
        if (correctedText == "") {
            mkQ();
            return;
        }
        setQuiz(await createQuiz(correctedText));
        setQuizVisible(true);
    }

    async function genPdf(title:string, md:string){
        const pdf = new jsPDF("p", "pt", "a4");

        const margin = { top: 30, right: 30, bottom: 30, left: 30 };

        pdf.text(md, margin.left, margin.top, { align: "left", maxWidth: 500 });
        pdf.save(title+".pdf");
    }

    return <div className={Style.container}>
        <div className={Style.header}>
            <h1>Start new lecture</h1>
            <h3>Transcribe lectures, create summaries, generate quizzes</h3>
        </div>
        {
            mode ?
                <div className={Style.area}>
                    <h2>Manual mode:</h2>
                    <textarea placeholder={"Paste your lecture here..."} onChange={(e) => {
                        setMText(e.target.value)
                    }}/>
                </div>
                :
                <div className={Style.area}>
                    <div className={Style.textContainer}>
                        <h2>{text == "" ? "Whatever you say will appear here" : text}</h2>
                    </div>
                    {
                        isListening ? "" :
                            <button className={"mainButton"} onClick={() => {
                                setCorrectedText("");
                                setSummary("");
                                startListening();
                            }}><i className="fa-solid fa-ear-listen"></i> Start listening</button>
                    }
                    {
                        isListening ?
                            <button className={"mainButton"} onClick={stopListening}><i
                                className="fa-solid fa-circle-stop"></i> Stop listening</button>
                            : ""
                    }
                </div>
        }
        <div>

        </div>
        <button className="mainButton" onClick={() => {
            setMode(!mode);
        }}><i className="fa-solid fa-arrows-rotate"></i> {mode ? "  Change to listen mode" : "  Change to manual mode"}
        </button>

        <div>
            <div className={Style.sectionHeader}>
                <div className={Style.title}>
                    <h1>Correction:</h1>
                    <button className={"mainButton"} onClick={cText} disabled={text == "" && mText == ""}>Correct text
                    </button>
                    <button className={"mainButton"} onClick={()=>{genPdf("Corrected", correctedText)}} disabled={correctedText==""}>Generate Pdf  <i className="fa-solid fa-file-pdf"></i>
                    </button>
                </div>
                <button className={Style.dropButton} onClick={() => {
                    setCorrectVisible(!correctVisible)
                }}><i className={+correctVisible ? "fa-solid fa-caret-up" : "fa-solid fa-caret-down"}></i></button>
            </div>
            {correctedText == "" || !correctVisible ? "" :
                <div>
                    <MDEditor.Markdown style={{
                        padding: "1rem",
                    }} source={correctedText}/>
                </div>
            }
        </div>
        <div>
            <div className={Style.sectionHeader}>
                <div className={Style.title}>
                    <h1>Summarize:</h1>
                    <button className={"mainButton"} onClick={mkR} disabled={correctedText == ""}>Make summary</button>
                    <button className={"mainButton"} onClick={()=>{genPdf("Summary", summary)}} disabled={summary==""}>Generate Pdf  <i className="fa-solid fa-file-pdf"></i>
                    </button>
                </div>

            <button className={Style.dropButton} onClick={() => {
                setSummaryVisible(!summaryVisible)
            }}><i className={summaryVisible ? "fa-solid fa-caret-up" : "fa-solid fa-caret-down"}></i></button>
            </div>
            {
                summary == "" || !summaryVisible ? "" :
                    <div>
                        <MDEditor.Markdown style={{
                            padding: "1rem",
                        }} source={summary}/>
                    </div>
            }
        </div>
        <div>
        <div className={Style.sectionHeader}>
            <div className={Style.title}>
                <h1>Quiz maker:</h1>
                <button className={"mainButton"} onClick={mkQ} disabled={correctedText == ""}>Make Quiz</button>
                <button className={"mainButton"} onClick={()=>{genPdf("Quiz", quiz)}} disabled={quiz==""}>Generate Pdf  <i className="fa-solid fa-file-pdf"></i>
                </button>
            </div>
            <button className={Style.dropButton} onClick={() => {
                setQuizVisible(!quizVisible)
            }}><i className={quizVisible ? "fa-solid fa-caret-up" : "fa-solid fa-caret-down"}></i></button>
        </div>
            {
                quiz == "" || !quizVisible ? "" :
                    <div>
                        <MDEditor.Markdown style={{
                            padding: "1rem",
                        }} source={quiz}/>
                    </div>
            }
        </div>
    </div>
}

export default LecturePage;