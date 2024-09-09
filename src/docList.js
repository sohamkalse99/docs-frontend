import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import Constants from './constants';
function DocList({setActiveDoc, rerender, setRerender}) {
    const [docList, setDocList] = useState([]);
    if(docList.length === 0 || rerender) {
        axios.get(Constants.GET_ALL_DOCS)
            .then((response) => {
                setDocList(response.data);
                setRerender(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    return (
        <div className="nav-container">

            <ul className="nav-list">
                {docList && docList.map((doc) => (
                    <div key={doc._id} className="nav-item">
                        <input type="button"  className="nav-button" key={doc._id} onClick={() => setActiveDoc(doc._id)} value={doc.title} />
                        <br />
                    </div>
                ))}
            </ul>
        </div>
    );
}
export default DocList;