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
  background: #f4f7fa;
  .input > input {
    background: #ebedf2;
    border: 1px solid #ebedf2 !important;
    border-radius: 8px;
  }
  .input > input:focus {
    background: #ebedf2;
    border: 1px solid #ebedf2 !important;
  }
  .input > i {
    color: #0f8deb;
    opacity: 1 !important;
    font-size: 20px;
  }

  @media (max-width: 768px) {
    display: flex;
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
  channelId
}) => (
  <Wrapper>
    <FileUpload channelId={channelId}>
      <Popup
        content="Add static files to your feed"
        trigger={
          <Button
            icon
            style={{
              backgroundColor: "#0f8deb",
              borderRadius: "8px",
              color: "#fff"
            }}
          >
            <Icon
              name="add circle"
              style={{
                fontSize: "16px",
                fontWeight: "lighter",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            />
          </Button>
        }
        inverted
      />
    </FileUpload>
    <Input
      name="message"
      icon="facebook messenger"
      value={values.message}
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder={`Type something to send... # ${placeholder}`}
      onKeyDown={e => {
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
  }
})(SendMessage);
