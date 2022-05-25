import React, { Component } from "react";
import "../css/register.css";


export default class NotFound extends Component {
  render() {
    return (
      <div className="mt-5">
        <div id="error-page">
          <div className="content">
            <h2 className="header" data-text="404">
              404
            </h2>
            <h3 data-text="Opps! Page not found">Oops! Page not found</h3>
            <p>
              The Page you are looking for might have been removed had its name changed
              or its temporarily unavailable.
            </p>
          </div>
        </div>
      </div>
    );
  }
}
