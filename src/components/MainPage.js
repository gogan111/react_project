import React, {Component} from 'react';
import UserForm from "./UserForm";
import UserList from "./UserList";

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [{"id": 1, "name": "Johssssssn", "surname": "Doe", "age": 54, "email": "empty"},
                {"id": 2, "name": "Johnтн", "surname": "Depp", "age": 58, "email": "super@email.com"}],
            user: {
                "id":'',
                "name":'',
                "surname":'',
                "age":'',
                "email":''
            }
        };
        this.removeUser = this.removeUser.bind(this);
        this.addUser = this.addUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.saveUser = this.saveUser.bind(this);
    }

    removeUser(id) {
        let updatedUsers = [...this.state.users].filter(i => i.id !== id);
        this.setState({users: updatedUsers});
    }

    saveUser(user){

        if (user.id === ''){
            this.addUser(user)
        }else {
            this.updateUser(user)
        }
    }

    updateUser(user){
        const updateIndex = this.state.users.findIndex(item => item.id === user.id)
        let updatedUsers = [...this.state.users.slice(0, updateIndex), user, ...this.state.users.slice(updateIndex + 1)]
        this.setState({users: updatedUsers});
    }

    addUser(user) {
        let updatedUsers = [
            ...this.state.users,
            user
        ]
        this.setState({users: updatedUsers});
    }

    editUser(user){
        this.state.user.id=user.id
        this.setState({user:user})
    }

    render() {
        document.body.style.backgroundColor = "rgba(167,165,74,0.35)";
        return (
            <div align={"center"}>
                <UserForm users={this.state.users} saveUser={this.saveUser} userAttr={this.state.user}/>
                <UserList users={this.state.users} removeUser={this.removeUser} editUser={this.editUser}/>
            </div>
        )
    }
}

export default MainPage;