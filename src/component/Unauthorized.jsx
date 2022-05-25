import "../css/register.css";
import React from 'react';

export default function Unauthorized() {
  
    return (
      <div>
        <header className="masthead">
          <div className="container h-100">
            <div className="row h-100 align-items-center">
              <div className="col-12 text-center">
                <h1 className="fw-light">Access to localhost was denied.</h1>
                <p className="lead">You don't have the user rights to view this page.</p>
                <p className="lead">HTTP ERROR 403</p>
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  
}
