import React from 'react';
import './posts.css';

function Posts() {
    
  return (
    <div className="content">
        {/* Contenedor para las publicaciones */}
        <div className="post-container">
          <div className="post">
            <h3>Hola sapo</h3>
            <p>Holi sapo</p>
          </div>
          {/* Agrega más publicaciones aquí */}
        </div>
      </div>
  );
}

export default Posts;