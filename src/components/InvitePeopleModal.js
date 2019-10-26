import React from "react";
import { Form, Input, Button, Modal, Image } from "semantic-ui-react";
import { withFormik } from "formik";
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";

import normalizeErrors from "../normalizeErrors";
import InvitePeople from "../images/invite.png";

const InvitePeopleModal = ({
  open,
  onClose,
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  touched,
  errors
}) => (
  <Modal open={open} onClose={onClose} style={{ width: "400px" }}>
    <Modal.Header style={{ textTransform: "capitalize" }}>
      Invite your friends
    </Modal.Header>
    <Modal.Content>
      <Image
        src={InvitePeople}
        width="400px"
        style={{ marginLeft: "50%", transform: "translate(-50%, 0)" }}
      />
      <Form>
        <Form.Field>
          <Input
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            name="email"
            fluid
            placeholder="User's email"
          />
        </Form.Field>
        {touched.email && errors.email ? errors.email[0] : null}
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
            style={{ background: "#521CCB" }}
          >
            Add User
          </Button>
        </Form.Group>
      </Form>
    </Modal.Content>
  </Modal>
);

const addTeamMemberMutation = gql`
  mutation($email: String!, $teamId: Int!) {
    addTeamMember(email: $email, teamId: $teamId) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

export default compose(
  graphql(addTeamMemberMutation),
  withFormik({
    mapPropsToValues: () => ({ email: "" }),
    handleSubmit: async (
      values,
      { props: { onClose, teamId, mutate }, setSubmitting, setErrors }
    ) => {
      const response = await mutate({
        variables: { teamId, email: values.email }
      });
      const { ok, errors } = response.data.addTeamMember;
      if (ok) {
        onClose();
        setSubmitting(false);
      } else {
        setSubmitting(false);
        const errorsLength = errors.length;
        const filterErrors = errors.filter(
          e => e.message !== "user_id must be unique"
        );
        if (errorsLength !== filterErrors.length) {
          filterErrors.push({
            path: "email",
            message: "This user is already part of the team!"
          });
        }
        setErrors(normalizeErrors(filterErrors));
      }
    }
  })
)(InvitePeopleModal);
