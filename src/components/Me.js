import React from "react";
import styled from "styled-components";
import { Image, Icon, Transition } from "semantic-ui-react";

const Wrapper = styled.div`
  grid-column: 2;
  grid-row: 3 / 4;
  background-color: #f4f7fa;
  color: #000;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
      isOpen: false
    };

    this.toggleBar = this.toggleBar.bind(this);
  }

  toggleBar() {
    this.setState({
      isOpen: !this.state.isOpen
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
              backgroundColor: "#f4f7fa",
              position: "absolute",
              top: "0",
              left: "0",
              width: "50vw",
              height: "100vh",
              zIndex: 100,
              display: "flex",
              flexDirection: "row"
            }}
          >
            This is the sidebar
            <button onClick={() => this.toggleBar()}>X</button>
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
            border: "2px solid #0f68b9",
            padding: "3px"
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
            color: "#0f68b9",
            zIndex: 2
          }}
        >
          {username}
          <span
            style={{
              fontSize: "13px",
              fontWeight: "lighter",
              color: "#6899bd"
            }}
          >
            member
          </span>
        </div>
        <div>
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
