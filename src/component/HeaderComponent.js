import AuthenticationService from '../services/AuthenticationService';
import { useHistory } from 'react-router';
import React from 'react';

export default function HeaderComponent() {

  const history = useHistory();

  const logout = () => {
    AuthenticationService.logout();
  }

  

  const welcome = () => {
    history.push("/welcome");
  }

  const goItem = () => {
    history.push("/items");
  }  

  const goClerk = () => {
    history.push("/clerk");
  }

  const goAdmin = () => {
    history.push("/admin");
  }

  const goLog = () =>{
    history.push("/login");
  }

  const register = () => {
    history.push("/signup");
  }

  return (

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <span className="navbar-brand fw-bolder hover-overlay h-pointer" onClick={welcome}>Grocery Bill Application</span>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">

          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <span className="nav-link hover-overlay h-pointer" onClick={goItem}>{sessionStorage.getItem("isLogin") === "true" ? <span>Items</span> : <></>}</span>
            </li>
            <li className="nav-item">
              <span className="nav-link hover-overlay h-pointer" onClick={goClerk}>{sessionStorage.getItem("isLogin") === "true" ? <span>Clerk</span> : <></>}</span>
            </li>
            <li>
              <span className="nav-link hover-overlay h-pointer" onClick={goAdmin}>{sessionStorage.getItem("isLogin") === "true" ? <span>Admin</span> : <></>}</span>
            </li>
          </ul>
          <span className="navbar-text">
            {sessionStorage.getItem("isLogin") === "true" ?
              <span className="fw-bolder h-pointer" style={{ color: 'red' }} onClick={logout}>Logout</span>
              : <> <span className="h-pointer" onClick={goLog}>Login | </span>
                <span className='h-pointer' onClick={register}>Sign up</span></>}

          </span>
        </div>
      </div>
    </nav>
  );
}


