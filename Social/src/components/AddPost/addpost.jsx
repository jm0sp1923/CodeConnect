import React, { useState } from "react";
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import './addpost.css';

const AddPost = ({ onImageSelected, onImageSubmit }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    onImageSelected(e.target.files[0]);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = () => {
    onImageSubmit(file);
    console.log('File:', file);
    console.log('Text:', text);
  };

  const pHSearch = "¿Qué estás pensando?";

  return (
    <div className="AddPost">
      <div className="row">
        <input type="file" id="wfsinputs" onChange={handleFileChange} />
        <input id="wsinputs" placeholder={pHSearch} onChange={handleTextChange} value={text} />
        <button id="wsbuttons" onClick={handleSubmit}><SendRoundedIcon className="icon"/></button>
      </div>
    </div>
  );
};

export default AddPost;