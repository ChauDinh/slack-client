import React from "react";
import styled from "styled-components";
import { Button, Icon, Input, Popup } from "semantic-ui-react";
import { withFormik } from "formik";

import FileUpload from "./FileUpload";

const Wrapper = styled.div`
  grid-column: 3;
  grid-row: 3;
  padding: 20px;
  padding-bottom: 25px;
  display: grid;
  grid-template-columns: 50px auto;
  background: #fff;
  .input > input {
    background: #f8f8f8;
    border: 1px solid #bbcad9 !important;
  }
  .input > input:focus {
    background: #fff;
  }
  .input > i {
    color: #bbcad9;
    opacity: 1 !important;
    font-size: 20px;
  }

  .ui.icon.input > i.icon {
    cursor: pointer !important;
  }

  .ui.icon.input > i.icon:not(.link) {
    pointer-events: auto;
  }

  @media (max-width: 768px) {
    display: flex;
    flex-shrink: 0;
    .input {
      flex-grow: 1;
    }
  }
`;

const ENTER_KEY = 13;

const SendMessage = ({
  placeholder,
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  channelId,
}) => (
  <Wrapper>
    <FileUpload channelId={channelId}>
      <Popup
        content="Add static files to your feed"
        trigger={
          <Button
            icon
            style={{
              backgroundColor: "#f8f8f8",
              border: "1px solid #BBCAD9",
              color: "#BBCAD9",
            }}
          >
            <Icon
              name="add circle"
              style={{
                fontSize: "18px",
                fontWeight: "lighter",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            />
          </Button>
        }
        inverted
      />
    </FileUpload>
    <Input
      autoComplete="off"
      name="message"
      icon="smile"
      value={values.message}
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder={`Message... # ${placeholder}`}
      onKeyDown={(e) => {
        if (e.keyCode === ENTER_KEY && !isSubmitting) {
          handleSubmit(e);
        }
      }}
    />
  </Wrapper>
);

export default withFormik({
  mapPropsToValues: () => ({ message: "" }),
  handleSubmit: async (
    values,
    { props: { onSubmit }, setSubmitting, resetForm }
  ) => {
    if (!values.message || !values.message.trim()) {
      setSubmitting(false);
      return;
    }

    await onSubmit(values.message);

    resetForm(false);
  },
})(SendMessage);
