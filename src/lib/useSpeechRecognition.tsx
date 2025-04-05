"use client";

import {useEffect, useRef, useState} from "react";


const useSpeechRecognition = () => {

const [text, setText] = useState("");
const [isListening, setListening] = useState(false);
const recognitionRef = useRef<any>(null);
    useEffect(() => {
        // Only run in browser
        if (typeof window === "undefined") return;

        const SpeechRecognition =
            (window as any).webkitSpeechRecognition ||
            (window as any).SpeechRecognition;

        console.log("SpeechRecognition", SpeechRecognition);

        if (!SpeechRecognition) {
            console.warn("Speech recognition not supported in this browser.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onresult = (event: SpeechRecognitionEvent) => {
            const transcript = Array.from(event.results)
                .map((result) => result[0].transcript)
                .join("");
            setText(transcript);
        };

        recognition.onend = () => {
            setListening(false);
        };

        recognition.onerror = (e: any) => {
            console.error("Speech recognition error:", e);
            setListening(false);
        };

        recognitionRef.current = recognition;
    }, []);

    const startListening = () => {
        if (recognitionRef.current) {
            setText("");
            setListening(true);
            recognitionRef.current.start();
        }
    };

    const stopListening = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            setListening(false);
        }
    };


    return {
        text,
        isListening,
        startListening,
        stopListening,
        hasRecognitionSupport: !!recognitionRef.current,
    };
};

export default useSpeechRecognition;
