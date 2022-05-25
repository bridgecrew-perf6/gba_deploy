import React, { Component } from "react";
import AuthenticationService from "../services/AuthenticationService";


class LoginComponent extends Component {

  constructor(props){
    super(props)

    this.state = {
      username: '',
      password:'',
      hasLoginFailed: false
    }
    

    this.handleChange = this.handleChange.bind(this)
    this.loginClicked = this.loginClicked.bind(this)
  }

  handleChange(event) {
    this.setState({
            [event.target.name] : event.target.value
        })
  }

  isLogout = () => {
    if(sessionStorage.getItem("isLogin") && sessionStorage.getItem("isLogin") === "false"){
      return <div className="fw-bolder alert alert-success">You have been logged out</div>
    }
  }

  loginClicked = () => {
    const params = new URLSearchParams();
    params.append("username", this.state.username);
    params.append("password", this.state.password);
    
    

    AuthenticationService.login(params).then((response) => {
      // console.log(response);
      if(response.status === 200){
        
        sessionStorage.setItem("access_token", JSON.stringify(response.data.Access_Token))
        sessionStorage.setItem("isLogin",true)
        this.props.history.push("/welcome");
        
        window.location.reload();
        console.log(response);
        
      }
    }).catch(error => {
      console.log(error.data);
      sessionStorage.clear();
      this.setState({hasLoginFailed : true})
      
    })
    params.delete("username");
    params.delete("password");
  }

  signup = () =>{
    this.props.history.push('/signup')
  }
  

  render() {
    return (
      <div className="mt-3">
        <section className="vh-100 gradient-custom">
        
                    
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div
                  className="card bg-dark text-white"
                  style={{borderRadius: "1rem"}}
                >
                  <div className="card-body p-5 text-center">
                    <div className="mb-md-5 mt-md-4 pb-5">
                      <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                      {this.isLogout()}
                      <div className="form-outline form-white mb-4">
                        <input
                          type="email"
                          id="typeEmailX"
                          className="form-control form-control-lg mt-4"
                          name={'username'} value={this.state.username} onChange={this.handleChange}
                        />
                        <label className="form-label">
                          Username
                        </label>
                      </div>

                      <div className="form-outline form-white mb-4">
                        <input
                          type="password"
                          id="typePasswordX"
                          className="form-control form-control-lg"
                          name={'password'} value={this.state.password} onChange={this.handleChange}
                        />
                        <label className="form-label">
                          Password
                        </label>
                      </div>
                      {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                      <p className="small mb-5 pb-lg-2">
                        <a className="text-white-50" href="#!">
                          Forgot password?
                        </a>
                      </p>

                      <button
                        className="btn btn-outline-light btn-lg px-5"
                        type="submit" onClick={this.loginClicked}
                      >
                        Login
                      </button>
                    </div>

                    <div>
                      <p className="mb-0">
                        Don't have an account?{" "}
                        <span onClick={this.signup} className="text-white-50 fw-bold h-pointer">
                          Sign Up
                        </span>
                      </p>
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
}

export default LoginComponent;
