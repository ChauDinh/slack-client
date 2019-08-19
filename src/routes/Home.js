import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import "./Home.css";
import Logo from "../images/Logo.svg";
import MenuButton from "../images/menu.svg";

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
        {/* {allUsers.map(user => (
          <h1 key={user.id}>{user.email}</h1>
        ))} */}
        <aside className="nav-bar">
          <img id="menu-button" src={MenuButton} alt="menu-button" />
          <figure>
            <div className="avatar" />
            <figcaption>hello, guest!</figcaption>
          </figure>
        </aside>
        <nav className="active">
          <ul>
            <li>
              <a href="/register">register</a>
            </li>
            <li>
              <a href="/login">login</a>
            </li>
            <li>
              <a href="/view-team">teams</a>
            </li>
            <li>
              <a href="#">privacy</a>
            </li>
          </ul>
        </nav>
        <main className="main">
          <img className="logo" src={Logo} alt="logo" />
          <h1 className="title">Hi, I’m a web application for chatting</h1>
          <p className="subtitle">
            You design things and then want to share it on the browser… yeah!{" "}
            <br /> <br />
            <span>
              <a href="/register">Join with us today!</a>
            </span>
          </p>
          <button className="create-team__button">create team</button>
        </main>
        <footer className="footer">
          <p>Created by ChauDinh @ 2019</p>
        </footer>
      </div>
    </React.Fragment>
  );
}

export default graphql(allUsersQuery)(Home);
