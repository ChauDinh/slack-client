import React, { Component } from "react";
import {
  Form,
  Container,
  Header,
  Input,
  Button,
  Message,
  FormField,
  Image
} from "semantic-ui-react";
import gql from "graphql-tag";
import styled from "styled-components";
import { graphql } from "react-apollo";

import RegisterImage from "../images/register.png";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;

  @media (max-width: 768px) {
    flex-direction: column;
    img {
      width: 100%;
      margin-bottom: 2rem;
      margin-top: 2rem;
    }
    .container {
      padding: 0 20px !important;
    }
    .header {
      font-size: 2rem !important;
      font-weight: 700 !important;
    }
  }
`;
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
      <Wrapper>
        <Image src={RegisterImage} width="50%" alt="register" />
        <Container
          text
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            height: "80%",
            width: "650px",
            padding: "0 4.55rem"
          }}
        >
          <Header
            as="h2"
            style={{
              fontWeight: "100",
              fontSize: "3.5rem",
              color: "#6124a6",
              fontFamily: "Open Sans"
            }}
          >
            Join with us today!
          </Header>
          <p style={{ fontSize: "1.4rem", color: "#a5a5a5" }}>
            Join a community of over 1 milion people helping connect the
            business and career we love.
          </p>
          {errorList.length ? (
            <Message
              error
              header="There was some errors with your submission"
              list={errorList}
            />
          ) : null}
          <Form style={{ width: "100%", marginBottom: "1rem" }}>
            <FormField error={!!usernameError}>
              <label style={{ color: "#474e5d", fontFamily: "Open Sans" }}>
                Username
              </label>
              <Input
                name="username"
                onChange={this.handleChange}
                value={username}
                placeholder="please enter your username..."
                transparent
                size="big"
                style={{
                  borderBottom: "1px solid #ddd"
                }}
              />
            </FormField>
            <FormField error={!!emailError}>
              <label style={{ color: "#474e5d", fontFamily: "Open Sans" }}>
                Email
              </label>
              <Input
                name="email"
                onChange={this.handleChange}
                value={email}
                placeholder="please enter your email..."
                transparent
                size="big"
                style={{
                  borderBottom: "1px solid #ddd"
                }}
              />
            </FormField>
            <FormField error={!!passwordError}>
              <label style={{ color: "#474e5d", fontFamily: "Open Sans" }}>
                Password
              </label>
              <Input
                name="password"
                onChange={this.handleChange}
                value={password}
                placeholder="password must be at least 6 characters long..."
                type="password"
                transparent
                size="big"
                style={{
                  borderBottom: "1px solid #ddd"
                }}
              />
            </FormField>
            <Button
              primary
              onClick={this.handleSubmit}
              style={{
                background: "#6124a6",
                borderRadius: "50px",
                fontSize: "1.2rem",
                fontWeight: "200",
                marginTop: "2rem"
              }}
            >
              Register
            </Button>
            <a
              href="/"
              style={{
                borderRadius: "50px",
                fontSize: "1.2rem",
                fontWeight: "200",
                color: "#6124a6",
                paddingLeft: "1rem"
              }}
            >
              Go to Homepage
            </a>
          </Form>
        </Container>
      </Wrapper>
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
