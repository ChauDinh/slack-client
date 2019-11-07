import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

import Image from "../images/chatting-application.svg";
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
        <header className="header-home">
          <h1 className="logo" style={{ color: "#000" }}>
            <span style={{ color: "#00b5ad" }}>Graph.</span>Chat
          </h1>
          <div className="menu">
            <ul>
              <li>
                <a href="/view-team">chat room</a>
              </li>
              <li>
                <a href="/register">register</a>
              </li>
              <li>
                <a href="/login">login</a>
              </li>

              <li>
                <a href="/faq">faq</a>
              </li>
            </ul>
          </div>

          <div className="menu-toggled">
            <ul>
              <li>
                <a href="/view-team">chat room</a>
              </li>
              <li>
                <a href="/register">register</a>
              </li>
              <li>
                <a href="/login">login</a>
              </li>

              <li>
                <a href="/faq">faq</a>
              </li>
            </ul>
          </div>
        </header>
        <main className="main">
          <h1 className="title">says what in your mind.</h1>
          <p className="sub-title">
            The Next Level of conversations on the Internet
          </p>
          <a style={{ color: "#f4f7fa" }} href="/create-team">
            <button
              style={{
                padding: "1rem 2rem",
                borderRadius: "5px",
                cursor: "pointer",
                background: "#00b5ad",
                color: "#f4f7fa",
                border: "none",
                ":focus": {
                  outline: "none"
                }
              }}
            >
              GET STARTED
            </button>{" "}
          </a>
          <img
            src={Image}
            width="400px"
            alt="home"
            style={{ marginTop: "1rem" }}
          />
        </main>
        <footer className="footer">
          <h5>
            Why <span style={{ color: "#00b5ad" }}>Graph.</span>Chat
          </h5>
          <p className="slogan">It's so simple. It's a single endpoint!</p>
        </footer>
      </div>
    </React.Fragment>
  );
}

export default graphql(allUsersQuery)(Home);
