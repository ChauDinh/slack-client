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
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  background: #f8f9fb;

  @media (max-width: 768px) {
    flex-direction: column;
    img {
      width: 100%;
      margin-bottom: 2rem;
      margin-top: 2rem;
    }
    .container {
      padding: 0 20px !important;
      width: 100% !important;
    }
    .header {
      font-size: 2rem !important;
      font-weight: 700 !important;
    }
  }
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

    this.goBack = this.goBack.bind(this);
  }

  handleChange = e => {
    const { name, value } = e.target;
    this[name] = value;
  };

  goBack = () => {
    this.props.history.goBack();
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
            alignItems: "flex-start",
            justifyContent: "center",
            height: "80%",
            width: "100% !important",
            padding: "0 4.55rem"
          }}
        >
          <div style={{ width: "100%" }}>
            <Header
              as="h2"
              style={{
                fontWeight: "500",
                fontSize: "3.5rem",
                color: "#0878CB",
                fontFamily: "Helvetica Neue",
                marginBottom: "50px"
              }}
            >
              Login
            </Header>
            {errorList.length ? (
              <Message
                error
                header="There was some errors with your submission"
                list={errorList}
              />
            ) : null}
            <Form style={{ width: "100%" }}>
              <FormField error={!!emailError}>
                <label
                  style={{
                    color: "#474e5d",
                    fontFamily: "Helvetica Neue",
                    fontSize: "15px",
                    fontWeight: "700"
                  }}
                >
                  Email
                </label>
                <Input
                  name="email"
                  onChange={this.handleChange}
                  value={email}
                  transparent
                  size="small"
                  style={{
                    borderBottom: "1px solid #ddd"
                  }}
                />
              </FormField>
              <FormField error={!!passwordError}>
                <label
                  style={{
                    color: "#474e5d",
                    fontFamily: "Helvetica Neue",
                    fontSize: "15px",
                    fontWeight: "700"
                  }}
                >
                  Password
                </label>
                <Input
                  name="password"
                  onChange={this.handleChange}
                  value={password}
                  type="password"
                  transparent
                  size="small"
                  style={{
                    borderBottom: "1px solid #ddd"
                  }}
                />
              </FormField>
              <a
                href="/register"
                style={{
                  borderRadius: "50px",
                  fontSize: "1.2rem",
                  fontWeight: "200",
                  color: "#0878CB",
                  padding: "0.785714em 1.5em 0 0",
                  display: "block"
                }}
              >
                Do not have account?
              </a>
              <Button
                primary
                onClick={this.handleSubmit}
                style={{
                  background: "#0878CB",
                  borderRadius: "50px",
                  fontSize: "1.2rem",
                  fontWeight: "200",
                  marginTop: "2rem",
                  marginRight: "20px"
                }}
              >
                Login
              </Button>
              <Button
                secondary
                style={{
                  borderRadius: "50px",
                  fontSize: "1.2rem",
                  fontWeight: "200",
                  marginTop: "2rem"
                }}
                onClick={this.goBack}
              >
                Go Back
              </Button>
            </Form>
          </div>
        </Container>
        {/* <Image src={LoginImage} width="50%" alt="login" /> */}
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
