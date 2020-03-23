import React, { useEffect, useState } from "react";

import { setConversationRoom } from "../../../actions/messanger";

import PropTypes from "prop-types";
import { connect } from "react-redux";

// import shave from "shave";
import {
  Badge,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from "reactstrap";

import "./ConversationListItem.css";

const ConversationListItem = ({
  item: { id, title, photo, name, text, status },
  setConversationRoom
}) => {
  //   useEffect(() => {
  //     shave(".conversation-snippet", 20);
  //   });

  //const { id, title, photo, name, text, status } = props.data;

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [readStatus, setReadStatus] = useState("unread");

  const [messageStatus, setMessageStatus] = useState(status);

  const [modal, setModal] = useState(false);

  const [conversation, setConversation] = useState({
    id: id,
    title: title,
    photo: photo,
    name: name
  });

  const toggleDelete = () => setModal(!modal);

  const changeConversationRoom = () => {
    setConversationRoom(conversation);
  };

  return (
    <div
      tabindex="-1"
      className="conversation-list-item"
      onClick={() => {
        if (messageStatus == "unread") setMessageStatus("read");
        changeConversationRoom();
      }}
    >
      <img className="conversation-photo" src={photo} alt="conversation" />
      <div className="conversation-info">
        <h1 className="conversation-title">
          {name} - {title}{" "}
          {messageStatus == "unread" ? (
            <Badge color="secondary">New</Badge>
          ) : (
            ""
          )}
        </h1>
        <p message-status={messageStatus} className="conversation-snippet">
          {text}
        </p>
      </div>
      <Dropdown
        direction="right"
        size="sm"
        isOpen={dropdownOpen}
        toggle={() => {
          setDropdownOpen(!dropdownOpen);
        }}
      >
        <DropdownToggle>
          <i class="fas fa-ellipsis-h"></i>
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem
            onClick={() => {
              readStatus == "unread"
                ? setReadStatus("unread")
                : setReadStatus("read");
              messageStatus == "unread"
                ? setMessageStatus("read")
                : setMessageStatus("unread");
            }}
          >
            Mark {readStatus}
          </DropdownItem>
          <DropdownItem onClick={toggleDelete}>Delete</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Modal isOpen={modal} toggle={toggleDelete}>
        <ModalHeader toggle={toggleDelete}>{title}</ModalHeader>
        <ModalBody>Are you sure you want to delete this Message?</ModalBody>
        <ModalFooter>
          <Button color="primary">Yes</Button>{" "}
          <Button color="secondary" onClick={toggleDelete}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

ConversationListItem.propTypes = {
  setConversationRoom: PropTypes.func.isRequired,
  messanger: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  messanger: state.messanger
});
export default connect(mapStateToProps, {
  setConversationRoom
})(ConversationListItem);
