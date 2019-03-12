import React from "react";
import styled from "styled-components";
import {BaseContainer} from "../../helpers/layout";
import {getDomain} from "../../helpers/getDomain";
import {Button} from "../../views/design/Button";
import Edit from "./Edit";
import Game from "./Game";


const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
`;

const InputField = styled.input`
  &::placeholder {
    color: rgba(255, 255, 255, 0.2);
  }
  height: 35px;
  padding-left: 15px;
  margin-left: -4px;
  border: none;
  border-radius: 20px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  width: 100%;
`;

class Overview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            edit: false,
            back: false
        };
        console.log(props);
        let users = null;
        fetch(`${getDomain()}/users/` + sessionStorage.id.toString(), {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(async user => {
                //         await new Promise(resolve => setTimeout(resolve, 800));
                users = user;
                console.log(user, this.state);

            })
            .catch(err => {
                console.log(err);
                alert("Something went wrong")
            });
        this.state = {
            user: users,
            edit: false
        };

    }

    componentDidCatch(error, info) {
        // You can also log the error to an error reporting service
        console.log(error, info);
    }

     componentDidMount() {
         console.log("edit mounted");
         console.log(`${getDomain()}/users/` + sessionStorage.id.toString());
        this.render();
     }

     edit() {
        if (this.props.token === sessionStorage.getItem("token")){
            this.setState({edit: true})
        } else alert("Logged in Users can only edit their own page.")
     }

     back() {
        this.setState({back: true});
     }



    render() {
        if (this.state.edit) {
            return (<Edit username={this.props.username}
                          status={this.props.state}
                          dateOfCreation={this.props.dateOfCreation}
                          dateOfBirth={this.props.dateOfBirth}
                          token={this.props.token} />)
        }
        if (this.state.back) {
            return (<Game/>)
        }
        if (this.props != null) {
            return (
                <Container>
                    <div>
                        <div>
                            Username: {this.props.username}
                        </div>
                        <div>
                            Status: {this.props.status}
                        </div>
                        <div>
                            Date of Creation: {this.props.dateOfCreation}
                        </div>
                        <div>
                            Date of Birth: {this.props.dateOfBirth}
                        </div>
                        <Button
                            width="100%"
                            onClick={() => {
                                this.edit();
                            }}
                        >
                            Edit
                        </Button>
                        <Button
                            width="100%"
                            onClick={() => {
                                this.back();
                            }}
                        >
                            Back
                        </Button>
                    </div>
                </Container>
            );
        }
        return ({});
    }
}

export default Overview;