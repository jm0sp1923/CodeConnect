import React, { useState, useEffect } from "react";
<<<<<<< HEAD
import { FcBookmark } from "react-icons/fc";
import { FaRegComment } from "react-icons/fa";
import { FcLike, FcDislike } from "react-icons/fc";
import Axios from 'axios';

import "./posts.css";

function Posts({idPost ,idUser, initialIsFollowing, initialLikes, imgPublicacion, textPost, ImagenPerfil }) {
 
=======
import { FcLike, FcDislike } from "react-icons/fc";
import axios from "axios";
import "./posts.css";
//import miImagen from 'http://localhost:5500/server/imgs/3a1739d1b7ddf4b5467807f4d8ebe150.png';

function Posts({ id,idUser, initialIsFollowing, initialLikes, imgPublicacion,textPost}) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
>>>>>>> 6872894ef5449be8f60efe3c231bf520057f199f
  const [likes, setLikes] = useState(initialLikes);
  const [imageSrc, setImageSrc] = useState(imgPublicacion);
  const [fotoPerfil, setFotoPerfil] = useState(idUser);
  const [comments, setComments] = useState([]);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [currentComment, setCurrentComment] = useState("");
  const storedUser = JSON.parse(localStorage.getItem('userData'));
  const [liked, setLiked] = useState(false);
<<<<<<< HEAD



=======
>>>>>>> 6872894ef5449be8f60efe3c231bf520057f199f

 
  useEffect(() => {
    // Construye la URL de la imagen basada en la información recibida
    if (imageSrc) {
      setImageSrc(`http://localhost:5500/images/${imgPublicacion}`);
<<<<<<< HEAD
      
=======
   
>>>>>>> 6872894ef5449be8f60efe3c231bf520057f199f
    }

    if (fotoPerfil) {
      setFotoPerfil(`https://ui-avatars.com/api/${idUser}`);
     
    }  
    
    fetchComments();
    

  }, [imageSrc, idPost]);





  const fetchComments = () => {
    fetch(`http://localhost:5500/getCommentPost/${idPost}`)
      .then(response => response.json())
      .then(data => {
    
        console.log("Comentarios recibidos:", data);
        setComments(data); // Agrega esto para verificar la respuesta
      })
      .catch(error => {
        console.error('Error al obtener datos:', error);
      });
  };


  const handleCommentSubmit = async () => {

    await Axios.post("http://localhost:5500/datePost", {
      id_post: idPost,
      id_user: storedUser[0].user,
      comments: currentComment,
      likes: likes,
    }).then((response) => {
      
    }).catch((error) => {
      
    });
    // Puedes limpiar el cuadro de comentarios después de enviarlo si es necesario.
    //setComments('');
    fetchComments();
    //setCurrentComment('');
    setShowCommentBox(false);
  };


  const handleLike = () => {
    if (!liked) {
      setLikes(likes + 1);
<<<<<<< HEAD
      Axios.post(`http://localhost:5500/like/add/${idPost}`)
        .then(response => {
          console.log("likes:", liked);
        })
        .catch(error => {

=======
      axios.post(`http://localhost:5500/like/add`, { postId: id })
        .then(response => {
          
        })
        .catch(error => {
         
>>>>>>> 6872894ef5449be8f60efe3c231bf520057f199f
        });
    } else {
      setLikes(likes - 1);
      // Llamada a la API para quitar un like en la base de datos
<<<<<<< HEAD
      Axios.post(`http://localhost:5500/like/remove/${idPost}`)
        .then(response => {

=======
      axios.post(`http://localhost:5500/like/remove`, { postId: id })
        .then(response => {
          
>>>>>>> 6872894ef5449be8f60efe3c231bf520057f199f
        })
        .catch(error => {
          console.error("Error al eliminar like de la base de datos:", error);
        });
    }
    setLiked(!liked);
  };


  const handleCommentButtonClick = () => {
    setShowCommentBox(!showCommentBox);
  };

  
  const handleCommentChange = (e) => {
    setCurrentComment(e.target.value); // Actualiza el comentario actual, no la lista de comentarios
  };

  const sortedData = comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

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
                  
                </div>
              </div>
            </article>

            <img
              className="card-img-top"
              src={imageSrc}
              alt="Post"
            />


            <p className="card-text">{textPost}</p>

<<<<<<< HEAD
              {liked ? (
                <FcDislike
                  id="likeButton"
                  onClick={handleLike}
                  style={{ color: 'red' }}
                />
              ) : (
                <FcLike
                  id="likeButton"
                  onClick={handleLike}
                  style={{ color: 'black' }}
                />
              )}
=======
            {liked ? (
              <FcDislike
                id="likeButton"
                onClick={handleLike}
                style={{ color: 'red' }}
              />
            ) : (
              <FcLike
                id="likeButton"
                onClick={handleLike}
                style={{ color: 'black' }}
              />
            )}

>>>>>>> 6872894ef5449be8f60efe3c231bf520057f199f
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
              <ul>
                {sortedData.map((comment, index) => (
                    <div className="comment">
                      <h8 className="h5">{comment.id_user}:</h8>
                      <p className="p">{comment.comments}</p> 
                    </div>
                ))}
              </ul>
            </div>
            
          </div>
        </div>
      </div>
      </form>
    </div>
    
  );
}

export default Posts;
