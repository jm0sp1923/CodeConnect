import React, { useState, useEffect } from "react";
import { FcLike, FcDislike } from "react-icons/fc";
import { FaRegComment } from "react-icons/fa"; // Asegúrate de importar FaRegComment
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./posts.css";

function Posts({ id, idUser, initialIsFollowing, initialLikes, imgPublicacion, textPost }) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [likes, setLikes] = useState(initialLikes);
  const [imageSrc, setImageSrc] = useState(imgPublicacion);
  const [fotoPerfil, setFotoPerfil] = useState(idUser);
  const [comments, setComments] = useState([]);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [currentComment, setCurrentComment] = useState("");
  const storedUser = JSON.parse(localStorage.getItem('userData'));
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (imageSrc) {
      setImageSrc(`http://localhost:5500/images/${imgPublicacion}`);
    }

    if (fotoPerfil) {
      setFotoPerfil(`https://ui-avatars.com/api/${idUser}`);
    }

    fetchComments();
  }, [imageSrc, id]); // Cambiar idPost por id

  const fetchComments = () => {
    fetch(`http://localhost:5500/getCommentPost/${id}`) // Cambiar idPost por id
      .then(response => response.json())
      .then(data => {
        console.log("Comentarios recibidos:", data);
        setComments(data);
      })
      .catch(error => {
        console.error('Error al obtener datos:', error);
      });
  };

  const handleCommentSubmit = async () => {
    await axios.post("http://localhost:5500/datePost", {
      id_post: id, // Cambiar idPost por id
      id_user: storedUser[0].user,
      comments: currentComment,
      likes: likes,
    }).then((response) => {}).catch((error) => {});

    fetchComments();
    setShowCommentBox(false);
  };

  const handleLike = () => {
    if (!liked) {
      setLikes(likes + 1);
      axios.post(`http://localhost:5500/like/add`, { postId: id }) // Cambiar idPost por id
        .then(response => {}).catch(error => {});
    } else {
      setLikes(likes - 1);
      axios.post(`http://localhost:5500/like/remove`, { postId: id }) // Cambiar idPost por id
        .then(response => {}).catch(error => {
          console.error("Error al eliminar like de la base de datos:", error);
        });
    }
    setLiked(!liked);
  };

  const handleCommentButtonClick = () => {
    setShowCommentBox(!showCommentBox);
  };

  const handleCommentChange = (e) => {
    setCurrentComment(e.target.value);
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
              </article>

              <img className="card-img-top" src={imageSrc} alt="Post" />
              <p className="card-text">{textPost}</p>

              {liked ? (
                <FcDislike id="likeButton" onClick={handleLike} style={{ color: 'red' }} />
              ) : (
                <FcLike id="likeButton" onClick={handleLike} style={{ color: 'black' }} />
              )}
              <span className="badge bg-secondary">{likes}</span>

              <FaRegComment id="commentButton" onClick={handleCommentButtonClick} />
              {showCommentBox && (
                <div className="comment-box">
                  <input  
                    id="comentBox"
                    type="text"
                    placeholder="Escribe tu comentario..."
                    value={currentComment}
                    onChange={handleCommentChange}
                  />
                  <button id="enviarButton">Enviar</button>
                </div>
              )}
              <div className="show-comments">
                <ul>
                  {sortedData.map((comment, index) => (
                    <div className="comment" key={index}>
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
