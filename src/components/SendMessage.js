import React from "react";
import styled from "styled-components";
import { Input } from "semantic-ui-react";
import { withFormik } from "formik";

const Wrapper = styled.div`
  grid-column: 3;
  grid-row: 3;
  margin: 20px;
`;

const ENTER_KEY = 13;

const SendMessage = ({
  placeholder,
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting
}) => (
  <Wrapper>
    <Input
      name="message"
      value={values.message}
      onChange={handleChange}
      onBlur={handleBlur}
      fluid
      placeholder={`Message # ${placeholder}`}
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
