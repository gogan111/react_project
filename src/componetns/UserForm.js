import React from 'react';
import Button from '@material-ui/core/Button';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

class UserForm extends React.Component {

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
    }

    state = {
        id: 0,
        email: '',
        age: '',
        name: '',
        surname: ''
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
            email: ''
        });
    }

    render() {
        return (
            <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}
                onError={errors => console.log(errors)}
            >
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
                    errorMessages={['this field is required', 'email is not valid', 'some thing']}
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
        );
    }
}

export default UserForm;