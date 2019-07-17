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
import { Mutation } from "react-apollo";
import { observer } from "mobx-react";

export default observer(
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
        <Mutation mutation={createTeamMutation}>
          {mutate => (
            <Container text>
              <Header as="h2">Create Team</Header>
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
                <Button
                  onClick={async () => {
                    const { name } = this;
                    const response = await mutate({
                      variables: { name }
                    });

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
                  }}
                >
                  Create
                </Button>
              </Form>
            </Container>
          )}
        </Mutation>
      );
    }
  }
);

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
