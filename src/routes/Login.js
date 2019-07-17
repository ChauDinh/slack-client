import React, { Component } from "react";
import { observer } from "mobx-react";
import { extendObservable } from "mobx";
import {
  Input,
  Button,
  Container,
  Header,
  Form,
  FormField,
  Message
} from "semantic-ui-react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

export default observer(
  class Login extends Component {
    constructor(props) {
      super(props);

      extendObservable(this, {
        // passing the state we want to use
        // we use email and password for the login action
        email: "",
        password: "",
        errors: {}
      });
    }

    handleChange = e => {
      const { name, value } = e.target;
      this[name] = value;
    };

    render() {
      const {
        email,
        password,
        errors: { emailError, passwordError }
      } = this;

      let errorList = [];

      if (emailError) {
        errorList.push(emailError);
      }
      if (passwordError) {
        errorList.push(passwordError);
      }

      return (
        <Mutation mutation={loginMutation}>
          {mutate => (
            <Container text>
              <Header as="h2">Login</Header>
              {errorList.length ? (
                <Message
                  error
                  header="There was some errors with your submission"
                  list={errorList}
                />
              ) : null}
              <Form>
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
                <Button
                  onClick={async () => {
                    const { email, password } = this;
                    const response = await mutate({
                      variables: { email, password }
                    });
                    console.log(response);

                    const {
                      ok,
                      token,
                      refreshToken,
                      errors
                    } = response.data.login;
                    if (ok) {
                      localStorage.setItem("token", token);
                      localStorage.setItem("refreshToken", refreshToken);
                      this.props.history.push("/");
                    } else {
                      const err = {};
                      errors.forEach(({ path, message }) => {
                        err[`${path}Error`] = message;
                      });

                      this.errors = err;
                    }
                  }}
                >
                  Login
                </Button>
              </Form>
            </Container>
          )}
        </Mutation>
      );
    }
  }
);

const loginMutation = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      token
      refreshToken
      errors {
        path
        message
      }
    }
  }
`;