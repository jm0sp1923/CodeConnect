import React, { useState } from "react";
import { FcBookmark } from "react-icons/fc";
import "./posts.css";
import AddPost from "../AddPost/addpost";

function Posts({  idUser, initialIsFollowing, initialLikes, imgPublicacion }) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [likes, setLikes] = useState(initialLikes);
  const [imageSrc, setImageSrc] = useState(null);

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

  const handleImageSelected = (selectedFile) => {
    if (selectedFile) {
      const objectURL = URL.createObjectURL(selectedFile);
      setImageSrc(objectURL);
    }
  };

  const handleImageSubmit = (selectedFile) => {
    if (selectedFile) {
      const objectURL = URL.createObjectURL(selectedFile);
      setImageSrc(objectURL);
    }
  };


  return (
    <div className="Posts">
      <AddPost onImageSelected={handleImageSelected} onImageSubmit={handleImageSubmit} />
      <div className="content">
        <div className="post-container">
          <div className="post">
            <article className="tw-followCard row">
              <div className="col-1">
                <div className="user-info">
                  <img
                    className="tw-followCard-avatar"
                    src={`https://unavatar.io/${idUser}`}
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
                    <span className="tw-followCard-stopFollow">Dejar de seguir</span>
                  </button>
                </aside>
                </div>
              </div>
            </article>

            <img
              className="card-img-top"
              src={imageSrc || imgPublicacion} // Usa `imageSrc` como fuente de imagen, si está definida
              alt="Post"
            />

            <p className="card-text">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error assumenda voluptates impedit labore blanditiis officiis aperiam consequuntur provident amet delectus quos illum accusantium totam, eos cum harum commodi sed eius!
            </p>

              <FcBookmark id="likeButton" onClick={handleLike}></FcBookmark>
              <span className="badge bg-secondary">{likes}</span>
            
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default Posts;
