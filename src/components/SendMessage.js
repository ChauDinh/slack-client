import React from "react";
import styled from "styled-components";
import { Button, Icon, Input, Popup } from "semantic-ui-react";
import { withFormik } from "formik";

import FileUpload from "./FileUpload";

const Wrapper = styled.div`
  grid-column: 3;
  grid-row: 3;
  padding: 20px;
  display: grid;
  grid-template-columns: 50px auto;
  background: #ebedf2;
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
          <Button icon style={{ backgroundColor: "white" }}>
            <Icon name="plus" />
          </Button>
        }
        inverted
      />
    </FileUpload>
    <Input
      name="message"
      icon="send"
      value={values.message}
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder={`Type something to send... # ${placeholder}`}
      onKeyDown={e => {
        if (e.keyCode === ENTER_KEY && !isSubmitting) {
          handleSubmit(e);
        }
      }}
      style={{
        borderRadius: "7px",
        outline: "none",
        border: "1px solid #f0f3f5 !important",
        boxShadow: "none"
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
