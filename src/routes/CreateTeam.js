import React, { Component } from "react";
import { extendObservable } from "mobx";
import {
  Container,
  Header,
  Form,
  FormField,
  Input,
  Button,
  Message
} from "semantic-ui-react";
import gql from "graphql-tag";
import { observer } from "mobx-react";
import { graphql } from "react-apollo";

class CreateTeam extends Component {
  constructor(props) {
    super(props);

    extendObservable(this, {
      name: "",
      errors: {}
    });
  }

  handleChange = e => {
    const { name, value } = e.target;
    this[name] = value;
  };

  handleSubmit = async () => {
    const { name } = this;
    let response = null;

    try {
      response = await this.props.mutate({
        variables: { name }
      });
    } catch (err) {
      this.props.history.push("/login");
      return;
    }

    console.log(response);

    const { ok, errors } = response.data.createTeam;
    if (ok) {
      this.props.history.push("/"); // we will go to a different page latter
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
      name,
      errors: { nameError }
    } = this;

    const errorList = [];

    if (nameError) {
      errorList.push(nameError);
    }

    return (
      <Container text>
        <Header as="h2">Create a team</Header>
        {errorList.length ? (
          <Message
            error
            header="There was some errors with your submission"
            list={errorList}
          />
        ) : null}
        <Form>
          <FormField error={!!nameError}>
            <Input
              name="name"
              onChange={this.handleChange}
              value={name}
              placeholder="Name"
              fluid
            />
          </FormField>
          <Button onClick={this.handleSubmit}>Create</Button>
        </Form>
      </Container>
    );
  }
}

const createTeamMutation = gql`
  mutation($name: String!) {
    createTeam(name: $name) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

export default graphql(createTeamMutation)(observer(CreateTeam));
