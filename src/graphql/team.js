import gql from "graphql-tag";

export const allTeamQuery = gql`
  {
    allTeams {
      id
      name
      owner
      channels {
        id
        name
      }
    }

    inviteTeams {
      id
      name
      owner
      channels {
        id
        name
      }
    }
  }
`;

export const idk = {};
