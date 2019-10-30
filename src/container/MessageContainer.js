import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Comment } from "semantic-ui-react";
import styled from "styled-components";

import FileUpload from "../components/FileUpload";
import RenderText from "../components/RenderText";
import Message from "../components/Messages";

const newChannelMessageSubscription = gql`
  subscription($channelId: Int!) {
    newChannelMessage(channelId: $channelId) {
      id
      text
      user {
        username
      }
      url
      filetype
      created_at
    }
  }
`;

const StyledImage = styled.img`
  border-radius: 50%;
  margin-right: 1rem;
`;

const TextMessage = ({ url }) => {
  return <RenderText url={url} />;
};
const ImageMessage = ({ url }) => {
  return (
    <img
      style={{
        borderRadius: "8px",
        margin: ".25rem 0 .5rem"
      }}
      width="350px"
      src={url}
      alt="sdfghjk5678"
    />
  );
};
const AudioMessage = ({ url, filetype }) => {
  return (
    <div>
      <audio controls>
        <source src={url} type={filetype} />
      </audio>
    </div>
  );
};

const VideoMessage = ({ url, filetype }) => {
  return (
    <div>
      <video width="420" height="240" controls>
        <source src={url} type={filetype} />
      </video>
    </div>
  );
};
const NormalMessage = ({ text }) => {
  return (
    <Comment.Text
      style={{
        fontWeight: "300"
      }}
    >
      {text}
    </Comment.Text>
  );
};

const DisplayMessage = ({ message: { url, text, filetype } }) => {
  if (url) {
    if (filetype.startsWith("image/")) {
      return <ImageMessage url={url} />;
    } else if (filetype === "text/plain") {
      return <TextMessage url={url} />;
    } else if (filetype.startsWith("audio/")) {
      return <AudioMessage url={url} filetype={filetype} />;
    } else if (filetype.startsWith("video/")) {
      return <VideoMessage url={url} filetype={filetype} />;
    }
  }
  return <NormalMessage text={text} />;
};

class MessageContainer extends React.Component {
  state = {
    hasMoreItems: true
  };

  componentWillMount() {
    this.unsubscribe = this.subscribe(this.props.channelId);
  }

  componentWillReceiveProps({ data: { messages }, channelId }) {
    if (this.props.channelId !== channelId) {
      if (this.unsubscribe) {
        this.unsubscribe();
      }
      this.unsubscribe = this.subscribe(channelId);
    }

    if (
      this.scroller &&
      this.scroller.scrollTop < 20 &&
      this.props.data.messages &&
      messages &&
      this.props.data.messages.length !== messages.length
    ) {
      // 35 items
      const heightBeforeRender = this.scroller.scrollHeight;
      setTimeout(() => {
        // wait for 70 items to render
        if (this.scroller) {
          this.scroller.scrollTop =
            this.scroller.scrollHeight - heightBeforeRender;
        }
      }, 120);
    }
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  subscribe = channelId => {
    return this.props.data.subscribeToMore({
      document: newChannelMessageSubscription,
      variables: { channelId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return { prev };
        return {
          ...prev,
          messages: [subscriptionData.data.newChannelMessage, ...prev.messages]
        };
      }
    });
  };

  handleScroll = () => {
    const {
      data: { messages, fetchMore },
      channelId
    } = this.props;
    if (
      this.scroller &&
      this.scroller.scrollTop < 100 &&
      this.state.hasMoreItems &&
      messages.length >= 35
    ) {
      fetchMore({
        variables: {
          channelId,
          cursor: messages[messages.length - 1].created_at
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;

          if (fetchMoreResult.messages.length < 35) {
            this.setState({ hasMoreItems: false });
          }

          return {
            ...prev,
            messages: [...prev.messages, ...fetchMoreResult.messages]
          };
        }
      });
    }
  };

  getRandomHex() {
    let length = 3;
    let chars = "0123456789ABCDEF";
    let hex = "";
    while (length--) hex += chars[(Math.random() * 16) | 0];
    return hex;
  }

  render() {
    const {
      data: { loading, messages, fetchMore },
      channelId,
      username
    } = this.props;

    return loading ? null : (
      <Message
        onScroll={this.handleScroll}
        ref={scroller => {
          this.scroller = scroller;
        }}
      >
        <FileUpload
          style={{
            display: "flex",
            flexDirection: "column-reverse"
          }}
          channelId={channelId}
          disableClick
        >
          <Comment.Group size="large" style={{ maxWidth: "100%" }}>
            {messages
              .slice()
              .reverse()
              .map(m => (
                <Comment key={`${m.id}-message`}>
                  <Comment.Content
                    style={{
                      borderBottom: "1px solid lightgray",
                      paddingBottom: "1.75rem",
                      marginTop: "1rem",
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "flex-start"
                    }}
                  >
                    {/* <Comment.Avatar
                      src={`https://api.adorable.io/avatars/40/${m.user.username}@adorable.png`}
                      style={{
                        marginRight: "1rem",
                        styledImage
                      }}
                    /> */}
                    <StyledImage
                      src={`https://api.adorable.io/avatars/40/${m.user.username.toUpperCase()}dYHDDWmw99`}
                    />
                    <div>
                      <Comment.Author as="a">
                        <span
                          style={
                            m.user.username === username
                              ? { fontWeight: "600" }
                              : {
                                  fontWeight: "600",
                                  color: "#333"
                                }
                          }
                        >
                          {m.user.username}
                        </span>
                      </Comment.Author>
                      <Comment.Metadata>
                        <div>Today at 5:42PM</div>
                      </Comment.Metadata>
                      <br />
                      <DisplayMessage message={m} />
                    </div>
                  </Comment.Content>
                </Comment>
              ))}
          </Comment.Group>
        </FileUpload>{" "}
      </Message>
    );
  }
}

const messagesQuery = gql`
  query($channelId: Int!, $cursor: String) {
    messages(channelId: $channelId, cursor: $cursor) {
      id
      text
      user {
        username
      }
      url
      filetype
      created_at
    }
  }
`;

export default graphql(messagesQuery, {
  options: props => ({
    fetchPolicy: "network-only",
    variables: {
      channelId: props.channelId
    }
  })
})(MessageContainer);
