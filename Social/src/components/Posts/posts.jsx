import React, { useState, useEffect } from "react";
import { FcBookmark } from "react-icons/fc";
import { FaRegComment } from "react-icons/fa";
import Axios from 'axios';

import "./posts.css";
//import miImagen from 'http://localhost:5500/server/imgs/3a1739d1b7ddf4b5467807f4d8ebe150.png';

function Posts({idPost ,idUser, initialIsFollowing, initialLikes, imgPublicacion, textPost, ImagenPerfil }) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [likes, setLikes] = useState(initialLikes);
  const [imageSrc, setImageSrc] = useState(imgPublicacion);
  const [fotoPerfil, setFotoPerfil] = useState(idUser);
  const [comments, setComments] = useState([]);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [currentComment, setCurrentComment] = useState("");
  const storedUser = JSON.parse(localStorage.getItem('userData'));




  useEffect(() => {
    // Construye la URL de la imagen basada en la información recibida
    if (imageSrc) {
      setImageSrc(`http://localhost:5500/images/${imgPublicacion}`);
      
    }

    if (fotoPerfil) {
      setFotoPerfil(`https://ui-avatars.com/api/${idUser}`);
     
    }  
    
    
    const fetchComments = () => {
      fetch(`http://localhost:5500/getCommentPost/${idPost}`)
        .then(response => response.json())
        .then(data => {
          console.log("Comentarios recibidos:", data); // Agrega esto para verificar la respuesta
          if (Array.isArray(data)) { // Comprueba si la respuesta es un arreglo
            setComments(data);
          } else {
            console.error("La respuesta no es un arreglo:", data);
          }
        })
        .catch(error => {
          console.error('Error al obtener datos:', error);
        });
    };

    fetchComments();

  }, [imageSrc, idPost]);



  console.log("holi: ", idUser);
  console.log("ruta fotoperfil;: ", fotoPerfil);

  const text = isFollowing ? "Siguiendo" : "Seguir";
  const buttonClassName = isFollowing
    ? "tw-followCard-button is-following"
    : "tw-followCard-button";

  const handleClick = () => {
    setIsFollowing(!isFollowing);
  };

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleCommentButtonClick = () => {
    setShowCommentBox(!showCommentBox);
  };

  const handleCommentChange = (e) => {
    setCurrentComment(e.target.value); // Actualiza el comentario actual, no la lista de comentarios
  };

  const handleCommentSubmit = async () => {
    
    
    console.log('Comentario enviado:', comments);
    console.log('user:', idUser);

    Axios.post("http://localhost:5500/datePost", {
      id_post: idPost,
      id_user: storedUser[0].user,
      comments: currentComment,
    }).then((response) => {
      
    }).catch((error) => {
      
    });

    // Puedes limpiar el cuadro de comentarios después de enviarlo si es necesario.
    setComments('');
    setCurrentComment('');
    setShowCommentBox(false);
  };

  


  return (
    <div className="Posts">
      <form onSubmit={handleCommentSubmit}>
      <div className="content">
        <div className="post-container">
          <div className="post">
            <article className="tw-followCard row">
              <div className="col-1">
                <div className="user-info">
                  <img
                    className="tw-followCard-avatar"
                    src={fotoPerfil}
                    alt={`Avatar`}
                  />
                </div>
              </div>
              <div className="col">
                <div className="tw-followCard-info">
                  <span className="tw-followCard-infoUserName">@{idUser}</span>
                </div>
              </div>
              <div className="col-2">
                <div className="d-flex align-items-center justify-content-end">
                  <aside>
                    <button className={buttonClassName} onClick={handleClick}>
                      <span className="tw-followCard-text">{text}</span>
                      <span className="tw-followCard-stopFollow">
                        Dejar de seguir
                      </span>
                    </button>
                  </aside>
                </div>
              </div>
            </article>
            
              <img
                className="card-img-top"
                src={imageSrc} 
                alt="Post"
              />
          

            <p className="card-text">{textPost}</p>

            <FcBookmark id="likeButton" onClick={handleLike} />
            <span className="badge bg-secondary">{likes}</span>
            
            <FaRegComment id="commentButton" onClick={handleCommentButtonClick}/>
            {showCommentBox && (
              <div className="comment-box">
                <input  
                  id="comentBox"
                  type="text"
                  placeholder="Escribe tu comentario..."
                  value={currentComment}
                  onChange={handleCommentChange}
                />
                <button id="enviarButton" >Enviar</button>
              </div>
            )}
           <div className="show-comments">
        {Array.isArray(comments) && comments.map((comment, index) => (
          <div key={index} className="comment">
            <h8 className="h5">{comment.id_user}:</h8>
            <p className="p">{comment.comments}</p> 
          </div>
        ))}
      </div>
            
          </div>
        </div>
      </div>
      </form>
    </div>
    
  );
}

export default Posts;
