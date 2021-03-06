import React from "react";
import styled from "styled-components";

import UserModal from "./UserModal";
import { socket } from "../routes/ViewTeam";

const Wrapper = styled.div`
  grid-column: 4;
  grid-row: 2;
  grid-row-end: 4;
  background: #fff;
  padding: 20px 20px;
  width: 240px;
  overflow-y: auto;
  border-left: 1px solid rgba(200, 200, 200, 0.5);
  @media (max-width: 1080px) {
    h3 {
      display: none;
    }
    p {
      display: none;
    }
    width: inherit;
    padding: 0 10px;
  }

  /* width */
  ::-webkit-scrollbar {
    width: 14px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background-color: #f3f3f3;
    background-clip: padding-box;
    border: 3px solid #fff;
    border-radius: 7px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background-color: #d3e1ef;
    background-clip: padding-box;
    border: 3px solid #fff;
    border-radius: 7px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

class OnlineUserWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onlineUsers: [],
    };
  }

  componentDidMount() {
    const { username } = this.props;
    socket.emit("joinRoom", { username: username });

    socket.on("getOnlineUsers", ({ onlineUsers }) => {
      this.setState({
        onlineUsers: onlineUsers,
      });
    });
  }

  componentDidUpdate() {
    socket.on("getOnlineUsers", ({ onlineUsers }) => {
      this.setState({
        onlineUsers: onlineUsers,
      });
    });
  }

  render() {
    const { onlineUsers } = this.state;

    return (
      <Wrapper>
        <h3 style={{ marginBottom: "20px" }}>
          Online Users ({onlineUsers.length})
        </h3>
        {onlineUsers.map((onlineUser) => (
          <UserModal key={onlineUser.id} name={onlineUser.username} />
        ))}
      </Wrapper>
    );
  }
}

export default OnlineUserWrapper;
