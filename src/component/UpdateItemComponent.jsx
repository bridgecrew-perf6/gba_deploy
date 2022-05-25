// import React, { Component } from "react";
import ItemService from "../services/ItemService";
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useParams } from "react-router-dom";
import React from 'react';

export default function UpdateItemComponent() {

  const history = useHistory();
  const itemId = useParams();
  
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  
  const initialValues = {
    id: "",
    name: "",
    price: "",
    discount: "",
    discountPercentage: ""
  } 

  const [formValues, setFormValues] = useState(initialValues);

  const updateItem = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues))
    setIsSubmit(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validate = (values) => {
    const errors = {};
    // const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.name) {
      errors.name = "Item Name is required!";
    }

    if (!values.price) {
      errors.price = "Price is required!";
    }

    if (!values.discount) {
      errors.discount = "Discount is required!";
    }

    if (!values.discountPercentage) {
      errors.discountPercentage = "Discount Percentage is required!";
    }

    return errors;
  };

  const cancel = () => {
    history.push('/items');
  }

  useEffect(() =>{
    ItemService.getItemById(itemId.id).then(res => {
      setFormValues(res.data)
    })
  },[itemId]);

  useEffect(() => {
    console.log(formErrors);
    
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      let item = {
        id: formValues.id,
        name: formValues.name,
        price: formValues.price,
        discount: formValues.discount,
        discountPercentage: formValues.discountPercentage,
      };
      ItemService.updateItem(item, itemId.id).then((res) => {
        history.push("/items");
        console.log(res.data);
      });
    }
  });
  
    return (
      
      <div className="mt-5">
        
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 bg-light bg-gradient">
              <h3 className="text-center pt-4">Edit Item</h3>
              <div className="card-body">
                <form className="text-start">
                  <div className="form-group">
                    <label className="pt-1">Item Name: </label>
                    <input
                      placeholder="Name"
                      name="name"
                      className="form-control"
                      value={formValues.name}
                      onChange={handleChange}
                      required
                    />
                    <p className="fw-bolder" style={{ color: "red" }}>
                              {formErrors.name}
                            </p>
                    <label className="pt-3">Item Price: </label>
                    <input
                      placeholder="Price"
                      name="price"
                      className="form-control"
                      value={formValues.price}
                      onChange={handleChange}
                      required
                    />
                    <p className="fw-bolder" style={{ color: "red" }}>
                              {formErrors.price}
                            </p>
                    <label className="pt-3">Item Discount: </label>
                    <input
                      placeholder="Discount"
                      name="discount"
                      className="form-control"
                      value={formValues.discount}
                      onChange={handleChange}
                      required
                    />
                    <p className="fw-bolder" style={{ color: "red" }}>
                              {formErrors.discount}
                            </p>
                    <label className="pt-3">Item Discount Percent: </label>
                    <input
                      placeholder="Discount Percent"
                      name="discountPercentage"
                      className="form-control"
                      value={formValues.discountPercentage}
                      onChange={handleChange}
                      required
                    />
                    <p className="fw-bolder" style={{ color: "red" }}>
                              {formErrors.discountPercentage}
                            </p>
                  </div>

                  <div className="pt-3 text-center">
                    <button
                      className="btn btn-success"
                      onClick={updateItem}
                    >
                      Update
                    </button>
                    &nbsp;
                    <button
                      className="btn btn-danger"
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
