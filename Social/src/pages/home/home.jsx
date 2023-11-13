import Top from "../../components/top/top";
import React, {useState} from "react";
import './home.css'
import Posts from "../../components/Posts/posts";
import AddPost from "../../components/AddPost/addpost";

function Home (){
    const [imageSrc, setImageSrc] = useState(null);

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
    
    return(
        <div className="Home">
            <header className="Home-header">
                <Top></Top>
            </header>
            <div className="Body">
                <AddPost onImageSelected={handleImageSelected} onImageSubmit={handleImageSubmit}/>
                <Posts key={1} idUser={"jelty"} initialIsFollowing={true} initialLikes={10} imgPublicacion={imageSrc}></Posts>
            </div>
        </div>
    );
}

export default Home;
