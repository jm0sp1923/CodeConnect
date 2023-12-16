import React, { useState } from "react";
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import Axios from "axios";
import './addpost.css';

const AddPost = ({ onImageSelected, onImageSubmit }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const storedUser = JSON.parse(localStorage.getItem('userData'));

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    onImageSelected(e.target.files[0]);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async () => {
    onImageSubmit(file);
    // console.log('File:', file);
    // console.log('Text:', text);
    const formData = new FormData();
      formData.append('text', text);
      formData.append('image', file);
      formData.append('id_User', storedUser[0].user);


      
        Axios.post('http://localhost:5500/savePost', formData).then((response) => { 
        

        if (response.status == 200) {
          console.log('Post enviado y guardado en la base de datos');
        } else {
          console.error('Error al enviar el post al servidor');
        }
      
    });

  };

  const pHSearch = "¿Qué estás pensando?";

  return (
    <div className="AddPost">
      <form onSubmit={handleSubmit}>
      <div className="row">
        <input type="file" id="wfsinputs" onChange={handleFileChange} />
        <input id="wsinputs" placeholder={pHSearch} onChange={handleTextChange} value={text} />
        <button id="wsbuttons" type="submit"><SendRoundedIcon className="icon"/></button>
      </div>
      </form>
    </div>
  );
};

export default AddPost;