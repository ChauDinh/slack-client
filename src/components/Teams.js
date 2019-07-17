import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  grid-column: 1;
  grid-row: 1 / 4;
  background-color: #362234;
  color: #958993;
`;

const List = styled.ul`
  width: 100%;
  padding-left: 0;
  list-style: none;
`;

const ListItem = styled.li`
  height: 50px;
  width: 50px;
  background-color: #676066;
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
    border-color: #767676;
    cursor: pointer;
  }
`;

const team = ({ id, name }) => <ListItem key={`team-${id}`}>{name}</ListItem>;

export default ({ teams }) => (
  <Wrapper>
    <List>{teams.map(team)}</List>
  </Wrapper>
);
