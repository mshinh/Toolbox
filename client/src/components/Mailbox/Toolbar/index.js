import React from "react";
import "./Toolbar.css";

export default function Toolbar(props) {
  const { room, title, name, photo, leftItems, rightItems } = props;

  let newtitle = "";

  if (title != "Mailbox") {
    if (name != undefined && title != undefined) {
      newtitle = name + " - " + title;
    }
  }
  return (
    <div className="toolbar">
      {title != "Mailbox" ? (
        <img className="toolbar-photo" src={photo} alt="conversation" />
      ) : (
        ""
      )}
      {title == "Mailbox" ? <div className="left-items"></div> : ""}
      <h1 className="toolbar-title">{title == "Mailbox" ? title : newtitle}</h1>
      <div className="right-items">{rightItems}</div>
    </div>
  );
}
