import React from 'react';
import Button from '@material-ui/core/Button';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

class UserForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            email: '',
            age: '',
            name: '',
            surname: '',
            show: true
        };
        this.showFormAddUser = this.showFormAddUser.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeAge = this.handleChangeAge.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeSurname = this.handleChangeSurname.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearForm = this.clearForm.bind(this);
    }

    showFormAddUser() {
        let opened = this.state.show
        this.setState({
            show: !opened,
        })
        this.props.showFormAddUser(!opened)
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.userAttr !== prevProps.userAttr) {
            this.setState({
                id: this.props.userAttr.id,
                name: this.props.userAttr.name,
                surname: this.props.userAttr.surname,
                age: this.props.userAttr.age,
                email: this.props.userAttr.email
            });
        }
        if (this.props.show !== prevProps.show) {
            this.setState({
                show: this.props.show
            });
        }
    }

    handleChangeEmail = (event) => {
        const email = event.target.value;
        this.setState({email});
    }
    handleChangeAge = (event) => {
        const age = event.target.value;
        this.setState({age});
    }
    handleChangeName = (event) => {
        const name = event.target.value;
        this.setState({name});
    }
    handleChangeSurname = (event) => {
        const surname = event.target.value;
        this.setState({surname});
    }

    handleSubmit = () => {
        const id = this.state.id
        this.setState({id});
        this.props.saveUser(this.state)
        this.clearForm()
    }

    clearForm() {
        this.setState({
            id: 0,
            name: '',
            surname: '',
            age: '',
            email: '',
        });
        this.props.showFormAddUser(false)
    }

    render() {
        return (
            <div>
                <div >

                    <AppBar position="static">
                        <Tabs value={1} aria-label="simple tabs example" >
                            <Tab value={1} label="Add User" onClick={this.showFormAddUser}/>
                        </Tabs>
                    </AppBar>
                </div>
                <div style={{visibility: this.state.show ? 'visible' : 'hidden' }}>
                    <ValidatorForm
                        ref="form"
                        onSubmit={this.handleSubmit}
                        onError={errors => console.log(errors)}
                    >
                        <br />
                        <TextValidator
                            label="Name"
                            onChange={this.handleChangeName}
                            name="name"
                            value={this.state.name}
                            validators={['required', 'matchRegexp:^([A-Z][a-z]{2,15})$']}
                            errorMessages={['this field is required', 'name is not valid']}
                        />
                        <TextValidator
                            label="Surname"
                            onChange={this.handleChangeSurname}
                            name="surname"
                            value={this.state.surname}
                            validators={['required', 'matchRegexp:^([A-Z][a-z]{2,15})$']}
                            errorMessages={['this field is required', 'surname is not valid']}
                        />
                        <TextValidator
                            label="Age"
                            onChange={this.handleChangeAge}
                            name="age"
                            value={this.state.age}
                            validators={['required', 'minNumber:1', 'maxNumber:116', 'matchRegexp:^[1-9][0-9]?$']}
                            errorMessages={['this field is required', 'invalid age', 'invalid age', 'invalid age']}
                        />
                        <TextValidator
                            label="Email"
                            onChange={this.handleChangeEmail}
                            name="email"
                            value={this.state.email}
                            validators={['required', 'isEmail']}
                            errorMessages={['this field is required', 'email is not valid']}
                        />
                        <br />
                        <Button type="submit" variant="contained" color="primary">Submit</Button>
                    </ValidatorForm>
                </div>
            </div>
        );
    }
}

export default UserForm;