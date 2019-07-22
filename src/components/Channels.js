import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  grid-column: 2;
  grid-row: 1 / 4;
  background-color: #3e103f;
  color: #d9cfd9;
`;

const Header = styled.h1`
  color: #f5f5f5;
  font-size: 20px;
`;

const List = styled.ul`
  width: 100%;
  list-style: none;
  padding-left: 0;
`;

const paddingLeft = "padding-left: 10px";

const ListItem = styled.li`
  padding: 2px;
  ${paddingLeft};
  &:hover {
    background: #3e313c;
  }
`;

const ListHeader = styled.li`
  ${paddingLeft}
`;

const PushLeft = styled.div`
  ${paddingLeft}
`;

const Green = styled.span`
  color: #38978d;
`;

const Circle = ({ on = true }) => (on ? <Green>❤︎</Green> : "❤");

const channel = ({ id, name }) => (
  <ListItem key={`channel-${id}`}>{`#${name}`}</ListItem>
);
const user = ({ id, name }) => (
  <ListItem key={`user-${id}`}>
    <Circle /> {name}
  </ListItem>
);

export default ({ teamName, userName, channels, users }) => (
  <Wrapper>
    <PushLeft>
      <Header>{teamName}</Header>
      {userName}
    </PushLeft>
    <div>
      <List>
        <ListHeader>Channels</ListHeader>
        {channels ? channels.map(channel) : null}
      </List>
    </div>
    <div>
      <List>
        <ListHeader>Direct Messages</ListHeader>
        {users.map(user)}
      </List>
    </div>
  </Wrapper>
);
