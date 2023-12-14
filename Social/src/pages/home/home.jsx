import Top from "../../components/top/top";
import React, {useState, useEffect} from "react";
import './home.css'
import Posts from "../../components/Posts/posts";
import AddPost from "../../components/AddPost/addpost";

function Home (){
    const [imageSrc, setImageSrc] = useState(null);
    const [post, setPost] = useState([]);
    const [cargando, setCargando] = useState(true);
    const storedUser = JSON.parse(localStorage.getItem('userData'));

    useEffect(() => {
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
    
      console.log(post);

      const sortedPosts = post.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));


    return(
        <div className="Home">
            <header className="Home-header">
                <Top></Top>
            </header>
            <div className="Body">
            <AddPost onImageSelected={handleImageSelected} onImageSubmit={handleImageSubmit}/>
            {cargando ? <p>Cargando publicaciones...</p> : (
                <ul>
                  {sortedPosts.map((posts, index) => (
                    <Posts key={posts.id} idUser={posts.id_User} initialIsFollowing={false} initialLikes={10} imgPublicacion={posts.imageUrl} textPost={posts.text}></Posts>
                    
                  ))}
                </ul>
              )}
            </div>
        </div>
    );
}

export default Home;