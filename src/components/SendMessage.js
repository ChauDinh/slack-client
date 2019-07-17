import React from "react";
import styled from "styled-components";
import { Input } from "semantic-ui-react";

const Wrapper = styled.div`
  grid-column: 3;
  grid-row: 3;
  margin: 20px;
`;

export default ({ channelName }) => (
  <Wrapper>
    <Input fluid placeholder={`Message # ${channelName}`} />
  </Wrapper>
);
