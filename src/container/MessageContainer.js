import React from "react";
import Messages from "../components/Messages";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

import { Comment } from "semantic-ui-react";

const MessageContainer = ({ data: { loading, messages } }) =>
  loading ? null : (
    <Messages>
      <Comment.Group>
        {messages.map(m => (
          <Comment key={`${m.id}-message`}>
            <Comment.Content>
              <Comment.Author as="a">{m.user.username}</Comment.Author>
              <Comment.Metadata>
                <div>{m.createdAt}</div>
              </Comment.Metadata>
              <Comment.Text>{m.text}</Comment.Text>
            </Comment.Content>
          </Comment>
        ))}
      </Comment.Group>
    </Messages>
  );

const messagesQuery = gql`
  query($channelId: Int!) {
    messages(channelId: $channelId) {
      id
      text
      user {
        username
      }
      createdAt
    }
  }
`;

export default graphql(messagesQuery, {
  variales: props => ({
    channelId: props.channelId
  })
})(MessageContainer);
