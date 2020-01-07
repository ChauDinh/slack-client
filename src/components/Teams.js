import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Icon, Popup } from "semantic-ui-react";

const Wrapper = styled.div`
  grid-column: 1;
  grid-row: 1 / 4;
  background-color: #0f8deb;
  color: #d9cfd9;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow-y: auto;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
`;

const popStyle = {
  marginLeft: "4rem",
  height: "36px",
  display: "flex"
  // justifyContent: "center",
  // alignItems: "center"
};

const List = styled.ul`
  width: 100%;
  padding-left: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    padding-top: 0;
    margin-bottom: 10px;
  }
`;

const ListItem = styled.li`
  height: 36px;
  width: 36px;
  background-color: #fff;
  color: #0f8deb;
  margin: auto;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Helvetica Neue, sans-serif;
  font-size: 15px;
  font-weight: 500;
  border-radius: 50%;
  transition: all 0.3s ease-out;
  &:hover {
    border-radius: 10px;
    background: #00b5ad;
    color: #fff;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    font-size: 2rem;
    display: inline-block;
    text-align: center;
    padding-top: 16px;
    margin-left: 20px;
    background: #fff;
    font-family: "Arial";
    font-weight: 500;
    border-radius: 50%;
    &:hover {
      border-style: none;
      border-width: none;
      border-color: none;
      cursor: pointer;
    }
  }
`;

const Back = styled.div`
  color: #fff;
  display: block;
  margin-bottom: 50%;
  transform: translate(0, -50%);
  font-size: 20px;

  @media (max-width: 768px) {
    margin-bottom: 0;
    font-size: 1.5rem;
    margin-right: 20px;
  }
`;

const team = ({ id, letter, name }) => (
  <div
    key={`team-${id}`}
    style={{
      width: "36px",
      height: "36px",
      marginBottom: "20px"
    }}
  >
    <Link to={`/view-team/${id}`}>
      <Popup
        style={popStyle}
        trigger={<ListItem>{letter}</ListItem>}
        content={
          <div
            style={{
              fontSize: "14px",
              fontWeight: "500",
              fontFamily: "Helvetica, sans-serif"
            }}
          >
            {name}
          </div>
        }
        basic
        position="right center"
        inverted
      />
    </Link>
  </div>
);

export default ({ teams }) => (
  <Wrapper>
    <List>
      {teams.map(team)}
      <Link key="add-team" to={`/create-team`}>
        <ListItem style={{ background: "#00b5ad", color: "#fff" }}>+</ListItem>
      </Link>
    </List>

    <Link
      key="home"
      to={`/`}
      style={{ marginTop: "50px", marginBottom: "20px", display: "block" }}
    >
      <Back>
        <Icon style={{ color: "#fff" }} name="home" />
      </Back>
    </Link>
  </Wrapper>
);
