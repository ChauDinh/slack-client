import React from "react";
import Calendar from "rc-calendar";
import styled from "styled-components";
import "rc-calendar/assets/index.css";

const Wrapper = styled.div`
  border-top: 1px solid #d3dfe8;
  padding-top: 20px;
  margin-bottom: 30px;
  a {
    cursor: pointer;
  }
  .rc-calendar {
    font-family: sans-serif;
    background: #fff;
    padding: 7px;
    border-radius: 5px;
    box-shadow: 3px 3px 10px rgba(200, 200, 200, 0.5);
    border: none;
  }
  .rc-calendar-table {
    width: 100%;
    text-align: left;
    margin-bottom: 10px;
  }
  .rc-calendar-table > thead {
    font-weight: lighter;
    font-size: 13px;
  }
  .rc-calendar-input {
    width: 100%;
    border: 1px solid #f5f5f5;
    border-radius: 5px;
    padding: 4px;
    margin-bottom: 10px;
  }
  .rc-calendar-header {
    margin-bottom: 10px;
    text-align: center;
    background: #0f68b9;
    border-radius: 5px;
  }
  .rc-calendar-header a {
    color: #fff;
  }
  .rc-calendar-month-select {
    margin-right: 5px;
  }
  .rc-calendar-footer {
    text-align: center;
  }

  @media (max-width: 1080px) {
    display: none;
  }
`;

export const CalendarWrapper = () => {
  return (
    <Wrapper>
      <h5>Calendar</h5>
      <Calendar />
    </Wrapper>
  );
};
