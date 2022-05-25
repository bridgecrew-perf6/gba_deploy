import React from "react";
import ClerkService from "../services/ClerkService";
import decode from 'jwt-decode';


export default class ClerkComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      clerks: [],
    };

    this.addClerk = this.addClerk.bind(this);
    this.editClerk = this.editClerk.bind(this);
    this.deleteClerk = this.deleteClerk.bind(this);
  }

  componentDidMount() {
    ClerkService.getClerk().then((response) => {
      this.setState({ clerks: response.data });
    });
    
  }

  editClerk(id) {
    this.props.history.push(`/update-clerk/${id}`);
  }

  addClerk() {
    this.props.history.push("/add-clerk");
  }

  deleteClerk(id) {
    ClerkService.deleteClerk(id).then(res => {
      this.setState({
        clerks: this.state.clerks.filter(clerk => clerk.id !== id)
      });
    });
  }

  render() {

    
      const decodeJwt = decode(sessionStorage.getItem("access_token"));
    
    return (
      <div className="mlr-5">
        <div className="row-2">
          <h2 className="text-center mt-5">List of Clerk</h2>
          <div className="text-start">

            {decodeJwt.roles[0] === "ROLE_ADMIN" &&
             <button className="btn btn-primary" onClick={this.addClerk}>
              Add
            </button> }
            
          </div>
          <table className="table table-striped table-bordered">
            <thead>
              <tr className="fw-bolder">
                <td>ID</td>
                <td>NAME</td>
                {decodeJwt.roles[0] === "ROLE_ADMIN" &&
                <td>ACTIONS</td>}
              </tr>
            </thead>
            <tbody>
              {this.state.clerks.map(clerk => 
                <tr key={clerk.id}>
                  <td>{clerk.id}</td>
                  <td>{clerk.name} </td>
                  {decodeJwt.roles[0] === "ROLE_ADMIN" &&
                  <td>
                    <button
                      onClick={() => this.editClerk(clerk.id)}
                      className="btn btn-info"
                    >
                      Update
                    </button>
                    &nbsp;
                    <button
                      onClick={() => this.deleteClerk(clerk.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>}
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
