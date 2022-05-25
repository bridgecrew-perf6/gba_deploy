import React, { Component } from "react";
import decode from 'jwt-decode';
import ItemService from "../services/ItemService";


export default class Welcome extends Component {

  
  render() {
    const decoded = decode(sessionStorage.getItem("access_token"))
    console.log(decoded);

    ItemService.findItemByName("asdasdasd").then((res) => {
      console.log(res.data.name)
    })

    return (
      <div className="container-fluid mlr-5 bg-light mt-5">
        <h1>Welcome to Grocery Bill Application</h1>
        <p className="mt-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Error fugiat
          voluptate reiciendis. Repudiandae, quaerat cum maiores totam id quod
          fuga tenetur doloremque facilis commodi culpa deserunt expedita.
          Dolorem quam eos quibusdam obcaecati earum est similique illo ratione
          placeat asperiores, natus autem nostrum, qui quod iure deserunt. Enim
          atque modi dolorem.
        </p>

      </div>
    );
  }
}
