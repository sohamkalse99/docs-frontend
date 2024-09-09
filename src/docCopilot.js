import React from 'react';
import { useState } from 'react';
import axios from 'axios';

function DocCopilot({docTitle, editorContent}) {
    const [userInput, setUserInput] = useState('');
    const [chatInput, setChatInput] = useState('');

    const savePrompt = async () =>{
        // setUserInput(e.target.value);
        const REACT_APP_API_KEY = process.env.REACT_APP_API_KEY;
        console.log(REACT_APP_API_KEY);
        const question = `Question: ${userInput}\n\nDocument Title:${docTitle}\n\nDocument Content:${editorContent}`;
        console.log(userInput);
        const response = await axios({
            url:`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${REACT_APP_API_KEY}`,
            method:"post",
            data: {
                contents:[
                    {parts:[{
                        text: question}]},
                ],
            },
        });

        // console.log(response['data']['candidates'][0]['content']['parts'][0]['text']);
        setChatInput(response['data']['candidates'][0]['content']['parts'][0]['text']);
    }

    return (
        <div className="editor-container">
            <h3 className="heading">Chat</h3>
            <textarea className = "doc-copilot-textarea" value={userInput} onChange={(e)=>setUserInput(e.target.value)} rows = {4} cols={50}placeholder="Enter text"/>
            <br/>
            <button onClick={savePrompt} className ="buttons" >Submit</button>

            <textarea className="doc-copilot-textarea" rows = {4} cols={50} onChange={(e)=>setChatInput(e.target.value)} placeholder="Chat Response" value={chatInput} readOnly />
        </div>
    );
}
export default DocCopilot;