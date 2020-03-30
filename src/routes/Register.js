import React, { Component } from "react";
import {
  Form,
  Container,
  Header,
  Input,
  Button,
  Message,
  FormField,
  Icon
} from "semantic-ui-react";
import gql from "graphql-tag";
import styled from "styled-components";
import { graphql } from "react-apollo";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fff;

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

  goBack = () => {
    this.props.history.push("/");
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
        <header
          className="header"
          style={{
            display: "block",
            width: "100vw",
            padding: "20px",
            boxShadow: "0px 3px 6px rgba(200, 200, 200, 0.2)"
          }}
        >
          <div
            className="header__title"
            style={{
              fontSize: "20px",
              fontWeight: "900",
              fontFamily: "AvenirNextDemi"
            }}
          >
            SlackQL
          </div>
        </header>
        <Container
          text
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "100%",
            flexGrow: 1
          }}
        >
          <Header
            as="h2"
            style={{
              fontWeight: "500",
              fontSize: "3.5rem",
              color: "#000",
              fontFamily: "AvenirNextDemi, sans-serif",
              marginBottom: "10px"
            }}
          >
            Sign Up, It's Free!
          </Header>
          {errorList.length ? (
            <Message
              error
              header="There was some errors with your submission"
              list={errorList}
            />
          ) : null}
          <Form
            autoComplete="off"
            style={{
              width: "500px",
              marginBottom: "1rem",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <FormField error={!!usernameError}>
              <label
                style={{
                  color: "#474e5d",
                  fontFamily: "AvenirNext, sans-serif",
                  fontSize: "15px",
                  fontWeight: "700"
                }}
              >
                Username
              </label>
              <Input
                name="username"
                onChange={this.handleChange}
                value={username}
                transparent
                size="small"
                style={{
                  borderBottom: "1px solid #ddd",
                  width: "100%"
                }}
              />
            </FormField>
            <FormField error={!!emailError}>
              <label
                style={{
                  color: "#474e5d",
                  fontFamily: "AvenirNext, sans-serif",
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
                  borderBottom: "1px solid #ddd",
                  width: "100%"
                }}
              />
            </FormField>
            <FormField error={!!passwordError}>
              <label
                style={{
                  color: "#474e5d",
                  fontFamily: "AvenirNext, sans-serif",
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
                  borderBottom: "1px solid #ddd",
                  width: "100%"
                }}
              />
            </FormField>
            <div style={{ display: "block" }}>
              Do have account?
              <a
                href="/login"
                style={{
                  borderRadius: "50px",
                  fontWeight: "200",
                  color: "#0878CB",
                  padding: "0.785714em 1.5em 0 0",
                  marginLeft: "10px"
                }}
              >
                Sign In
              </a>
            </div>
            <Button
              primary
              onClick={this.handleSubmit}
              style={{
                background: "#0f68b9",
                borderRadius: "50px",
                fontSize: "1.2rem",
                fontWeight: "200",
                marginTop: "2rem",
                marginRight: "20px",
                width: "100%"
              }}
            >
              Sign Up
            </Button>
            <Button
              secondary
              style={{
                borderRadius: "50px",
                fontSize: "1.2rem",
                fontWeight: "200",
                marginTop: "2rem",
                width: "100%"
              }}
              onClick={this.goBack}
            >
              Cancel
            </Button>
          </Form>
        </Container>
        <footer style={{ width: "100vw", flexShrink: 0 }}>
          <div className="footer__branding">
            <h4>SlackQL Inc</h4>
            <p>@2020</p>
          </div>
          <div className="footer__services">
            <h4>Serivces</h4>
            <ul>
              <li>Purchase</li>
              <li>Down payment</li>
              <li>Refinane</li>
              <li>How it works</li>
            </ul>
          </div>
          <div className="footer__about">
            <h4>About</h4>
            <ul>
              <li>Who we are</li>
              <li>Contact us</li>
              <li>FAQs</li>
              <li>Privacy policy</li>
              <li>Terms of use</li>
            </ul>
          </div>
          <div className="footer__social">
            <h4>Find us on</h4>
            <Icon name="instagram" />
            <Icon name="dribbble" />
            <Icon name="github" />
          </div>
        </footer>
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
