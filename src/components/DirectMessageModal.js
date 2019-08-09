import React from "react";
import { Form, Input, Button, Modal } from "semantic-ui-react";
import Downshift from "downshift";
import { graphql } from "react-apollo";
import { withRouter } from "react-router-dom";

import { getTeamMembersQuery } from "../graphql/team";

const DirectMessageModal = ({
  history,
  open,
  onClose,
  teamId,
  data: { loading, getTeamMembers }
}) => (
  <Modal open={open} onClose={onClose}>
    <Modal.Header>Direct Messages</Modal.Header>
    <Modal.Content>
      <Form>
        <Form.Field>
          {/* <Input name="name" fluid placeholder="Search users ..." /> */}
          {!loading && (
            <Downshift
              onChange={selectedUser => {
                history.push(`/view-team/user/${teamId}/${selectedUser.id}`);
                onClose();
              }}
              itemToString={item => (item ? item.value : "")}
            >
              {({
                getInputProps,
                getItemProps,
                getLabelProps,
                getMenuProps,
                isOpen,
                inputValue,
                highlightedIndex,
                selectedItem
              }) => (
                <div>
                  <label {...getLabelProps()}>Please choose an user</label>
                  <Input
                    {...getInputProps({ placeholder: "favorite user" })}
                    fluid
                  />
                  <ul {...getMenuProps()} style={{ listStyle: "none" }}>
                    {isOpen
                      ? getTeamMembers
                          .filter(
                            item =>
                              !inputValue || item.username.includes(inputValue)
                          )
                          .map((item, index) => (
                            <li
                              {...getItemProps({
                                key: item.id,
                                // index,
                                item,
                                style: {
                                  backgroundColor:
                                    highlightedIndex === index
                                      ? "lightgray"
                                      : "white",
                                  fontWeight:
                                    selectedItem === item ? "bold" : "normal"
                                }
                              })}
                            >
                              {item.username}
                            </li>
                          ))
                      : null}
                  </ul>
                </div>
              )}
            </Downshift>
          )}
        </Form.Field>
        <Form.Group widths="equal">
          <Button onClick={onClose} fluid>
            Cancel
          </Button>
        </Form.Group>
      </Form>
    </Modal.Content>
  </Modal>
);

export default withRouter(graphql(getTeamMembersQuery)(DirectMessageModal));
