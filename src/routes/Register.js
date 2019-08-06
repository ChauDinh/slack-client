import React, { Component } from "react";
import {
  Form,
  Container,
  Header,
  Input,
  Button,
  Message,
  FormField
} from "semantic-ui-react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

export class Register extends Component {
  state = {
    username: "",
    usernameError: "",
    email: "",
    emailError: "",
    password: "",
    passwordError: ""
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async () => {
    this.setState({
      usernameError: "",
      emailError: "",
      passwordError: ""
    });
    const { username, email, password } = this.state;
    const response = await this.props.mutate({
      variables: { username, email, password }
    });
    console.log(response);

    const { ok, errors } = response.data.register;

    if (ok) {
      this.props.history.push("/login");
    } else {
      const err = {};
      errors.forEach(({ path, message }) => {
        err[`${path}Error`] = message;
      });
      console.log(err);
      this.setState(err);
    }
  };

  render() {
    const {
      username,
      usernameError,
      email,
      emailError,
      password,
      passwordError
    } = this.state;

    // Listing error messages
    let errorList = [];
    if (usernameError) {
      errorList.push(usernameError);
    }
    if (emailError) {
      errorList.push(emailError);
    }
    if (passwordError) {
      errorList.push(passwordError);
    }

    return (
      <Container text>
        <Header as="h2">Register</Header>
        {errorList.length ? (
          <Message
            error
            header="There was some errors with your submission"
            list={errorList}
          />
        ) : null}
        <Form>
          <FormField error={!!usernameError}>
            <label>Username</label>
            <Input
              name="username"
              onChange={this.handleChange}
              value={username}
              placeholder="username"
              fluid
            />
          </FormField>
          <FormField error={!!emailError}>
            <label>Email</label>
            <Input
              name="email"
              onChange={this.handleChange}
              value={email}
              placeholder="email"
              fluid
            />
          </FormField>
          <FormField error={!!passwordError}>
            <label>Password</label>
            <Input
              name="password"
              onChange={this.handleChange}
              value={password}
              placeholder="password"
              type="password"
              fluid
            />
          </FormField>
          <Button onClick={this.handleSubmit}>Register</Button>
        </Form>
      </Container>
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

export default graphql(registerMutation)(Register);
