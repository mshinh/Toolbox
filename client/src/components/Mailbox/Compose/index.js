import React, { useState } from "react";
import "./Compose.css";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import openSocket from "socket.io-client";

const Compose = ({ messanger: { conversation }, auth }) => {
  const [message, setMessage] = useState("");

  console.log(conversation.id);
  const handleChange = e => {
    setMessage(e.target.value);
  };

  const submitMessage = () => {
    console.log("here");
    const socket = openSocket("http://localhost:8000");
    socket.emit("message", {
      author: auth.user._id,
      conversationId: conversation.id,
      message: message
    });
    setMessage("");
  };

  const keyPressed = event => {
    if (event.key === "Enter") {
      submitMessage();
    }
  };

  return (
    <div className="compose">
      <input
        name="message"
        id="message"
        onChange={e => handleChange(e)}
        onKeyPress={e => keyPressed(e)}
        type="text"
        className="compose-input"
        placeholder="Type a message, @name"
        value={message}
      />
    </div>
  );
};

Compose.propTypes = {
  auth: PropTypes.object.isRequired,
  messanger: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  messanger: state.messanger
});
export default connect(mapStateToProps)(Compose);
