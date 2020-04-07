import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ConversationSearch from "../ConversationSearch";
import ConversationListItem from "../ConversationListItem";
import Toolbar from "../Toolbar";
import ToolbarButton from "../ToolbarButton";
import { getInboxMail, getSentMail } from "../../../actions/messanger";
import Spinner from "../../Layout/Spinner";

import fillerPhoto from "../../../assets/images/f_trades.jpg";

import "./ConversationList.css";

const ConversationList = ({
  getInboxMail,
  getSentMail,
  messanger: { mailbox, mailboxSent, loading },
  auth: { user }
}) => {
  const [conversations, setConversations] = useState([]);

  let count = 0;

  useEffect(() => {
    getInboxMail();
    getSentMail();

    let newConversations = mailbox.map(mail => {
      return {
        id: mail._id,
        title: mail.title,
        photo: mail.fromUser.userphoto ? mail.fromUser.userphoto : fillerPhoto,
        name: `${mail.fromUser.fname} ${mail.fromUser.lname}`,
        text: mail.messages[0].content,
        status: "unread"
      };
    });

    let sentConversations = mailboxSent.map(mail => {
      return {
        id: mail._id,
        title: mail.title,
        photo: mail.toUser.userphoto ? mail.toUser.userphoto : fillerPhoto,
        name: `${mail.toUser.fname} ${mail.toUser.lname}`,
        text: mail.messages[0].content,
        status: "read"
      };
    });

    let allConversations = [...newConversations, ...sentConversations];

    setConversations([...conversations, ...allConversations]);
  }, [getInboxMail, getSentMail]);

  return (
    <div className="conversation-list">
      <Toolbar
        title="Mailbox"
        leftItems={[<ToolbarButton key="cog" icon="" />]}
        rightItems={[<ToolbarButton key="add" icon="fas fa-plus-circle" />]}
      />
      <ConversationSearch />
      {loading ? (
        <Spinner />
      ) : (
        conversations.map(conversation => (
          <ConversationListItem key={conversation.name} item={conversation} />
        ))
      )}
    </div>
  );
};

ConversationList.propTypes = {
  getInboxMail: PropTypes.func.isRequired,
  getSentMail: PropTypes.func.isRequired,
  messanger: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  messanger: state.messanger
});

export default connect(mapStateToProps, {
  getInboxMail,
  getSentMail
})(ConversationList);
