import React, {Component} from 'react';
import UserForm from "./UserForm";
import UserList from "./UserList";

class MainPage extends Component {
    PATH = "http://34.132.2.213:8085/project/rest/persons"

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            user: {
                "id": 0,
                "name": '',
                "surname": '',
                "age": '',
                "email": ''
            },
            show: true
        };

        this.removeUser = this.removeUser.bind(this);
        this.addUser = this.addUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.saveUser = this.saveUser.bind(this);
        this.showFormAddUser = this.showFormAddUser.bind(this);
    }

    componentDidMount() {
        fetch(this.PATH)
            .then(response => {
                    response.json()
                        .then(data => {
                                this.setState({users: data})
                            }
                        )
                }
            )
    }

    saveUser(user) {
        if (user.id === 0) {
            this.addUser(user)
        } else {
            this.updateUser(user)
        }
    }

    editUser(user) {
        this.setState({user: user})
    }

    addUser(user) {
        fetch(this.PATH, {
            body: JSON.stringify({user}),
            mode: "cors",
            method: "POST",
        }).then(response => {
                if (response.ok) {
                    response.json()
                        .then(data => {
                                let updatedUsers = [
                                    ...this.state.users,
                                    data
                                ]
                                this.setState({users: updatedUsers});
                            }
                        )
                } else if (response.status === 400) {
                    let newUser = user
                    newUser.email = ''
                    response.json()
                        .then(data => {
                                alert(data.error)
                            }
                        )
                    this.editUser(newUser);
                    this.showFormAddUser(true)
                } else {
                    alert('not added')
                }
            }
        );
    }

    updateUser(user) {

        fetch(this.PATH, {
            mode: "cors",
            body: JSON.stringify({user}),
            method: "POST",
        })
            .then(response => {
                    if (response.ok) {
                        const updateIndex = this.state.users.findIndex(item => item.id === user.id)
                        let updatedUsers = [...this.state.users.slice(0, updateIndex), user, ...this.state.users.slice(updateIndex + 1)]
                        this.setState({users: updatedUsers});
                    } else {
                        alert(
                            'not deleted'
                        )
                    }
                }
            )
    }

    removeUser(user) {
        fetch(this.PATH, {
            mode: "cors",
            body: JSON.stringify({user}),
            method: "DELETE",
        })
            .then(response => {
                    if (response.ok) {
                        let updatedUsers = [...this.state.users].filter(i => i.id !== user.id);
                        this.setState({users: updatedUsers});
                    } else {
                        alert("not deleted")
                    }
                }
            )
    }

    showFormAddUser(some) {
        this.setState({show: some})
    }

    render() {
        document.body.style.background = "linear-gradient(to bottom, #33ccff 0%, #ff99cc 100%)";
        return (
            <div align={"center"}>
                <UserForm users={this.state.users}
                          userAttr={this.state.user}
                          show={this.state.show}
                          saveUser={this.saveUser}
                          showFormAddUser={this.showFormAddUser}/>
                <UserList users={this.state.users}
                          show={this.state.show}
                          editUser={this.editUser}
                          removeUser={this.removeUser}
                          showFormAddUser={this.showFormAddUser}/>
            </div>
        )
    }
}

export default MainPage;