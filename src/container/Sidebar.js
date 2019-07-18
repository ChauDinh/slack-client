import React from "react";
import Channels from "../components/Channels";
import Teams from "../components/Teams";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import _ from "lodash";
import decode from "jwt-decode";

const Sidebar = ({ data: { loading, allTeams }, currentTeamId }) => {
  if (loading) {
    return null;
  }

  const teamIndex = _.findIndex(allTeams, ["id", currentTeamId]);
  console.log(allTeams);
  const team = allTeams[teamIndex];
  let username = "";
  try {
    const token = localStorage.getItem("token");
    const { user } = decode(token);
    username = user.username;
  } catch (err) {}

  return (
    <Mutation mutation={allTeamsQuery}>
      [
      <Teams
        key="team-sidebar"
        teams={allTeams.map(t => ({
          id: t.id,
          letter: t.name.charAt(0).toUpperCase()
        }))}
      />
      ,
      <Channels
        key="channels-sidebar"
        teamName={team.name}
        userName={username}
        channels={team.channels}
        users={[{ id: 1, name: "Slackbot" }, { id: 2, name: "user1" }]}
      />
      ]
    </Mutation>
  );
};

const allTeamsQuery = gql`
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

export default Sidebar;
