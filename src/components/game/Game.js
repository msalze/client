import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { getDomain } from "../../helpers/getDomain";
import Player from "../../views/Player";
import { Spinner } from "../../views/design/Spinner";
import { Button } from "../../views/design/Button";
import { withRouter } from "react-router-dom";
import Overview from "./Overview";
import User from "../shared/models/User";

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
`;

const Users = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const PlayerContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null,
      overview: null
    };
  }

  logout() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("id");
    this.props.history.push("/login");
  }

  overview(user) {
    this.setState({overview: user});
    this.render();
  }

  componentDidMount() {
    fetch(`${getDomain()}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(async users => {
        // delays continuous execution of an async operation for 0.8 seconds.
        // This is just a fake async call, so that the spinner can be displayed
        // feel free to remove it :)
        await new Promise(resolve => setTimeout(resolve, 800));
        this.setState({ users });
        if (users.length < 1) {
          this.logout();
        }
      })
      .catch(err => {
        console.log(err);
        alert("Something went wrong fetching the users: " + err);
      });
  }

  render() {
    if (this.state.overview != null) {
      console.log(this.state.overview.status)
      return (
          <Overview username={this.state.overview.username}
                    status={this.state.overview.status === "ONLINE"}
                    dateOfCreation={this.state.overview.dateOfCreation}
                    dateOfBirth={this.state.overview.dateOfBirth}
                    token={this.state.overview.token}
          />
      )
    }
    return (
      <Container>
        <h2>Happy Coding! </h2>
        <p>Get all users from secure end point:</p>
        {!this.state.users ? (
          <Spinner />
        ) : (
          <div>
            <Users>
              {this.state.users.map(user => {
                return (
                  <PlayerContainer key={user.id}
                     onClick={() => {
                       this.overview(user);
                     }}>
                    <Player user={user} />
                  </PlayerContainer>
                );
              })}
            </Users>
            <Button
              width="100%"
              onClick={() => {
                this.logout();
              }}
            >
              Logout
            </Button>
          </div>
        )}
      </Container>
    );
  }
}

export default withRouter(Game);
