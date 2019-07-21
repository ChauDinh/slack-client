import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import _ from "lodash";
import decode from "jwt-decode";

import Channels from "../components/Channels";
import Teams from "../components/Teams";

const Sidebar = ({ data: { loading, allTeams }, currentTeamId }) => {
  if (loading) {
    return null;
  }

  console.log(allTeams);

  const teamIndex = _.findIndex(allTeams, ["id", currentTeamId]);
  const team = allTeams[teamIndex];
  let username = "";

  try {
    const token = localStorage.getItem("token");
    const { user } = decode(token);
    username = user.username;
  } catch (err) {
    return;
  }

  return [
    <Teams
      key="team-sidebar"
      teams={allTeams.map(team => ({
        id: team.id,
        letter: team.name.charAt(0).toUpperCase()
      }))}
    />,
    <Channels
      key="channel-sidebar"
      teamName={team.name}
      userName={username}
      channels={team.channels}
      users={[{ id: 1, name: "slackbot" }, { id: 2, name: "user1" }]}
    />
  ];
};

const allTeamQuery = gql`
  {
    allTeams {
      id
      name
      channels {
        id
        name
      }
    }
  }
`;

export default graphql(allTeamQuery)(Sidebar);
