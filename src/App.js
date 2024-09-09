import './App.css';
import DocCopilot from './docCopilot';
import DocList from './docList';
import RichDocEditor from './richDocEditor';
import { useState } from 'react';
function App() {
    const [activeDoc, setActiveDoc] = useState('');
    const [rerender, setRerender]= useState(false);
    const [editorContent, setEditorContent] = useState('');
    const [docTitle, setDocTitle] = useState('');
    return (
        <div className="container">
            <div className="left-nav">
                <DocList setActiveDoc={setActiveDoc} rerender = {rerender} setRerender = {setRerender}/>
                <input type="button" className ="nav-button" onClick={() => setActiveDoc('new')} value="New Doc"/>
            </div>
            <div className="center-part">
                <RichDocEditor activeDoc={activeDoc} setRerender = {setRerender} editorContent={editorContent} setEditorContent={setEditorContent} docTitle={docTitle} setDocTitle={setDocTitle}/>
            </div>
            <div className="right-side">
                <DocCopilot docTitle={docTitle} editorContent={editorContent}/>
            </div>
        </div>
    );
}

export default App;
