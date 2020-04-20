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
      when
    }
  }
`;

const StyledImage = styled.img`
  border-radius: 50%;
  margin-right: 10px;
`;

const StyledDate = styled.span`
  @media (max-width: 768px) {
    display: none !important;
  }
`;

const TextMessage = ({ url }) => {
  return <RenderText url={url} />;
};
const ImageMessage = ({ url }) => {
  return (
    <img
      style={{
        borderRadius: "5px",
        marginTop: "20px",
        boxShadow: "1px 1px 6px 1px rgba(0, 0, 0, 0.1)",
        width: "100%",
        height: "inherit",
        maxWidth: "350px",
        padding: "10px",
      }}
      width="350px"
      src={url}
      alt={url}
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
        fontWeight: "300",
        fontSize: "16px",
        fontFamily: "AvenirNext, sans-serif",
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
  constructor(props) {
    super(props);
    this.scroller = React.createRef();
  }

  state = {
    hasMoreItems: true,
  };

  // componentDidUpdate() {
  //   socket.on("notification", (notification) => console.log(notification));
  // }

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
      this.scroller.current &&
      this.scroller.current.scrollTop < 20 &&
      this.props.data.messages &&
      messages &&
      this.props.data.messages.length !== messages.length
    ) {
      // 35 items
      const heightBeforeRender = this.scroller.current.scrollHeight;
      setTimeout(() => {
        // wait for 70 items to render
        if (this.scroller.current) {
          this.scroller.current.scrollTop =
            this.scroller.current.scrollHeight - heightBeforeRender;
        }
      }, 100);
    }
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  subscribe = (channelId) => {
    return this.props.data.subscribeToMore({
      document: newChannelMessageSubscription,
      variables: { channelId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return { prev };
        return {
          ...prev,
          messages: [subscriptionData.data.newChannelMessage, ...prev.messages],
        };
      },
    });
  };

  handleScroll = () => {
    const {
      data: { messages, fetchMore },
      channelId,
    } = this.props;
    if (
      this.scroller &&
      this.scroller.current.scrollTop < 100 &&
      this.state.hasMoreItems &&
      messages.length >= 35
    ) {
      fetchMore({
        variables: {
          channelId,
          cursor: messages[messages.length - 1].created_at,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;

          if (fetchMoreResult.messages.length < 35) {
            this.setState({
              hasMoreItems: false,
            });
          }

          return {
            ...prev,
            messages: [...prev.messages, ...fetchMoreResult.messages],
          };
        },
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
      data: { loading, messages },
      channelId,
    } = this.props;

    if (!messages) {
      return <div>No message!</div>;
    }
    return loading ? null : (
      <Message onScroll={this.handleScroll} ref={this.scroller}>
        <FileUpload
          style={{
            display: "flex",
            flexDirection: "column-reverse",
          }}
          channelId={channelId}
          disableClick
        >
          <Comment.Group size="large" style={{ maxWidth: "100%" }}>
            {messages
              .slice()
              .reverse()
              .map((m) => (
                <Comment
                  key={`${m.id}-message`}
                  style={{
                    padding: "15px 1rem",
                    marginTop: "10px",
                    fontFamily: "AvenirNext, sans-serif",
                    fontSize: "16px",
                  }}
                >
                  <Comment.Content
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                    }}
                  >
                    <StyledImage
                      src={`https://api.adorable.io/avatars/30/${m.user.username}@adorable.io`}
                    />
                    <div>
                      <Comment.Author as="a">
                        <span
                          style={{
                            fontFamily: "AvenirNextDemi, sans-serif",
                            fontSize: "15px",
                          }}
                        >
                          {m.user.username}
                        </span>
                      </Comment.Author>
                      <Comment.Metadata>
                        <StyledDate className="date">{m.when}</StyledDate>
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
      when
    }
  }
`;

export default graphql(messagesQuery, {
  options: (props) => ({
    fetchPolicy: "network-only",
    variables: {
      channelId: props.channelId,
    },
  }),
})(MessageContainer);
