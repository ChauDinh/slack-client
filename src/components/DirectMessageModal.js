import React from "react";
import { Form, Button, Modal } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import { withFormik } from "formik";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import findIndex from "lodash/findIndex";

import MultiSelectUsers from "./MultiSelectUsers";
import { meQuery } from "../graphql/team";

const DirectMessageModal = ({
  open,
  onClose,
  teamId,
  currentUserId,
  values,
  handleSubmit,
  isSubmitting,
  resetForm,
  setFieldValue
}) => (
  <Modal open={open} onClose={onClose} style={{ width: "400px" }}>
    <Modal.Header>Direct Messages</Modal.Header>
    <Modal.Content>
      <Form>
        <Form.Field>
          <MultiSelectUsers
            value={values.members}
            handleChange={(e, { value }) => setFieldValue("members", value)}
            teamId={teamId}
            placeholder="select members to message"
            currentUserId={currentUserId}
          />
        </Form.Field>
        <Form.Group widths="equal">
          <Button
            secondary
            disabled={isSubmitting}
            fluid
            onClick={e => {
              resetForm();
              onClose(e);
            }}
          >
            Cancel
          </Button>
          <Button
            primary
            disabled={isSubmitting}
            fluid
            onClick={handleSubmit}
            style={{ background: "#3e149c" }}
          >
            Start Messaging
          </Button>
        </Form.Group>
      </Form>
    </Modal.Content>
  </Modal>
);

const getOrCreateChannelMutation = gql`
  mutation($teamId: Int!, $members: [Int!]!) {
    getOrCreateChannel(teamId: $teamId, members: $members) {
      id
      name
    }
  }
`;

export default compose(
  withRouter,
  graphql(getOrCreateChannelMutation),
  withFormik({
    mapPropsToValues: () => ({ members: [] }),
    handleSubmit: async (
      { members },
      { props: { history, onClose, teamId, mutate }, setSubmitting, resetForm }
    ) => {
      const response = await mutate({
        variables: { members, teamId },
        update: (proxy, { data: { getOrCreateChannel } }) => {
          const { id, name } = getOrCreateChannel;
          const data = proxy.readQuery({ query: meQuery });
          const teamIndex = findIndex(data.me.teams, ["id", teamId]);
          const notInChannelList = data.me.teams[teamIndex].channels.every(
            channel => channel.id !== id
          );
          if (notInChannelList) {
            data.me.teams[teamIndex].channels.push({ id, name, dm: true });
            proxy.writeQuery({
              query: meQuery,
              data
            });
          }
          history.push(`/view-team/${teamId}/${id}`);
        }
      });
      console.log(response);
      onClose();
      // setSubmitting(false);
      resetForm();
    }
  })
)(DirectMessageModal);
