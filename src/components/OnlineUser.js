import React from "react";
import { Image } from "semantic-ui-react";

export default ({ name }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        marginBottom: "20px",
        fontWeight: "500",
        fontFamily: "Helvetica",
        position: "relative"
      }}
    >
      <Image
        src={`https://api.adorable.io/avatars/40/${name.toUpperCase()}dYHDDWmw99`}
        style={{
          borderRadius: "50%",
          marginRight: "10px"
        }}
      />
      <div
        style={{
          zIndex: "2",
          background: "#24d424",
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          position: "absolute",
          left: "25px",
          bottom: "-3px",
          border: "2px solid #fff"
        }}
      ></div>
      {name}
    </div>
  );
};
