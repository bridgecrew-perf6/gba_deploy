import React, { Component } from "react";
import "../css/register.css";
import decode from "jwt-decode";
import { Redirect } from 'react-router-dom';

class AdminPage extends Component {
  render() {

    const decoded = decode(sessionStorage.getItem("access_token"));


    return (
      
      <div className="mt-5">
        { decoded.roles[0] === 'ROLE_ADMIN' ?
        <section className="pb-5 header text-center">
        <div className="container py-5 text-white">
        </div>
        <h1 className="mb-5s">IF YOU CAN SEE THIS, YOU MUST BE AN ADMIN</h1>
        <div className="text-center">
          <span className="animated-btn text-white">
            <i className="fa fa-play"></i>
          </span>
        </div>
      </section> : <Redirect to="/403"></Redirect> }
        
      </div>
    );
  }
}

export default AdminPage;
