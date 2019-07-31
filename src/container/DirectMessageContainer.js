import React from "react";
import Messages from "../components/Messages";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

import { Comment } from "semantic-ui-react";

class DirectMessageContainer extends React.Component {
  // componentWillMount() {
  //   this.unsubscribe = this.subscribe(this.props.channelId);
  // }

  // componentWillReceiveProps({ channelId }) {
  //   if (this.props.channelId !== channelId) {
  //     if (this.unsubscribe) {
  //       this.unsubscribe();
  //     }
  //     this.unsubscribe = this.subscribe(channelId);
  //   }
  // }

  // componentWillUnmount() {
  //   if (this.unsubscribe) {
  //     this.unsubscribe();
  //   }
  // }

  // subscribe = channelId => {
  //   return this.props.data.subscribeToMore({
  //     document: newChannelMessageSubscription,
  //     variables: { channelId },
  //     updateQuery: (prev, { subscriptionData }) => {
  //       if (!subscriptionData) return { prev };
  //       return {
  //         ...prev,
  //         messages: [...prev.messages, subscriptionData.data.newChannelMessage]
  //       };
  //     }
  //   });
  // };
  render() {
    const {
      data: { loading, directMessages }
    } = this.props;

    return loading ? null : (
      <Messages>
        <Comment.Group>
          {directMessages.map(m => (
            <Comment key={`${m.id}-direct-message`}>
              <Comment.Content>
                <Comment.Author as="a">{m.sender.username}</Comment.Author>
                <Comment.Metadata>
                  <div>{m.createdAt}</div>
                </Comment.Metadata>
                <Comment.Text>{m.text}</Comment.Text>
                <Comment.Actions>
                  <Comment.Action>Reply</Comment.Action>
                </Comment.Actions>
              </Comment.Content>
            </Comment>
          ))}
        </Comment.Group>
      </Messages>
    );
  }
}

const directmessagesQuery = gql`
  query($teamId: Int!) {
    directMessages(teamId: $teamId, otherUserId: 5) {
      id
      sender {
        username
      }
      text
      created_at
    }
  }
`;

export default graphql(directmessagesQuery, {
  variales: props => ({
    teamId: props.teamId,
    otherUserId: 5
  }),
  options: {
    fetchPolicy: "network-only"
  }
})(DirectMessageContainer);
