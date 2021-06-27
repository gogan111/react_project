import React, {Component} from 'react';
import UserForm from "./UserForm";
import UserList from "./UserList";

class MainPage extends Component {
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
        fetch("http://109.227.122.143:9000/rest/persons")
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
        this.setState({user:user})
    }

    addUser(user) {
        fetch("http://109.227.122.143:9000/rest/persons", {
            body: JSON.stringify({user}),
            mode: "cors",
            method: "POST",
        }).then(response => {
                alert("status " + response.status)
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
                } else {
                    alert('not added')
                }
            }
        );
    }

    updateUser(user) {

        fetch("http://109.227.122.143:9000/rest/persons", {
            mode: "cors",
            body: JSON.stringify({user}),
            method: "POST",
        })
            .then(response => {
                    alert("status from update" + response.status)
                    if (response.ok) {
                        const updateIndex = this.state.users.findIndex(item => item.id === user.id)
                        let updatedUsers = [...this.state.users.slice(0, updateIndex), user, ...this.state.users.slice(updateIndex + 1)]
                        this.setState({users: updatedUsers});
                    } else {
                        alert('not deleted')
                    }
                }
            )
    }

    removeUser(user) {
        alert("dell " + user.id)
        fetch("http://109.227.122.143:9000/rest/persons", {
            mode: "cors",
            body: JSON.stringify({user}),
            method: "DELETE",
        })
            .then(response => {
                    alert(response.status)
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
                          saveUser={this.saveUser}
                          userAttr={this.state.user}
                          show={this.state.show}
                          showFormAddUser={this.showFormAddUser}/>
                <UserList users={this.state.users}
                          removeUser={this.removeUser}
                          editUser={this.editUser}
                          show={this.state.show}
                          showFormAddUser={this.showFormAddUser}/>
            </div>
        )
    }
}

export default MainPage;