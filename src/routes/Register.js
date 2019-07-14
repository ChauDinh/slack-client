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
import { Mutation } from "react-apollo";

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
      <Mutation mutation={registerMutation}>
        {mutate => (
          <Container text>
            <Header as="h2">Register</Header>
            {usernameError || emailError || passwordError ? (
              <Message
                error
                header="There was some errors with your submission"
                list={errorList}
              />
            ) : null}
            <Form>
              <FormField>
                <label>Username</label>
                <Input
                  error={!!usernameError}
                  name="username"
                  onChange={this.handleChange}
                  value={username}
                  placeholder="username"
                  fluid
                />
              </FormField>
              <FormField>
                <label>Email</label>
                <Input
                  error={!!emailError}
                  name="email"
                  onChange={this.handleChange}
                  value={email}
                  placeholder="email"
                  fluid
                />
              </FormField>
              <FormField>
                <label>Password</label>
                <Input
                  error={!!passwordError}
                  name="password"
                  onChange={this.handleChange}
                  value={password}
                  placeholder="password"
                  type="password"
                  fluid
                />
              </FormField>
              <Button
                onClick={async () => {
                  this.setState({
                    usernameError: "",
                    emailError: "",
                    passwordError: ""
                  });
                  const { username, email, password } = this.state;
                  const response = await mutate({
                    variables: { username, email, password }
                  });
                  console.log(response);

                  const { ok, errors } = response.data.register;

                  if (ok) {
                    this.props.history.push("/");
                  } else {
                    const err = {};
                    errors.forEach(({ path, message }) => {
                      err[`${path}Error`] = message;
                    });
                    console.log(err);
                    this.setState(err);
                  }
                }}
              >
                Register
              </Button>
            </Form>
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
