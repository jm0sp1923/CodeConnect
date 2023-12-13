import React, { useState, useEffect } from "react";
import { FcBookmark } from "react-icons/fc";
import "./posts.css";
//import miImagen from 'http://localhost:5500/server/imgs/3a1739d1b7ddf4b5467807f4d8ebe150.png';

function Posts({ idUser, initialIsFollowing, initialLikes, imgPublicacion }) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [likes, setLikes] = useState(initialLikes);
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    // Construye la URL de la imagen basada en la información recibida
    if (imgPublicacion) {
      setImageSrc(`http://localhost:5500/server/imgs/${imgPublicacion}`);
      console.log("entro");
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
    setLikes(likes + 1);
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
                    src={`https://unavatar.io/${idUser}`}
                    alt={`Avatar de ${idUser}`}
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
                src={imgPublicacion}
                alt="Post"
              />
          

            <p className="card-text">hola</p>

            <FcBookmark id="likeButton" onClick={handleLike} />
            <span className="badge bg-secondary">{likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
