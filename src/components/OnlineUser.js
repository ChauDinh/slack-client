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
        style={
          Date.now() - last_seen < 60000
            ? {
                borderRadius: "50%",
                marginRight: "10px",
                border: "2px solid #0f8deb",
                padding: "2px"
              }
            : {
                borderRadius: "50%",
                marginRight: "10px",
                border: "2px solid lightgray",
                padding: "2px"
              }
        }
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
                border: "2px solid #fff"
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
      {name}
    </div>
  );
};
