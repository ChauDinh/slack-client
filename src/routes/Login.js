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
import styled from "styled-components";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

import { wsLink } from "../apollo";

const Wrapper = styled.div`
  padding: auto, 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
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

  handleSubmit = async () => {
    const { email, password } = this;
    const response = await this.props.mutate({
      variables: { email, password }
    });
    console.log(response);

    const { ok, token, refreshToken, errors } = response.data.login;
    if (ok) {
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
      wsLink.subscriptionClient.tryReconnect();
      this.props.history.push("/view-team");
    } else {
      const err = {};
      errors.forEach(({ path, message }) => {
        err[`${path}Error`] = message;
      });

      this.errors = err;
    }
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
      <Wrapper>
        <Container
          text
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <div style={{ width: "100%" }}>
            <Header as="h2">Login</Header>
            {errorList.length ? (
              <Message
                error
                header="There was some errors with your submission"
                list={errorList}
              />
            ) : null}
            <Form style={{ width: "100%" }}>
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
                primary
                onClick={this.handleSubmit}
                style={{
                  marginLeft: "50%",
                  transform: "translate(-50%, 0)",
                  boxShadow: "1px 1px 4px 2px rgb(145, 146, 146)"
                }}
              >
                Login
              </Button>
            </Form>
          </div>
        </Container>
      </Wrapper>
    );
  }
}

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

export default graphql(loginMutation)(observer(Login));
