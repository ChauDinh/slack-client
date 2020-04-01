import React, { useRef } from "react";
import { Icon } from "semantic-ui-react";

import Image from "../images/image.png";
import { About } from "./About";
import { Contact } from "./Contact";
import { Services } from "./Services";
import "./Home.css";

const Home = () => {
  const aboutRef = useRef();
  const servicesRef = useRef();
  const contactRef = useRef();

  return (
    <React.Fragment>
      <div className="wrapper">
        <div className="main-rectangle">
          <header className="header">
            <div className="header__title">SlackQL</div>
            <div className="header__menu">
              <div className="header__about-us">
                <button
                  onClick={() =>
                    window.scrollTo({
                      top: aboutRef.current.offsetTop + 100,
                      left: 0,
                      behavior: "smooth"
                    })
                  }
                >
                  About Us
                </button>
              </div>
              <div className="header__services">
                <button
                  onClick={() =>
                    window.scrollTo({
                      top: servicesRef.current.offsetTop,
                      left: 0,
                      behavior: "smooth"
                    })
                  }
                >
                  Services
                </button>
              </div>
              <div className="header__contact">
                <button
                  onClick={() =>
                    window.scrollTo({
                      top: contactRef.current.offsetTop + 100,
                      left: 0,
                      behavior: "smooth"
                    })
                  }
                >
                  Contact
                </button>
              </div>
            </div>
            <div className="header__login-register">
              <a href="/login" className="header__login">
                <p>Sign In</p>
              </a>
              <a href="/register" className="header__register">
                <p>Sign Up</p>
              </a>
            </div>
          </header>
          <main className="content">
            <div className="content__text">
              <div className="content__slogan">
                Get your <br />
                work <br /> done <br />
                <span>Together.</span>
              </div>
              <a className="content__button" href="/view-team">
                Start Free
              </a>
            </div>
            <div className="content__image">
              <img alt="" src={Image} className="image"></img>
            </div>
          </main>
        </div>
      </div>

      <div ref={aboutRef}>
        <About />
      </div>
      <div ref={servicesRef}>
        <Services />
      </div>
      <div ref={contactRef}>
        <Contact />
      </div>
      <footer className="footer">
        <div className="footer__branding">
          <h4>SlackQL Inc</h4>
          <p>@2020</p>
        </div>
        <div className="footer__services">
          <h4>Serivces</h4>
          <ul>
            <li>Purchase</li>
            <li>Down payment</li>
            <li>Refinane</li>
            <li>How it works</li>
          </ul>
        </div>
        <div className="footer__about">
          <h4>About</h4>
          <ul>
            <li>Who we are</li>
            <li>Contact us</li>
            <li>FAQs</li>
            <li>Privacy policy</li>
            <li>Terms of use</li>
          </ul>
        </div>
        <div className="footer__social">
          <h4>Find us on</h4>
          <Icon name="instagram" />
          <Icon name="dribbble" />
          <Icon name="github" />
        </div>
      </footer>
    </React.Fragment>
  );
};

export default Home;
