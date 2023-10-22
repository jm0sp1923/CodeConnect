import React, {useState}from "react";
import './addpost.css';


const AddPost = () => {

    const [imageSrc, setImageSrc] = useState(null);
    const [file, setFile] = useState(null);
    const [text, setText] = useState('');
  
    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
    };
  
    const handleTextChange = (e) => {
      setText(e.target.value);
    };
  
    const handleSubmit = () => {
      console.log('File:', file);
      console.log('Text:', text);
      // Aquí puedes agregar lógica para enviar el archivo y el texto a una API o procesarlos de alguna otra manera.
    };

   
  const pHSearch = "¿Qué estás pensando?";
  return (
    <div className="AddPost">
        <div className="row">
            <input type="file" id="wfsinputs"  onChange={handleFileChange}/>
            <input id="wsinputs" placeholder={pHSearch} onChange={handleTextChange} value={text}/>
            <button id="wsbuttons" onClick={handleSubmit}></button>
        </div>
    </div>
  );
};

export default AddPost;
