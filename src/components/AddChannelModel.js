import React from "react";
import { Form, Input, Button, Modal } from "semantic-ui-react";
import { withFormik } from "formik";
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";
import findIndex from "lodash/findIndex";

import { allTeamQuery } from "../graphql/team";

const AddChannelModal = ({
  open,
  onClose,
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting
}) => (
  <Modal open={open} onClose={onClose}>
    <Modal.Header>Add Channel</Modal.Header>
    <Modal.Content>
      <Form>
        <Form.Field>
          <Input
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            name="name"
            fluid
            placeholder="Channel name"
          />
        </Form.Field>
        <Form.Group widths="equal">
          <Button disabled={isSubmitting} onClick={onClose} secondary fluid>
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            onClick={handleSubmit}
            primary
            fluid
          >
            Create Channel
          </Button>
        </Form.Group>
      </Form>
    </Modal.Content>
  </Modal>
);

const createChannelMutation = gql`
  mutation($teamId: Int!, $name: String!) {
    createChannel(teamId: $teamId, name: $name) {
      ok
      channel {
        id
        name
      }
    }
  }
`;

export default compose(
  graphql(createChannelMutation),
  withFormik({
    mapPropsToValues: () => ({ name: "" }),
    handleSubmit: async (
      values,
      { props: { onClose, teamId, mutate }, setSubmitting }
    ) => {
      await mutate({
        variables: { teamId, name: values.name },
        optimisticResponse: {
          createChannel: {
            __typename: "Mutation",
            ok: true,
            channel: {
              __typename: "Channel",
              id: -1,
              name: values.name
            }
          }
        },
        update: (proxy, { data: { createChannel } }) => {
          const { ok, channel } = createChannel;
          if (!ok) {
            return;
          }
          const data = proxy.readQuery({ query: allTeamQuery });
          const teamIndex = findIndex(data.allTeams, ["id", teamId]);
          data.allTeams[teamIndex].channels.push(channel);
          proxy.writeQuery({
            query: allTeamQuery,
            data
          });
        }
      });
      onClose();
      setSubmitting(false);
    }
  })
)(AddChannelModal);
