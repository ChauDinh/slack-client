import React from "react";
import { Image } from "semantic-ui-react";

export default ({ name, last_seen }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        marginBottom: "20px",
        fontWeight: "600",
        fontFamily: "Helvetica Neue",
        position: "relative"
      }}
    >
      <Image
        src={`https://api.adorable.io/avatars/40/${name}@adorable.io`}
        style={{ borderRadius: "50%", marginRight: "10px", padding: "2px" }}
      />
      <div
        style={
          Date.now() - last_seen < 60000
            ? {
                zIndex: "2",
                background: "#24d424",
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                position: "absolute",
                left: "30px",
                bottom: "-1px",
                border: "2px solid #f5f5f5"
              }
            : {
                zIndex: "2",
                background: "lightgray",
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                position: "absolute",
                left: "30px",
                bottom: "-1px",
                border: "2px solid #fff"
              }
        }
      ></div>
      <p>{name}</p>
    </div>
  );
};
