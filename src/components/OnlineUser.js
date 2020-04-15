import React from "react";
import { Image } from "semantic-ui-react";

export default ({ name }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        marginBottom: "20px",
        fontWeight: "600",
        fontFamily: "Helvetica Neue",
        position: "relative",
      }}
    >
      <Image
        src={`https://api.adorable.io/avatars/40/${name}@adorable.io`}
        style={{ borderRadius: "50%", marginRight: "10px", padding: "2px" }}
      />

      <div style={{ textAlign: "left", marginTop: "5px" }}>
        <h4>{name}</h4>
      </div>
    </div>
  );
};
