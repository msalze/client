import React from "react";
import styled from "styled-components";
import {BaseContainer} from "../../helpers/layout";
import {getDomain} from "../../helpers/getDomain";
import {Button} from "../../views/design/Button";
import Overview from "./Overview";
import User from "../shared/models/User";


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

class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            username: null,
            dateOfBirth: null,
            updateSuccessful: false
        };

    }

    componentDidCatch(error, info) {
        // You can also log the error to an error reporting service
        console.log(error, info);
    }

     componentDidMount() {
         fetch(`${getDomain()}/users/` + sessionStorage.id.toString(), {
                 method: "GET",
                 headers: {
                     "Content-Type": "application/json"
                 }
             })
                 .then(response => response.json())
                 .then(async user => {
                     //         await new Promise(resolve => setTimeout(resolve, 800));
                     this.setState({user});

                 })
                 .catch(err => {
                     alert("Something went wrong")
                 });
     }

     handleChange(e) {
        if (e.target.type === "text") {
            this.setState({ username: e.target.value });
        } else if (e.target.type === "date") {
            this.setState({dateOfBirth: e.target.value});
        }
     }

    save() {
        let user = new User();
        if (this.state.username !== null) {
            user.username = this.state.username;
        }
        if (this.state.dateOfBirth !== null) {
            user.dateOfBirth = this.state.dateOfBirth;
        }
        fetch(`${getDomain()}/users/` + sessionStorage.id.toString(), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: user.username,
                dateOfBirth: user.dateOfBirth
            })
        })
            .then(response => {
                if (response.status === 204) {
                    this.setState({updateSuccessful: true})
                } else if (response.status === 409) {
                    alert("The username is already taken")
                }

            })
            .then(async user => {
                await new Promise(resolve => setTimeout(resolve, 800));
                this.setState({user});
            })
            .catch(err => {
                console.log(err);
                alert("Something went wrong")
            });
    }

    render() {
        if (this.state.updateSuccessful) {
            return (<Overview username={this.state.username}
                              dateOfBirth={this.state.dateOfBirth}
                              status={this.props.state}
                              dateOfCreation={this.props.dateOfCreation}
                              token={this.props.token}
            />)
        }
        return (
            <Container>
                <div>
                <InputField type="text"
                            value={this.state.username}
                            onChange={ this.handleChange.bind(this) } >

                </InputField>
                    <InputField type="date"
                                value={this.state.dateOfBirth}
                                onChange={this.handleChange.bind(this)}

                    >

                    </InputField>
                    <Button
                        width="100%"
                        onClick={() => {
                            this.save();
                        }}
                    >
                        Save
                    </Button>
                </div>
            </Container>
        );
    }
}

export default Edit;