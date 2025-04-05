"use server"
import Groq from 'groq-sdk';
import {
    ChatCompletionAssistantMessageParam,
    ChatCompletionMessageParam,
    ChatCompletionUserMessageParam
} from "groq-sdk/resources/chat";

export interface exchange{
    question: string;
    answer: string;
}

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export async function ask(question: string, history: exchange[]): Promise<exchange> {
    const response:exchange = {question:question, answer:""};
    const messages: ChatCompletionMessageParam[] = [];
    messages.push({role:"system", content:"You are a useful assistant for a student, he will provide you with either a lecture in order to answer his questions and help him understand it, or a problem which you will help him solve, explaining every step of your rationing in order to make it as clear to him. Daca textul dat este in romana, realizeaza raspunsul in romana. Make sure to use makrdown."});
    if(history.length > 0){
        history.map((exch)=>{
            const msg : ChatCompletionUserMessageParam = {content:exch.question, role:"user"}
            messages.push(msg);
            const aimsg : ChatCompletionAssistantMessageParam = {content:exch.answer, role:"assistant"}
            messages.push(aimsg);
        })
    }
    const qmsg : ChatCompletionUserMessageParam = {content:question, role:"user"};
    messages.push(qmsg)

    try{
        const chatCompletion = await groq.chat.completions.create({
            messages,
            model: 'llama3-8b-8192',
        });

            response.answer = chatCompletion.choices[0]?.message?.content || 'No response';
    } catch(error){
        console.log(error);
        // @ts-ignore
        response.answer = "An error occurred";
    }
    return response;
}

export async function correctText(text: string): Promise<string>{
    try{
        const chatCompletion = await groq.chat.completions.create({
            messages:[
                {
                    role:'system',
                    content:"Any text you get send, you will correct it from a gramatical, ortographic, logical and any ohter point of view. You wont change the topic and will not add any unecessary text. You will answer with the correct text and wont highlight the mistakes, dont add stuff like here is the corrected text in the response. You are allowed to check facts and correct them as well. Make sure to format text using markdown(# for headers, ** bolding etc.) Daca textul dat este in romana, realizeaza raspunsul in romana",
                },
                {
                    role:'user',
                    content:text,
                }
            ],
            model: 'llama3-8b-8192',
        })
        return chatCompletion.choices[0]?.message?.content || 'No response';
    }catch(error){
        console.log(error);
        // @ts-ignore
        return "An error occurred";
    }
}

export async function createSummary(text: string): Promise<string>{
    try{
        const chatCompletion = await groq.chat.completions.create({
            messages:[
                {
                    role:'system',
                    content:"You must create a summary of all of the text you get sent, dont add any unecesarry details like here is your summary, or stuff like that, just purely the summary of the text you get sent. You are allowed to check facts and correct them as well. Make sure to format text using markdown Daca textul dat este in romana, realizeaza raspunsul in romana",
                },
                {
                    role:'user',
                    content:text,
                }
            ],
            model: 'llama3-8b-8192',
        })
        return chatCompletion.choices[0]?.message?.content || 'No response';
    }catch(error){
        console.log(error);
        // @ts-ignore
        return "An error occurred";
    }
}

export async function createQuiz(text: string): Promise<string>{
    try{
        const chatCompletion = await groq.chat.completions.create({
            messages:[
                {
                    role:'system',
                    content:"You must create a Quiz out of the text you get sent, dont add any unecesarry details like here is your quiz, or stuff like that, just purely the quiz of the text you get sent. You are allowed to check facts and correct them as well. Make sure to format text using markdown. Make sure to provide the answers, separated clearly from the content of the quiz with another header. Daca textul dat este in romana, realizeaza raspunsul in romana",
                },
                {
                    role:'user',
                    content:text,
                }
            ],
            model: 'llama3-8b-8192',
            max_completion_tokens: 2048,
            temperature: 0.7,
            stop:null,
            stream:false
        })
        return chatCompletion.choices[0]?.message?.content || 'No response';
    }catch(error){
        console.log(error);
        // @ts-ignore
        return "An error occurred";
    }
}

