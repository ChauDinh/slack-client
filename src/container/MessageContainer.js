import React from "react";
import Messages from "../components/Messages";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

const MessageContainer = ({ data: { loading, messages } }) =>
  loading ? null : (
    <Messages>
      <ul className="message-list">{JSON.stringify(messages)}</ul>
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
