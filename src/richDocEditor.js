import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import Constants from './constants';
import 'react-quill/dist/quill.snow.css';
function RichDocEditor({activeDoc, setRerender, editorContent, setEditorContent, docTitle, setDocTitle}) {
   
    const [currentDoc, setCurrentDoc] = useState('');
    const [newDoc, setNewDoc] = useState(true);

    if(activeDoc !== '' && currentDoc!==activeDoc) {
        if(activeDoc === 'new' ) {
            setDocTitle('');
            setEditorContent('');
            setCurrentDoc(activeDoc);
        } else {
        axios.get(Constants.GET_DOC_BY_ID+activeDoc).then((response) => {
          
            setDocTitle(response.data.title);
            setEditorContent(response.data.desc);
            setCurrentDoc(activeDoc);
            setNewDoc(false);

        }).catch((error) => {
            console.log(error);
        });
    }
    }


    const handleEditorChange = (content) => {
        setEditorContent(content);
    };
    const saveDocument = () => {
        axios.post(Constants.POST_DOC, {
            title: docTitle,
            desc: editorContent
        }).then((response) => {
            console.log(response);
            setRerender(true);
        }).catch((error) => {
            console.log(error);
        });
    };
    return (
        <div className="editor-container">
            <h3 className="heading">Document</h3>
            <input type="text" className="editor-title" value={docTitle} onChange={(e) => setDocTitle(e.target.value)} placeholder='Title'/>
            <ReactQuill
            value={editorContent}
            onChange={handleEditorChange}
            theme="snow"
          />
          <input type="button" className ="buttons" value="Save" onClick={saveDocument}/>
        </div>
    );
}
export default RichDocEditor;