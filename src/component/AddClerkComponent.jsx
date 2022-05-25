import React from 'react';
import ClerkService from "../services/ClerkService";
import "../css/register.css";
import { useEffect, useState } from "react";
import {useHistory} from "react-router";


export default function AddClerkComponent() {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     name: "",
  //     userName: "",
  //     password: "",
  //   };

  //   this.changeClerkName = this.changeClerkName.bind(this);
  //   this.changeUserName = this.changeUserName.bind(this);
  //   this.changePassword = this.changePassword.bind(this);
  //   this.saveClerk = this.saveClerk.bind(this);
  // }
  const history = useHistory();

  const initialValues = {
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);


  const handleSumbit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);

    
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      let clerk = {
        name: formValues.name,
        username: formValues.username,
        password: formValues.password,
      };
      console.log("clerk => " + JSON.stringify(clerk));
  
      ClerkService.addClerk(clerk).then((res) => {
        history.push("/clerk");
        console.log(res.data)
      });
    
    }
  })

  const validate = (values) => {
    const errors = {};
    // const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.name) {
      errors.name = "Name is required!";
    }

    if (!values.username) {
      errors.username = "Username is required!";
    }

    if (!values.password) {
      errors.password = "Password is required!";
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = "Please confirm your password!";
    }else if(values.password !== values.confirmPassword){
      errors.confirmPassword = "Password doesn't match";
    }

    return errors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // changeClerkName = (event) => {
  //   this.setState({ name: event.target.value });
  // };

  // changeUserName = (event) => {
  //   this.setState({ userName: event.target.value });
  // };

  // changePassword = (event) => {
  //   this.setState({ password: event.target.value });
  // };

  const cancel = () => {
    history.push("/clerk");
  }

  
    return (
      <div>
        <div className="row">
          <div className="col-lg-10 col-xl-9 mx-auto">
            <div className="card flex-row my-5 border-0 shadow rounded-3 overflow-hidden">
              <div className="card-img-left d-none d-md-flex"></div>
              <div className="card-body p-4 p-sm-5">
                <h5 className="card-title text-center mb-5 fw-light fs-5">Add</h5>
                <form>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      id="floatingInputName"
                      placeholder="Full Name"
                      value={formValues.name}
                      onChange={handleChange}
                    />
                    <label>Full Name</label>
                    <p className="fw-bolder" style={{ color: "red" }}>
                              {formErrors.name}
                            </p>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      name="username"
                      className="form-control"
                      placeholder="Username"
                      value={formValues.username}
                      onChange={ handleChange }
                    />
                    <label>Username</label>
                    <p className="fw-bolder" style={{ color: "red" }}>
                              {formErrors.username}
                            </p>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Password"
                      value={formValues.password}
                      onChange={handleChange}
                    />
                    <label>Password</label>
                    <p className="fw-bolder" style={{ color: "red" }}>
                              {formErrors.password}
                            </p>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      name= "confirmPassword"
                      className="form-control"
                      id="floatingPasswordConfirm"
                      placeholder="Confirm Password"
                      value={formValues.confirmPassword}
                      onChange={handleChange}
                    />
                    <label>
                      Confirm Password
                    </label>
                    <p className="fw-bolder" style={{ color: "red" }}>
                              {formErrors.confirmPassword}
                            </p>
                  </div>

                  <div className="d-grid mb-2">
                    <button
                      className="btn btn-lg btn-primary btn-login fw-bold text-uppercase"
                      type="submit"
                      onClick={handleSumbit}
                    >
                      Add Clerk
                    </button>
                    &nbsp;
                    <button
                    className="btn btn-lg btn-danger btn-login text-uppercase"
                    type="submit"
                    onClick={cancel}
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
