import React from "react";
import styled from "styled-components";
import { Image, Icon, Transition, List, ListHeader } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { Context } from "../routes/ViewTeam";

const Wrapper = styled.div`
  grid-column: 2;
  grid-row: 3 / 4;
  background-color: #fff;
  color: #000;
  padding: 10px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  border-top: 1px solid rgba(200, 200, 200, 0.5);
  border-right: 1px solid rgba(200, 200, 200, 0.5);
  z-index: 1;
  button {
    display: none;
  }

  @media (max-width: 768px) {
    display: flex;
    background: #e4f3ff;
    align-items: center;
    flex-shrink: 0;
    box-shadow: 0px 3px 10px lightgrey;
    padding: 5px 20px;
    img {
      width: 30px;
      height: 30px;
      padding: 1px !important;
      border: none !important;
    }
    font-size: 15px !important;
    span {
      display: none;
    }
    button {
      display: block;
      background: transparent;
      border: none;
      cursor: pointer;
      margin-right: 10px;
    }
    .me-info {
      justify-content: center !important;
    }
  }
`;

class Me extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };

    this.toggleBar = this.toggleBar.bind(this);
  }

  toggleBar() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    const { username } = this.props;
    const isVisible = this.state.isOpen;
    return (
      <Wrapper>
        <Transition visible={isVisible} animation="fade right" duration={500}>
          <div
            style={{
              width: "300px",
              height: "100vh",
              overflow: "auto",
              zIndex: "100",
              position: "absolute",
              top: "0",
              left: "0",
              background: "#f4f7fa",
              display: "flex",
              boxShadow: "0px 3px 10px rgb(219, 227, 232)",
              padding: "0 10px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "rgba(202, 202, 202, 0.2)",
                marginTop: "10px",
                borderRadius: "5px",
              }}
            >
              <p
                style={{
                  margin: "10px 20px",
                  fontSize: "18px",
                  fontWeight: "700",
                  color: "#0878cb",
                }}
              >
                SlackQL
              </p>
              <button
                onClick={() => this.toggleBar()}
                style={{
                  color: "#f4f7fa",
                  background: "#0878cb",
                  borderRadius: "50px",
                  padding: "2px 5px 2px 5px",
                  boxShadow: "3px 3px 5px rgb(168, 196, 216)",
                }}
              >
                <Icon name="arrow left" />
              </button>
            </div>
            <Context.Consumer className="sidebar-mobile">
              {({ teams, team, username, currentUserId }) => {
                const regularChannels = [];
                const dmChannels = [];

                team.channels.forEach((channel) => {
                  if (channel.dm) {
                    dmChannels.push(channel);
                  } else {
                    regularChannels.push(channel);
                  }
                });

                return [
                  <List key="team">
                    <ListHeader
                      style={{
                        marginBottom: "15px",
                        fontSize: "18px",
                        color: "#333",
                        fontWeight: "900",
                      }}
                    >
                      Teams
                    </ListHeader>
                    <div>
                      {teams.map((team) => (
                        <Link
                          key={team.id}
                          to={`/view-team/${team.id}`}
                          style={{
                            background: "rgba(200, 200, 200, 0.2)",
                            padding: "5px 10px",
                            display: "block",
                            borderRadius: "5px",
                            marginBottom: "5px",
                            fontWeight: "700",
                          }}
                        >
                          {team.name}
                        </Link>
                      ))}
                    </div>
                  </List>,
                  <List key="channel">
                    <ListHeader
                      style={{
                        marginBottom: "15px",
                        fontSize: "18px",
                        color: "#333",
                        fontWeight: "900",
                      }}
                    >
                      Channels
                    </ListHeader>
                    <div>
                      {regularChannels.map((channel) => (
                        <Link
                          key={channel.id}
                          to={`/view-team/${team.id}/${channel.id}`}
                          style={{
                            background: "rgba(200, 200, 200, 0.2)",
                            padding: "5px 10px",
                            display: "block",
                            borderRadius: "5px",
                            marginBottom: "5px",
                            fontWeight: "700",
                          }}
                        >
                          {channel.name}
                        </Link>
                      ))}
                    </div>
                  </List>,
                  <List key="direct-message">
                    <ListHeader
                      style={{
                        marginBottom: "15px",
                        fontSize: "18px",
                        color: "#333",
                        fontWeight: "900",
                      }}
                    >
                      Direct Messages
                    </ListHeader>
                    <div>
                      {dmChannels.map((dm) => (
                        <Link
                          key={dm.id}
                          to={`/view-team/${team.id}/${dm.id}`}
                          style={{
                            background: "rgba(200, 200, 200, 0.2)",
                            padding: "5px 10px",
                            display: "block",
                            borderRadius: "5px",
                            marginBottom: "5px",
                            fontWeight: "700",
                          }}
                        >
                          {dm.name}
                        </Link>
                      ))}
                    </div>
                  </List>,
                ];
              }}
            </Context.Consumer>
          </div>
        </Transition>

        <button onClick={() => this.toggleBar()}>
          <Icon name="align justify" size="large" color="blue" />
        </button>
        <Image
          src={`https://api.adorable.io/avatars/40/${username}@adorable.io`}
          style={{
            borderRadius: "50%",
            margin: "5px",
          }}
        />
        <div
          className="me-info"
          style={{
            flexGrow: "1",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            height: "100%",
            padding: "8px",
            fontFamily: "sans-serif",
            fontSize: "16px",
            fontWeight: "bolder",
            paddingLeft: "7px",
            color: "#000",
            zIndex: 2,
          }}
        >
          {username}
          <span
            style={{
              fontSize: "13px",
              fontWeight: "lighter",
              color: "#000",
            }}
          >
            #000
          </span>
        </div>
        <div style={{ marginTop: "10px" }}>
          <Icon
            name="volume up"
            style={{ marginRight: "10px" }}
            color="black"
          />
          <Icon name="microphone" color="black" />
        </div>
      </Wrapper>
    );
  }
}

export default Me;
