import React, { Component } from 'react';
import ClerkService from '../services/ClerkService';

class UpdateClerkComponent extends Component {
    constructor(props){
        super(props);

        this.state = {
            id: this.props.match.params.id,
            name:"",
            username:"",
            password:"",
            confirmPassword:""
        }

        this.changeClerkName = this.changeClerkName.bind(this);
        this.changeUserName = this.changeUserName.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.changeConfirmPassword = this.changeConfirmPassword.bind(this);
        this.updateClerk = this.updateClerk.bind(this);


    }

    componentDidMount(){
        ClerkService.getClerkById(this.state.id).then((res) => {
            let clerk = res.data;
            this.setState({name : clerk.name,
                    username: clerk.username,
                    password : "",
                    confirmPassword: ""})
        })
    }

    updateClerk = (e) => {
        e.preventDefault();
        let clerk = {
            name: this.state.name,
            username: this.state.username,
            password: this.state.password,
            confirmPassword:this.state.confirmPassword,
        };
        console.log("Clerk => " + JSON.stringify(clerk));

        ClerkService.editClerk(clerk, this.state.id).then( res =>{
            this.props.history.push('/clerk');
        });
       
    };

    changeClerkName = (event) => {
        this.setState({ name: event.target.value });
    };

    changeUserName = (event) => {
        this.setState({ username: event.target.value });
    };

    changePassword = (event) => {
        this.setState({ password: event.target.value });
    };

    changeConfirmPassword = (event) => {
        this.setState({ confirmPassword: event.target.value });
    };

    cancel() {
        this.props.history.push("/clerk");
    }


    render() {
        return (
            <div className='mt-5'>
                <div className="container mt-4">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 bg-light bg-gradient">
                            <h3 className="text-center pt-4">Edit Clerk</h3>
                            <div className="card-body">
                                <form className="text-start">
                                    <div className="form-group">
                                        <label className="pt-1">Full Name: </label>
                                        <input
                                            placeholder="Name"
                                                name="clerkName"
                                            className="form-control"
                                            value={this.state.name}
                                            onChange={this.changeClerkName}
                                            required
                                        />
                                        <label className="pt-3">Username: </label>
                                        <input
                                            placeholder="Username"
                                            name="username" 
                                            className="form-control"
                                            value={this.state.username}
                                            onChange={this.changeUserName}
                                            required
                                        />
                                        <label className="pt-3">Password: </label>
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            name="password"
                                            className="form-control"
                                            value={this.state.password}
                                            onChange={this.changePassword}
                                            required
                                        />
                                        <label className="pt-3">Confirm Password: </label>
                                        <input
                                            type="password"
                                            placeholder="Confirm Password"
                                            name="confirmPassword"
                                            className="form-control"
                                            value={this.state.confirmPassword}
                                            onChange={this.changeConfirmPassword}
                                            required
                                        />
                                    </div>
                                    <div className="pt-3 text-center">
                                        <button className="btn btn-success" onClick={this.updateClerk}>
                                            Update
                                        </button>
                                        &nbsp;
                                        <button
                                            className="btn btn-danger"
                                            onClick={this.cancel.bind(this)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UpdateClerkComponent;