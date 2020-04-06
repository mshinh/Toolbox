import React, { useEffect, useState } from "react";
import Compose from "../Compose";
import Toolbar from "../Toolbar";
import ToolbarButton from "../ToolbarButton";
import Message from "../Message/index.js";
import moment from "moment";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getConversationInfo, getMessages } from "../../../actions/messanger";
import openSocket from "socket.io-client";

import "./MessageList.css";

const MessageList = ({
  messanger: { conversation, conversationMessages, loading, messagesLoading },
  auth: { user }
}) => {
  const MY_USER_ID = user._id;
  const socket = openSocket("http://localhost:8000");

  const [messages, setMessages] = useState([]);
  const [incomingMessage, setIncomingMessage] = useState({
    id: "",
    author: "",
    message: "",
    timestamp: ""
  });

  useEffect(() => {
    if (conversationMessages.messages != null && messagesLoading === false) {
      let newMessages = conversationMessages.messages.map(msg => {
        return {
          id: msg._id,
          author: msg.author,
          message: msg.content,
          timestamp: msg.time
        };
      });

      setMessages(newMessages);
      // if (incomingMessage.author != "") {
      //   setMessages([...messages, incomingMessage]);
      // }
    }

    // }
  }, [conversationMessages, incomingMessage]);

  // when a new message arrives
  socket.on("message", data => {
    console.log("data value ", data);

    if (data.conversationId == conversation.id) {
      setIncomingMessage({
        id: "",
        author: data.author,
        message: data.message,
        timestamp: new Date().getTime()
      });
    }
  });

  const renderMessages = () => {
    let i = 0;
    let messageCount = messages.length;
    let tempMessages = [];

    while (i < messageCount) {
      let previous = messages[i - 1];
      let current = messages[i];
      let next = messages[i + 1];
      let isMine = current.author === MY_USER_ID;
      let currentMoment = moment(current.timestamp);
      let prevBySameAuthor = false;
      let nextBySameAuthor = false;
      let startsSequence = true;
      let endsSequence = true;
      let showTimestamp = true;

      if (previous) {
        let previousMoment = moment(previous.timestamp);
        let previousDuration = moment.duration(
          currentMoment.diff(previousMoment)
        );
        prevBySameAuthor = previous.author === current.author;

        if (prevBySameAuthor && previousDuration.as("hours") < 1) {
          startsSequence = false;
        }

        if (previousDuration.as("hours") < 1) {
          showTimestamp = false;
        }
      }

      if (next) {
        let nextMoment = moment(next.timestamp);
        let nextDuration = moment.duration(nextMoment.diff(currentMoment));
        nextBySameAuthor = next.author === current.author;

        if (nextBySameAuthor && nextDuration.as("hours") < 1) {
          endsSequence = false;
        }
      }

      tempMessages.push(
        <Message
          key={i}
          isMine={isMine}
          startsSequence={startsSequence}
          endsSequence={endsSequence}
          showTimestamp={showTimestamp}
          data={current}
        />
      );

      // Proceed to the next message.
      i += 1;
    }
    return tempMessages;
  };

  return (
    <div className="message-list">
      <Toolbar
        room={conversation.id}
        title={conversation.title}
        name={conversation.name}
        photo={conversation.photo}
        rightItems={[<ToolbarButton key="info" icon="fas fa-info-circle" />]}
      />

      <div className="message-list-container">{renderMessages()}</div>

      <Compose />
    </div>
  );
};

MessageList.propTypes = {
  messanger: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  messanger: state.messanger,
  auth: state.auth
});
export default connect(mapStateToProps, {})(MessageList);
