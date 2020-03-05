import React from "react";
import { Modal } from "semantic-ui-react";

import "./Services.css";
import PrivateRoomImage from "../images/small__icons/private_room.png";
import TeamGroupImage from "../images/small__icons/team_group.png";
import FileTransferImage from "../images/small__icons/file_transfer.png";
import ArrowImage from "../images/small__icons/arrow-right.png";

export const Services = () => {
  return (
    <div className="services">
      <h1 className="services__title">
        The <span>Modern</span> Solution <br />
        for Getting Work Done Together
      </h1>
      <div className="services__items">
        <div className="services__item">
          <img alt="" src={PrivateRoomImage} width="40px" />
          <h5>Private Room</h5>
          <p>
            Everyone can add friends via their email address into a channel.
          </p>
          <h5>
            Explore
            <img alt="" src={ArrowImage} width="16px" />
          </h5>
        </div>
        <div className="services__item">
          <img alt="" src={TeamGroupImage} width="40px" />
          <h5>Team Group</h5>
          <p>Everyone can create team and add friends into his/her channels.</p>
          <h5>
            Explore
            <img alt="" src={ArrowImage} width="16px" />
          </h5>
        </div>
        <div className="services__item">
          <img alt="" src={FileTransferImage} width="40px" />
          <h5>Static Transfer</h5>
          <p>Everyone can create team and add friends into his/her channels.</p>
          <h5>
            Explore
            <img alt="" src={ArrowImage} width="16px" />
          </h5>
        </div>
      </div>
      <Modal size="large" trigger={<button>Watch Demo</button>}>
        <Modal.Content style={{ height: "80vh", background: "#000" }}>
          <iframe
            title="tutorial"
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/1NPVxsS73oY"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </Modal.Content>
      </Modal>
    </div>
  );
};
