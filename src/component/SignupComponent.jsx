import { useState, useEffect } from "react";
import AuthenticationService from "../services/AuthenticationService";
import React from 'react';


export default function SignupComponent() {
  const initialValues = {
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isSave, setIsSave] = useState(false);

  //   const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     setFormValues({ ...formValues, [name]: value });
  //   };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues)); //will check if there's some error in forms
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    // Object.keys(formErrors).length === 0
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      const user = { //taking the value and sending it to the backend.
        name: formValues.fullName,
        username: formValues.username,
        password: formValues.password,
      };
      AuthenticationService.saveUser(user).then((res) => { // <- backend
        console.log(res.data);
      });
      setIsSubmit(false);
      const reset = { //reset values of form after submitting.
        fullName: "",
        username: "",
        password: "",
        confirmPassword: "",
      };
      setFormValues(reset);
      setIsSave(true);
    }
  }, [formErrors, formValues, isSubmit]);

  
  const validate = (values) => {
    const errors = {};
    // const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.fullName) {
      errors.fullName = "FullName is required!";
    }

    if (!values.username) {
      errors.username = "Username is required!";
    } else if (values.username.length <= 2) {
      errors.username = "Username must be more than 2 characters";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 23) {
      errors.password = "Password cannot exceed more than 23 characters";
    }

    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Password doesn't match!";
    }

    return errors;
  };

  return (
    <div className="mt-5">
      <section className="vh-100" style={{ backgroundColor: "#eee" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: "25px" }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      {Object.keys(formErrors).length === 0 && isSave && (
                        <div className="alert alert-success fw-bolder">
                          Signed in successfully
                        </div>
                      )}
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Sign up{" "}
                      </p>
                      <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              name="fullName"
                              className="form-control"
                              value={formValues.fullName}
                              onChange={handleChange}
                            />
                            <label className="form-label">Full Name</label>
                            <p className="fw-bolder" style={{ color: "red" }}>
                              {formErrors.fullName}
                            </p>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              name="username"
                              className="form-control"
                              value={formValues.username}
                              onChange={handleChange}
                            />
                            <label className="form-label">Username</label>
                            <p className="fw-bolder" style={{ color: "red" }}>
                              {formErrors.username}
                            </p>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              name="password"
                              className="form-control"
                              value={formValues.password}
                              onChange={handleChange}
                            />
                            <label className="form-label">Password</label>
                            <p className="fw-bolder" style={{ color: "red" }}>
                              {formErrors.password}
                            </p>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              name="confirmPassword"
                              className="form-control"
                              value={formValues.confirmPassword}
                              onChange={handleChange}
                            />
                            <label className="form-label">
                              Confirm password
                            </label>
                            <p className="fw-bolder" style={{ color: "red" }}>
                              {formErrors.confirmPassword}
                            </p>
                          </div>
                        </div>

                        <div className="form-check d-flex justify-content-center mb-5">
                          <input
                            className="form-check-input me-2"
                            type="checkbox"
                            value=""
                            id="form2Example3c"
                          />
                          <label className="form-check-label">
                            I agree all statements in{" "}
                            <a href="#!">Terms of service</a>
                          </label>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button className="btn btn-primary btn-lg">
                            Register
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid"
                        alt="Some Pic"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
