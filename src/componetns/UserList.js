import React, {Component} from 'react';
import Table from "@material-ui/core/Table";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Typography from "@material-ui/core/Typography";

class UserList extends Component {

    constructor(props) {
        super(props);
        this.state={users:[]}
        this.removeUser = this.removeUser.bind(this);
    }

    removeUser(user) {
        this.props.removeUser(user);
    }
    editUser(user) {
        this.props.editUser(user)
    }

    render() {
        const users = this.props.users;
        users.sort((a, b) => a.id - b.id);

        const userList = users.map(user => {
            return <tr key={user.id}>
                <td align={'center'}>{user.id}</td>
                <td align={'center'}>{user.name}</td>
                <td align={'center'}>{user.surname}</td>
                <td align={'center'}>{user.age}</td>
                <td align={'center'}>{user.email}</td>

                <td align={'center'}>
                    <ButtonGroup>
                        <Button size="small" variant="contained" color="primary"
                                onClick={() => this.editUser(user)} >Edit</Button>
                        <Button size="small" variant="contained" color="secondary"
                                onClick={() => this.removeUser(user)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <Container fixed>
                    <h3 align={'center'}>User List</h3>
                    <Typography component="div" style={{backgroundColor: 'rgba(89,227,246,0.14)'}}>
                        <Table >
                            <thead>
                            <tr style={{backgroundColor: 'rgba(89,141,246,0.41)'}}>
                                <th align={'center'} width="5%">ID</th>
                                <th align={'center'} width="20%">Name</th>
                                <th align={'center'} width="20%">Surname</th>
                                <th align={'center'} width="10%">Age</th>
                                <th align={'center'} width="30%">Email</th>
                                <th align={'center'} width="20%">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            <br />
                            {userList}
                            <br />
                            </tbody>
                        </Table>
                    </Typography>
                </Container>
            </div>
        );
    }
}

export default UserList;