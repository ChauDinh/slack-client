import React from "react";
import { Form, Input, Button, Modal } from "semantic-ui-react";
import Downshift from "downshift";
import { render } from "react-dom";

const items = [
  { value: "apple" },
  { value: "pear" },
  { value: "orange" },
  { value: "grape" },
  { value: "banana" }
];

const DirectMessageModal = ({ open, onClose, teamId }) => (
  <Modal open={open} onClose={onClose}>
    <Modal.Header>Direct Messages</Modal.Header>
    <Modal.Content>
      <Form>
        <Form.Field>
          {/* <Input name="name" fluid placeholder="Search users ..." /> */}
          <Downshift
            onChange={selection =>
              alert(
                selection
                  ? `You selected ${selection.value}`
                  : "Selection Cleared"
              )
            }
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
                <ul {...getMenuProps()}>
                  {isOpen
                    ? items
                        .filter(
                          item => !inputValue || item.value.includes(inputValue)
                        )
                        .map((item, index) => (
                          <li
                            {...getItemProps({
                              key: item.value,
                              index,
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
                            {item.value}
                          </li>
                        ))
                    : null}
                </ul>
              </div>
            )}
          </Downshift>
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

export default DirectMessageModal;
