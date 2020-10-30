import React, { Component } from "react";

class UserCount extends Component {
  state = {
    userExists: false,
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
      this.state = { userExist: true }; //If use setState system (not working)
    } else {
      this.state = { userExist: false }; //If use setState system (not working)
    }

    return (
      <div>
        <Greeting userExist={userExist} />
      </div>
    );
  }
}

export default UserCount;
