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
import styled from "styled-components";
import { graphql } from "react-apollo";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

class CreateTeam extends Component {
  constructor(props) {
    super(props);

    extendObservable(this, {
      name: "",
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

    // console.log(response);

    const {
      ok,
      errors,
      team: { id }
    } = response.data.createTeam;
    if (ok) {
      this.props.history.push(`/view-team/${id}`); // we will go to a different page latter
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
      <Wrapper>
        <Container
          text
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start"
          }}
        >
          <Header
            as="h2"
            style={{
              textTransform: "capitalize",
              fontWeight: "500",
              fontSize: "3.5rem",
              color: "#0878CB",
              fontFamily: "Helvetica Neue",
              marginTop: "35px"
            }}
          >
            Create your team
          </Header>
          {errorList.length ? (
            <Message
              error
              header="There was some errors with your submission"
              list={errorList}
            />
          ) : null}
          <Form style={{ width: "100%" }}>
            <FormField error={!!nameError}>
              <Input
                name="name"
                onChange={this.handleChange}
                value={name}
                placeholder="Team name"
                fluid
              />
            </FormField>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Button
                primary
                style={{
                  background: "#0878CB",
                  borderRadius: "50px",
                  fontSize: "1.2rem",
                  fontWeight: "200",
                  marginTop: "2rem",
                  marginRight: "20px"
                }}
                onClick={this.handleSubmit}
              >
                Create Team
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
            </div>
          </Form>
        </Container>
      </Wrapper>
    );
  }
}

const createTeamMutation = gql`
  mutation($name: String!) {
    createTeam(name: $name) {
      ok
      team {
        id
      }
      errors {
        path
        message
      }
    }
  }
`;

export default graphql(createTeamMutation)(observer(CreateTeam));
