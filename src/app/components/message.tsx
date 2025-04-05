import React from 'react';
import Styles from "./message.module.css"
import MDEditor from "@uiw/react-md-editor";

interface props{
    content:string;
    sender:string;
    icon:string;
}

const Message = ({content, sender, icon}:props) =>{
    return <div className={Styles.container}>
        <h1 className={Styles.sender}><i className={icon}></i> {sender}</h1>
        <MDEditor.Markdown source={content} style={{backgroundColor:"#C5C5C500"}}/>
    </div>
}

export default Message;