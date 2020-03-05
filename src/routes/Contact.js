import React from "react";
import { Modal, Message } from "semantic-ui-react";

import "./Contact.css";
import PhoneImage from "../images/small__icons/call.png";
import MailImage from "../images/small__icons/mail.png";

export const Contact = () => {
  return (
    <div className="contact-us">
      <h1 className="contact-us__title">
        <span>Contact</span> Us
      </h1>
      <div className="contact-us__content">
        <div className="contact-us__info">
          <div className="contact-us__commitment">
            <p>
              We take our commitment to our users experience seriously. If you
              need our help with your user account, have questions about how to
              use our services or experiencing technical difficulties, feelfree
              to contact us.
            </p>
          </div>
          <div className="contact-us__address">
            <h3>
              SlacClone Inc. <br /> XXX The Green St, NY, 444 <br />
              United State
            </h3>
          </div>
          <div className="contact-us__phone">
            <img alt="" src={PhoneImage} />
            <p>+1 (888) 123-456-7890</p>
          </div>
          <div className="contact-us__email">
            <img alt="" src={MailImage} />
            <p>support@slackclone.com</p>
          </div>
        </div>
        <div className="contact-us__feedback">
          <div>
            <div className="contact-us__form-control">
              <label>Fullname</label>
              <input type="text" />
            </div>
            <div className="contact-us__form-control">
              <label>Email</label>
              <input type="email" />
            </div>
            <div className="contact-us__form-control">
              <label>Feedback</label>
              <textarea rows={10} />
            </div>
            <Modal size={"tiny"} trigger={<button>Send</button>} closeIcon>
              <Modal.Header>
                <Message positive>
                  <p>Your feedback has been submitted!</p>
                </Message>
              </Modal.Header>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};
