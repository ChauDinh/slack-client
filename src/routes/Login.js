import React, { Component } from "react";
import { observer } from "mobx-react";
import { extendObservable } from "mobx";
import { Input, Button, Container, Header } from "semantic-ui-react";

export default observer(
  class Login extends Component {
    constructor(props) {
      super(props);

      extendObservable(this, {
        // passing the state we want to use
        // we use email and password for the login action
        email: "",
        password: ""
      });
    }

    handleChange = e => {
      const { name, value } = e.target;
      this[name] = value;
    };

    handleSubmit = () => {
      const { email, password } = this;
      console.log("email: ", email);
      console.log("password: ", password);
    };

    render() {
      const { email, password } = this;
      return (
        <Container text>
          <Header as="h2">Login</Header>
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
          <Button onClick={this.handleSubmit}>Login</Button>
        </Container>
      );
    }
  }
);
