import React from "react";
import { Container, Grid } from "semantic-ui-react";

const TeamSideBar = ({
  teamName,
  userName,
  channelNames,
  directMessageOwner
}) => (
  <Container>
    <Grid>
      <Grid.Row>
        <h4>{teamName}</h4>
        <h4>{userName}</h4>
      </Grid.Row>
      <Grid.Row>
        <h4>Channels</h4>
        {channelNames.map(channel => (
          <h4>{channel}</h4>
        ))}
      </Grid.Row>
      <Grid.Row>
        <h4>Direct Messages</h4>
        {directMessageOwner.map(person => (
          <h4>{person}</h4>
        ))}
      </Grid.Row>
    </Grid>
  </Container>
);

export default TeamSideBar;
