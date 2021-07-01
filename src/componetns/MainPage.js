import React, {Component} from 'react';
import UserForm from "./UserForm";
import UserList from "./UserList";
import UserService from "../UserService";

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
        UserService.getUsers()
            .then(response => {
                    this.setState({users: response.data})
                }
            )
            .catch(error => {
                alert(error)
            })
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
        UserService.createUser(user)
            .then(response => {
                    if (response.status === 200) {
                        let updatedUsers = [
                            ...this.state.users,
                            response.data
                        ]
                        this.setState({users: updatedUsers});
                    }
                }
            )
            .catch(error => {
                alert(error)
            });
    }

    updateUser(user) {
        UserService.updateUser(user)
            .then(response => {
                    if (response.status === 200) {
                        const updateIndex = this.state.users.findIndex(item => item.id === user.id)
                        let updatedUsers = [...this.state.users.slice(0, updateIndex), user, ...this.state.users.slice(updateIndex + 1)]
                        this.setState({users: updatedUsers});
                    } else {
                        alert(response.data.error)
                    }
                }
            )
            .catch(error => {
                alert(error)
            });
    }

    removeUser(user) {
        UserService.delete(user.id)
            .then(response => {
                    if (response.status === 200) {
                        let updatedUsers = [...this.state.users].filter(i => i.id !== user.id);
                        this.setState({users: updatedUsers});
                    }
                }
            )
            .catch(error => {
                alert(error)
            });
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