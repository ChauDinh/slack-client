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
  Message,
  Icon
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
  align-items: center;
  padding: 0 20px;
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
            width: "100%",
            height: "100%",
            flexGrow: 1
          }}
        >
          <Header
            as="h2"
            style={{
              fontWeight: "500",
              fontSize: "3.5rem",
              color: "#000",
              fontFamily: "AvenirNextDemi",
              marginBottom: "10px"
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
          <Form
            autoComplete="off"
            style={{
              width: "500px",
              marginBottom: "1rem",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <FormField error={!!emailError}>
              <label
                style={{
                  color: "#474e5d",
                  fontFamily: "AvenirNext",
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
                  fontFamily: "AvenirNext",
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
              Do not have account?
              <a
                href="/register"
                style={{
                  borderRadius: "50px",
                  fontWeight: "200",
                  color: "#0878CB",
                  padding: "0.785714em 1.5em 0 0",
                  marginLeft: "10px"
                }}
              >
                Register
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
              Login
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
              Go Back
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
