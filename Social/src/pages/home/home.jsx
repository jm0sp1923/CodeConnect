import Top from "../../components/top/top";
import React, { useState, useEffect } from "react";
import './home.css'
import Posts from "../../components/Posts/posts";
import AddPost from "../../components/AddPost/addpost";
import { useNavigate } from "react-router-dom";


function Home() {
  const [imageSrc, setImageSrc] = useState(null);
  const [post, setPost] = useState([]);
  const [cargando, setCargando] = useState(true);


  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem('userData'));
  const [userInfo, setUserInfo] = useState(storedUser ? storedUser[0] : null);

  const errorInicioSesion = () => {
    navigate("/login");
  }

  useEffect(() => {
    if (userInfo === null) {
      alert("Inicie sesión primero");
      errorInicioSesion();
    } 
  }, [userInfo]);

  const fetchAllPosts = () => {
    fetch('http://localhost:5500/getImages') // Asegúrate de que el puerto sea correcto
      .then(response => {
        if (!response.ok) {
          throw new Error('Respuesta de red no fue ok');
        }
        return response.json();
      })
      .then(data => {
        setPost(data);
        setCargando(false);
      })
      .catch(error => {
        console.error('Error al obtener datos:', error);
        setCargando(false);
      });
  };

  const fetchPostsByUser = (username) => {
    // Aquí deberías ajustar la URL y el cuerpo de la solicitud según tu API
    fetch(`http://localhost:5500/getImagesUser/${username}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Respuesta de red no fue ok');
        }
        return response.json();
      })
      .then(data => {
        setPost(data);
        setCargando(false);
      })
      .catch(error => {
        console.error('Error al obtener datos:', error);
        setCargando(false);
      });
  };

  useEffect(() => {
    // Inicialmente, carga todas las publicaciones
    fetchAllPosts();
    //fetchPostsByUser();


  }, []);

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


  const handleSearch = (searchTerm) => {
    // Realizar la búsqueda solo si hay un término de búsqueda
    if (searchTerm.trim() !== "") {
      setCargando(false);
      fetchPostsByUser(searchTerm);
      console.log(searchTerm);
    } else {
      fetchAllPosts();
    }

  };

  //Ordenar los posts por el mas reciente
  const sortedPosts = post.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));


  const topActions = { onSearch: handleSearch };

  
  return (
    <div className="Home">
      <header className="Home-header">
        <Top actions={topActions}></Top>
      </header>
      <div className="Body">
        <AddPost onImageSelected={handleImageSelected} onImageSubmit={handleImageSubmit} />
        {cargando ? <p>Cargando publicaciones...</p> : (
          <ul>
            {sortedPosts.map((posts, index ) => (
              <Posts key={posts.id} id = {posts.id} idUser={posts.id_User} initialIsFollowing={false} initialLikes={posts.likes} imgPublicacion={posts.imageUrl} textPost={posts.text}></Posts>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Home;