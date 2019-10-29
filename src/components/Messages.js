import styled from "styled-components";

export default styled.div`
  grid-column: 3;
  grid-row: 2;
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  flex-direction: column-reverse;
  overflow-y: auto;
  font-family: Helvetica, Segoe UI, Helvetica, Arial, sans-serif;
  font-size: 15px;

  /* width */
  ::-webkit-scrollbar {
    width: 11px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px #f6f6f6;
    border-radius: 0px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #d1d1d1;
    border-radius: 0px;
  }

  @media (max-width: 768px) {
    flex-grow: 1;
  }
`;
