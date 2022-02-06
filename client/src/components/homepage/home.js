import React from "react";
import SearchForm from "../SearchForm/SearchForm";

import "./home.css";
import Card from "../UI/Card";
import Seach from "../Search/Search";

function Home() {
  return (
    <Card className="home">
      <br/> 
      <div className="container">
        <div className="row">
          <div className="col-5">
            <Seach />
          </div>
        </div>
      </div>
      <br/>
    </Card>
  );
}

export default Home;
