import React, { useState, useEffect } from "react";
import { FcLike, FcDislike } from "react-icons/fc";
import axios from "axios";
import "./posts.css";
//import miImagen from 'http://localhost:5500/server/imgs/3a1739d1b7ddf4b5467807f4d8ebe150.png';

function Posts({ id,idUser, initialIsFollowing, initialLikes, imgPublicacion,textPost}) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [likes, setLikes] = useState(initialLikes);
  const [imageSrc, setImageSrc] = useState(imgPublicacion);
  const storedUser = JSON.parse(localStorage.getItem('userData'));
  const [liked, setLiked] = useState(false);

 
  useEffect(() => {
    // Construye la URL de la imagen basada en la información recibida
    if (imageSrc) {
      setImageSrc(`http://localhost:5500/images/${imgPublicacion}`);
   
    }
  }, [imageSrc]);

  const text = isFollowing ? "Siguiendo" : "Seguir";
  const buttonClassName = isFollowing
    ? "tw-followCard-button is-following"
    : "tw-followCard-button";

  const handleClick = () => {
    setIsFollowing(!isFollowing);
  };

  const handleLike = () => {
    if (!liked) {
      setLikes(likes + 1);
      axios.post(`http://localhost:5500/like/add`, { postId: id })
        .then(response => {
          
        })
        .catch(error => {
         
        });
    } else {
      setLikes(likes - 1);
      // Llamada a la API para quitar un like en la base de datos
      axios.post(`http://localhost:5500/like/remove`, { postId: id })
        .then(response => {
          
        })
        .catch(error => {
          console.error("Error al eliminar like de la base de datos:", error);
        });
    }
    setLiked(!liked);
  };

  return (
    <div className="Posts">
      <div className="content">
        <div className="post-container">
          <div className="post">
            <article className="tw-followCard row">
              <div className="col-1">
                <div className="user-info">
                  <img
                    className="tw-followCard-avatar"
                    src={`https://ui-avatars.com/api/${storedUser[0].user}`}
                    alt={`Avatar de ${storedUser[0].user}`}
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

            <span className="badge bg-secondary">{likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
