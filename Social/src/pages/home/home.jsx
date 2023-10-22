import Top from "../../components/top/top";
import React from "react";
import './home.css'
import Posts from "../../components/Posts/posts";

function Home (){
    return(
        <div className="Home">
            <header className="Home-header">
                <Top></Top>
            </header>
            <div className="Body">
                <Posts idUser={"jelty"} initialIsFollowing={false} initialLikes={10} imgPublicacion={"https://random.imagecdn.app/v1/image?width=500&height=150"}></Posts>
                <Posts idUser={"benjyfishi"} initialIsFollowing={true} initialLikes={126} imgPublicacion={"https://picsum.photos/200/200"}></Posts>
            </div>
        </div>
    );
}

export default Home;