import React from "react";
import { Dropdown } from "semantic-ui-react";
import { graphql } from "react-apollo";

import { getTeamMembersQuery } from "../graphql/team";

const MultiSelectUsers = ({
  data: { loading, getTeamMembers },
  value,
  handleChange,
  placeholder
}) => {
  if (loading) {
    return null;
  }

  return (
    <Dropdown
      value={value}
      onChange={handleChange}
      clearable
      fluid
      multiple
      search
      selection
      options={getTeamMembers.map(teamMember => ({
        key: teamMember.id,
        value: teamMember.id,
        text: teamMember.username
      }))}
      placeholder={placeholder}
    />
  );
};

export default graphql(getTeamMembersQuery, {
  options: ({ teamId }) => ({ variables: { teamId } })
})(MultiSelectUsers);
