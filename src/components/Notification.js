import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

const newNotification = gql`
  subscription {
    newNotification
  }
`;

class Notification extends React.Component {
  componentWillReceiveProps({ data: { newNotification } }) {
    console.log(newNotification);
  }
  render() {
    return <div className="notification"></div>;
  }
}

export default graphql(newNotification)(Notification);
