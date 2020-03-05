import React from "react";

import "./About.css";
import ThinkImage from "../images/small__icons/think.png";
import ChatImage from "../images/small__icons/chat.png";
import RealtimeImage from "../images/small__icons/realtime.png";
import FreeImage from "../images/small__icons/free.png";
import AboutImage from "../images/about-us.png";

export const About = () => {
  return (
    <div className="about-us">
      <h1 className="about-us__title">
        Solving Big Problems <br /> from a <span>Small Business</span>{" "}
        Perspective
      </h1>
      <div className="about-us__content">
        <div className="about-us__image">
          <img alt="" src={AboutImage} width="500px" className="image" />
        </div>
        <div className="about-us__philosophy">
          <div className="about-us__items">
            <div className="about-us__item">
              <img alt="" src={ThinkImage} width="40px" />
              <h5>Think Globally</h5>
              <p>We design a system allows participants connect to … </p>
            </div>
            <div className="about-us__item">
              <img alt="" src={ChatImage} width="40px" />
              <h5>Group for Work</h5>
              <p>Users can switch between groups and teams …</p>
            </div>
            <div className="about-us__item">
              <img alt="" src={RealtimeImage} width="40px" />
              <h5>More Realtime</h5>
              <p>Our platform has less delay compared to others…</p>
            </div>
            <div className="about-us__item">
              <img alt="" src={FreeImage} width="40px" />
              <h5>It's Always Free!</h5>
              <p>We support all services without your credit card</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
