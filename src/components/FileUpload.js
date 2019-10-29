import React from "react";
import Dropzone from "react-dropzone";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

const FileUpload = ({
  children,
  disableClick,
  channelId,
  mutate,
  style = {}
}) => (
  <Dropzone
    style={{}}
    className="ignore"
    onDrop={async ([file]) => {
      const response = await mutate({
        variables: {
          channelId,
          file
        }
      });
      console.log(response);
    }}
    disableClick={disableClick}
  >
    {children}
  </Dropzone>
);

const createFileMessageMutation = gql`
  mutation($channelId: Int!, $file: File) {
    createMessage(channelId: $channelId, file: $file)
  }
`;

export default graphql(createFileMessageMutation)(FileUpload);
