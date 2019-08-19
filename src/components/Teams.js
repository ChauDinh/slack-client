import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  grid-column: 1;
  grid-row: 1 / 4;
  background-color: #449fa7;
  color: #d9cfd9;
`;

const List = styled.ul`
  width: 100%;
  padding-left: 0;
  list-style: none;
`;

const ListItem = styled.li`
  height: 50px;
  width: 50px;
  background-color: #388e94;
  color: #fff;
  margin: auto;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  border-radius: 11px;
  &:hover {
    border-style: solid;
    border-width: thick;
    border-color: #16939c;
    cursor: pointer;
  }
`;

const team = ({ id, letter }) => (
  <Link key={`team-${id}`} to={`/view-team/${id}`}>
    <ListItem>{letter}</ListItem>
  </Link>
);

export default ({ teams }) => (
  <Wrapper>
    <List>
      {teams.map(team)}
      <Link key="add-team" to={`/create-team`}>
        <ListItem>+</ListItem>
      </Link>
    </List>
  </Wrapper>
);
