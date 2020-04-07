import React, { useReducer, useState } from "react";
import ConversationList from "../ConversationList";
import MessageList from "../MessageList";
import "./Messenger.scss";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Messenger = ({ messanger: { conversation } }) => {

  const [activeMobileMessage, toggleMobile] = useState(false);

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

      <div className={`messageToggle  ${conversation.id != undefined ? 'activeChat' : ""}`} onClick={()=> {toggleMobile(!activeMobileMessage)}}>
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
            <path id="Icon_material-message" data-name="Icon material-message" d="M30,3H6A3,3,0,0,0,3.015,6L3,33l6-6H30a3.009,3.009,0,0,0,3-3V6A3.009,3.009,0,0,0,30,3ZM27,21H9V18H27Zm0-4.5H9v-3H27ZM27,12H9V9H27Z" transform="translate(-3 -3)"/>
          </svg>
        </div>

      <div className={`scrollable content  ${conversation.id != undefined ? 'activeChat' : ""} ${activeMobileMessage}`}>
       
        {conversation.id != undefined ? <MessageList /> : ""}
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
