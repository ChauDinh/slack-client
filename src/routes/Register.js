import React, { Component } from "react";
import { Container, Header, Input, Button } from "semantic-ui-react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

export class Register extends Component {
  state = {
    username: "",
    email: "",
    password: ""
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { username, email, password } = this.state;

    return (
      <Mutation mutation={registerMutation}>
        {mutate => (
          <Container text>
            <Header as="h2">Register</Header>
            <Input
              name="username"
              onChange={this.handleChange}
              value={username}
              placeholder="username"
              fluid
            />
            <Input
              name="email"
              onChange={this.handleChange}
              value={email}
              placeholder="email"
              fluid
            />
            <Input
              name="password"
              onChange={this.handleChange}
              value={password}
              placeholder="password"
              type="password"
              fluid
            />
            <Button
              onClick={async () => {
                const response = await mutate({ variables: this.state });
                console.log(response);
                this.props.history.push("/");
              }}
            >
              Register
            </Button>
          </Container>
        )}
      </Mutation>
    );
  }
}

const registerMutation = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

export default Register;
