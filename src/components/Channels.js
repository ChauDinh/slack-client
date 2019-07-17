import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  grid-column: 2;
  grid-row: 1 / 4;
  background-color: #4e3a4c;
  color: #958993;
`;

const channel = ({ id, name }) => <li key={`channel-${id}`}>{`#${name}`}</li>;
const user = ({ id, name }) => <li key={`user-${id}`}>{name}</li>;

export default ({ teamName, userName, channels, users }) => (
  <Wrapper>
    <div>
      {teamName}
      {userName}
    </div>
    <div>
      <ul>
        <h4>Channels</h4>
        {channels.map(channel)}
      </ul>
    </div>
    <div>
      <ul>
        <h4>Direct Messages</h4>
        {users.map(user)}
      </ul>
    </div>
  </Wrapper>
);
