import ItemService from "../services/ItemService";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import React from 'react';


export default function AddItemComponent() {
  
  const history = useHistory();
  const initialValues = {
    name: "",
    price: "",
    discount: "",
    discountPercentage: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // const handleDiscount = (event) => {
  //   const { name, value } = event.target;
  //   setFormValues({ ...formValues, [name]: value });

  //   let values = formValues.discount ? false : true;
  //   console.log(values)
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    
    console.log(formErrors);

    if(formValues.discount === "false"){
      const dp = document.getElementById("dp")
      dp.value = "0"
      formValues.discountPercentage = "0";
    }

    if (Object.keys(formErrors).length === 0 && isSubmit) {
      let item = {
        name: formValues.name,
        price: formValues.price,
        discount: formValues.discount,
        discountPercentage: formValues.discountPercentage,
      };
      // console.log("item => " + JSON.stringify(item));
      ItemService.createItem(item).then((res) => {
        history.push("/items");
        console.log(res.data);
      });
    }
  });

  const validate = (values) => {
    const errors = {};
    // const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (values.name) {
        if(values.name.length <= 2){
          errors.name = "Item name must be atleast 3 characters!";
        }
        // else{
        //   ItemService.findItemByName(formValues.name).then((res) =>{
        //     if(res.data.name !== undefined){

        // }
        //   })
        }
    // }
    else{
      errors.name = "Item name is required!";
    }
    
    if (!values.price) {
      errors.price = "Price is required!";
    }

    if (!values.discount === undefined) {
      errors.discount = "Discount is required!";
    }

    
      if (!values.discountPercentage) {
        errors.discountPercentage = "Discount Percentage is required!";
      }
    return errors;
    
  };

  const cancel = () => {
    history.push("/items");
  };

  
  
  return (
    <div className="bg-info">
      <div className="row">
        <div className="col-lg-10 col-xl-9 mx-auto">
          <div className="card flex-row my-5 border-0 shadow rounded-3 overflow-hidden">
            <div className="card-img-left d-none d-md-flex"></div>
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-5 fw-bold fs-5">
                Add Item
              </h5>
              <form>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Item Name"
                    value={formValues.name}
                    onChange={handleChange}
                  />
                  <label>Item Name</label>
                  <p className="fw-bolder" style={{ color: "red" }}>
                              {formErrors.name}
                            </p>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="text"
                    name="price"
                    className="form-control"
                    placeholder="Price"
                    value={formValues.price}
                    onChange={handleChange}
                  />
                  <label>Price</label>
                  <p className="fw-bolder" style={{ color: "red" }}>
                              {formErrors.price}
                            </p>
                </div>

                <div className="form-floating mb-3">
                  <select className="form-control" name="discount" value={formValues.discount} onChange={(handleChange)}>
                    
                    <option value={true}>Discounted</option>
                    <option value={false}>No Discount</option>
                  </select>
            
                   <p className="fw-bolder" style={{ color: "red" }}>
                              {formErrors.discount}
                            </p>
                </div>

                <div className="form-floating mb-3">
                  <input
                    id="dp"
                    type="text"
                    name="discountPercentage"
                    className="form-control"
                    placeholder="Discount Percentage"
                    value={formValues.discountPercentage}
                    onChange={handleChange}
                    disabled={formValues.discount === "false" ? "true" : ""}
                    
                  />
                  <label>Discount Percentage</label>
                  <p className="fw-bolder" style={{ color: "red" }}>
                              {formErrors.discountPercentage}
                            </p>
                </div>

                <div className="d-grid mb-2">
                  <button
                    className="btn btn-lg btn-primary btn-login text-uppercase"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Add
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
