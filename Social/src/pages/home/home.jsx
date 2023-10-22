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
                <Posts key={1} idUser={"jelty"} initialIsFollowing={true} initialLikes={10} imgPublicacion={"https://random.imagecdn.app/v1/image?width=500&height=150"}></Posts>
                <Posts key={2} idUser={"benjyfishi"} initialIsFollowing={false} initialLikes={126} imgPublicacion={""}></Posts>
            </div>
        </div>
    );
}

export default Home;
