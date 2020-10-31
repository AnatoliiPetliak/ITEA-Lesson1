import React, { Component } from "react";

class UserCount extends Component {
  state = {
    userExist: true,
  };

  Greeting(props) {
    const userExist = props.userExist;

    if (userExist) {
      return <h1>No such user!</h1>;
    }
    return <h1>Find your guests!</h1>;
  }

  render() {
    const { filtered_guests } = this.props;
    const { Greeting } = this;
    const userExist = this.state.userExist;

    if (filtered_guests.length > 0) {
      this.state = { userExist: true };
    } else {
      this.state = { userExist: false };
    }

    return (
      <div>
        <Greeting userExist={userExist} />
      </div>
    );
  }
}

export default UserCount;
