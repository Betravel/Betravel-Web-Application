import React from "react";
import SearchForm from "../SearchForm/SearchForm";

import "./home.css";
import Card from "../UI/Card";

function Home() {
  return (
    <div>
      <Card className="home">
        <div className="headerContainer">
          <SearchForm />
        </div>
      </Card>
    </div>
  );
}

export default Home;
