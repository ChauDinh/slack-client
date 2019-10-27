import styled from "styled-components";

export default styled.div`
  grid-column: 3;
  grid-row: 2;
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  flex-direction: column-reverse;
  overflow-y: auto;

  /* width */
  ::-webkit-scrollbar {
    width: 11px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px #f6f6f6;
    border-radius: 10px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #3e149c;
    border-radius: 10px;
  }

  @media (max-width: 768px) {
    flex-grow: 1;
  }
`;
