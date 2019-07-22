import React from "react";
import { Form, Input, Button, Modal } from "semantic-ui-react";

const ModalModalExample = ({ open, onClose }) => (
  <Modal open={open} onClose={onClose}>
    <Modal.Header>Add Channel</Modal.Header>
    <Modal.Content>
      <Form>
        <Form.Field>
          <Input fluid placeholder="Channel name" />
        </Form.Field>
        <Form.Group widths="equal">
          <Button secondary fluid>
            Cancel
          </Button>
          <Button primary fluid>
            Create Channel
          </Button>
        </Form.Group>
      </Form>
    </Modal.Content>
  </Modal>
);

export default ModalModalExample;
