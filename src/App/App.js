import React, { Component } from "react";
import Pagination from "react-js-pagination";
import "bootstrap/dist/css/bootstrap.min.css";
import GuestItem from "../GuestItem/GuestItem";
import "./App.css";
import UserCount from "../UserCount";

//Usefake server
class App extends Component {
  componentDidMount() {
    fetch("http://localhost:5000/guests")
      .then((res) => res.json())
      .then(
        (result) => {
          const converted_guests = result.map((user) => {
            return {
              user,
              arrived: false,
            };
          });
          this.setState({
            isLoaded: true,
            guests: converted_guests,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  state = {
    guests: [],
    filtered_guests: [],
    pageResults: [],
    value: "",
    error: null,
    currentPage: 1,
    activePage: 1,
    guestsPerPage: 5,
    currentGuest: [],
  };
  //Changing guest status
  changeUserStatus = (index) => (event) => {
    let changedUsers = this.state.guests.map((guest) => {
      if (guest.user.index === index) {
        guest.arrived = !guest.arrived;
      }
      return guest;
    });
    this.setState({ guests: changedUsers });
  };

  changeHandler = (e) => {
    if (e.target.value.length < 1) {
      this.setState({
        value: "",
        filtered_guests: [],
        warning: "",
      });
      return;
    }
    //Filter guests by some important properties
    const query = e.target.value.toLowerCase();
    const props = ["name", "company", "address"]; //Add prop if needed
    const filteredUsers = this.state.guests.filter((guest) => {
      for (var key of props) {
        if (guest.user[key].toLowerCase().indexOf(query) > -1) {
          return true;
        }
      }
      return false;
    });

    this.setState({
      value: query,
      filtered_guests: filteredUsers,
    });
  };
  // Change page by click on it
  handlePageChange(currentPage) {
    this.setState({ activePage: currentPage });
  }

  render = () => {
    const { changeUserStatus, changeHandler } = this;
    const {
      guests,
      filtered_guests,
      value,
      currentPage,
      guestsPerPage,
      activePage,
    } = this.state;

    //Get all existing filtered data-users, that are in input (not rendered)
    let data = guests;
    if (filtered_guests.length > 0) {
      data = filtered_guests;
    }

    //Calculate guests per page, set current page
    const indexOfLastGuest = activePage * guestsPerPage;
    const indexOfFirstGuest = indexOfLastGuest - guestsPerPage;
    const currentGuest = guests.slice(indexOfFirstGuest, indexOfLastGuest);
    const paginate = (pageNumber) => currentPage(pageNumber);

    return (
      <div className="main-wrapper">
        <div>
          <h1> Guest manager </h1>
          <hr />
        </div>
        <div className="main-form">
          <section>
            <form action="">
              <h1 id="no-guests">
                <UserCount filtered_guests={filtered_guests} />
              </h1>

              <p className="warning2"></p>
              <div className="input-container">
                <input
                  id="name"
                  className="input"
                  type="text"
                  pattern=".+"
                  required
                  value={value}
                  onChange={changeHandler}
                />
                <label className="label" htmlFor="name">
                  Mrs./Ms. Total:<span>{filtered_guests.length}</span>
                </label>
              </div>
            </form>
          </section>

          <div className="guest-list">
            {currentGuest.map((guest) => {
              return (
                <GuestItem
                  key={guest.user._id}
                  changeStatus={changeUserStatus}
                  guest={guest}
                />
              );
            })}
          </div>
        </div>

        <nav id="pagination-div">
          <Pagination
            itemClass="page-item" //custom style
            linkClass="page-link" //custom style
            activePage={this.state.activePage}
            itemsCountPerPage={guestsPerPage}
            totalItemsCount={guests.length}
            paginate={paginate}
            onChange={this.handlePageChange.bind(this)}
          />
        </nav>
      </div>
    );
  };
}

export default App;
