import React, { Component } from "react";
import "./GuestItem.css";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

class GuestItem extends Component {
  render = () => {
    const { guest, changeStatus } = this.props;

    let { arrived, user } = guest;

    return (
      <div className="guest-status">
        <li className={arrived ? "status__arrived" : "status_notarrived"}>
          <div>
            Guest {user.name} is working by "{user.company}"{" "}
          </div>
          <div>His contucts:</div>
          <div>{user.phone}</div>
          <div>{user.address}</div>
          <Button
            variant="dark"
            id="user-btn"
            onClick={changeStatus(user.index)}>
            {" "}
            {arrived ? "Arrived" : "Absent"}
          </Button>{" "}
        </li>
      </div>
    );
  };
}

export default GuestItem;
