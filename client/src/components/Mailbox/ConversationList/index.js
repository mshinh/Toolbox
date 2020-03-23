import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ConversationSearch from "../ConversationSearch";
import ConversationListItem from "../ConversationListItem";
import Toolbar from "../Toolbar";
import ToolbarButton from "../ToolbarButton";
import { getProfiles } from "../../../actions/profile";
import Spinner from "../../Layout/Spinner";

import fillerPhoto from "../../../assets/images/f_trades.jpg";

import "./ConversationList.css";

const ConversationList = ({
  getProfiles,
  profile: { profiles, loading },
  auth: { user }
}) => {
  const [conversations, setConversations] = useState([]);
  const titles = [
    "Plumber Needed",
    "Looking for job",
    "Work Opportunities",
    "Plumber Required",
    "Need Service",
    "Plumber Needed",
    "Looking for job",
    "Work Opportunities",
    "Plumber Required",
    "Need Service",
    "Plumber Needed",
    "Looking for job",
    "Work Opportunities",
    "Plumber Required",
    "Need Service",
    "Plumber Needed",
    "Looking for job",
    "Work Opportunities",
    "Plumber Required",
    "Need Service",
    "Plumber Needed",
    "Looking for job",
    "Work Opportunities",
    "Plumber Required",
    "Need Service",
    "Plumber Needed",
    "Looking for job",
    "Work Opportunities",
    "Plumber Required",
    "Need Service"
  ];

  let count = 0;

  useEffect(() => {
    getProfiles();
    let newConversations = profiles.map(profile => {
      return {
        id: profile.user._id,
        title: titles[count++],
        photo: profile.user.userphoto ? profile.user.userphoto : fillerPhoto,
        name: `${profile.user.fname} ${profile.user.lname}`,
        text:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam id.",
        status: "unread"
      };
    });
    setConversations([...conversations, ...newConversations]);
  }, [getProfiles]);

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
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(ConversationList);
