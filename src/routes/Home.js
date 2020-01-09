import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

import Image from "../images/home.png";
import "./Home.css";

const allUsersQuery = gql`
  {
    allUsers {
      id
      email
      username
    }
  }
`;

function Home({ data: { allUsers = [] } }) {
  return (
    <React.Fragment>
      <div className="wrapper">
        <div className="main-rectangle">
          <img alt="" src={Image} className="image"></img>
          <header className="header">
            <div className="header__title">SlackQL</div>
          </header>
          <main className="content">
            <div className="content__slogan">
              Get your <br />
              work done. <br />
              Together.{" "}
            </div>
            <div className="content__description">
              Project management and <br />
              Collaboration made easy!
            </div>
          </main>
          <footer className="footer">
            <a className="footer__button" href="/login">
              Start Free
            </a>
          </footer>
        </div>
      </div>
    </React.Fragment>
  );
}

export default graphql(allUsersQuery)(Home);
