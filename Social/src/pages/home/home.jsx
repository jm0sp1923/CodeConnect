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
                <Posts></Posts>
                <Posts></Posts>
            </div>
        </div>
    );
}

export default Home;