import React from "react";
import { Grid } from "semantic-ui-react";
import TeamSideBar from "../components/TeamSideBar";
import TeamHeader from "../components/TeamHeader";
import MessageInput from "../components/MessageInput";

export default () => (
  <Grid>
    <Grid.Column width={4}>
      <TeamSideBar
        teamName="Bob Is Cool"
        userName="Bob the first"
        channelNames={["General", "Boyune"]}
        directMessageOwner={["Slack Bot", "random", "Chau"]}
      />
    </Grid.Column>
    <Grid.Column width={10}>
      <TeamHeader />
      <MessageInput />
    </Grid.Column>
  </Grid>
);
