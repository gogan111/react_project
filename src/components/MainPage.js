import React, {Component} from 'react';
import UserForm from "./UserForm";
import UserList from "./UserList";

class MainPage extends Component {

    render() {
        document.body.style.backgroundColor = "rgba(167,165,74,0.35)";
        return (
            <div>
                <UserForm/>
                <UserList/>
            </div>
        )

    }

}

export default MainPage;