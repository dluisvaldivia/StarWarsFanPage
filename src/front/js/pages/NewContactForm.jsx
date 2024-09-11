import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";

export const NewContactForm = () => {

//STATE
const { actions } = useContext(Context);

const[ formData, setFormData ] = useState({
  fullName: '',
  email: '',
  phone: '',
  address: '',
})

//form HANDLER
  const handleChange = (event) => {
    const {name, value} = event.target  //destructure the name value from the targeted event. 
    setFormData({
      ...formData,                          //keep the current state of form
      [name]: value                     //[is an object literal]
    })
    }
//SUBMIT HANDLER
    const handleSubmit = (data) => {
      actions.postContact(data)
    }


  return (
    <div className="container align-items-center">

      <form>
        <h1> Add contact</h1>

        <div className="row mb-2">
          <label htmlFor="fullName" className="form-label">
            full Name
          </label>
          <input type="text" id="fullName" className="form-control" name="fullName" onChange={handleChange}  />
        </div>

        <div className="row mb-2">
          <label htmlFor="emailAddress" className="form-label">
            Email Address
          </label>
          <input type="email" id="emailAddress" className="form-control" name="email" onChange={handleChange}/>
        </div>

        <div className="row mb-2">
          <label htmlFor="phone" className="form-label">
            phone
          </label>
          <input type="number" id="phone" className="form-control" name="phone" onChange={handleChange}/>
        </div>

        <div className="row mb-2">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input type="text" id="address" className="form-control"name="address" onChange={handleChange} />
        </div>
        {/* BUTTONS */}
        <div className="row mb-2">
          <div className="col">
            <button className="btn btn-success me-2" type="button" onClick={handleSubmit}>
              Save
            </button>
            <span>
              <button className="btn btn-danger" type="button">
                Cancel
              </button>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};
