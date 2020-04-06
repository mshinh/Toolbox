import React, { useReducer } from "react";
import ConversationList from "../ConversationList";
import MessageList from "../MessageList";
import "./Messenger.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../../Layout/Spinner";

const Messenger = ({ messanger: { conversation } }) => {
  return (
    <div className="messenger">
      {/* <Toolbar
          title="Messenger"
          leftItems={[
            <ToolbarButton key="cog" icon="ion-ios-cog" />
          ]}
          rightItems={[
            <ToolbarButton key="add" icon="ion-ios-add-circle-outline" />
          ]}
        /> */}

      {/* <Toolbar
          title="Conversation Title"
          rightItems={[
            <ToolbarButton key="info" icon="ion-ios-information-circle-outline" />,
            <ToolbarButton key="video" icon="ion-ios-videocam" />,
            <ToolbarButton key="phone" icon="ion-ios-call" />
          ]}
        /> */}

      <div className="scrollable sidebar">
        <ConversationList />
      </div>

      <div className="scrollable content">
        {conversation.id != undefined ? <MessageList /> : <Spinner />}
      </div>
    </div>
  );
};

Messenger.propTypes = {
  messanger: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  messanger: state.messanger
});
export default connect(mapStateToProps)(Messenger);
