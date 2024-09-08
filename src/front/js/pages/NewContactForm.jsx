import React from "react";

export const NewContactForm = () => {
  return (
    <div className="container align-items-center">

      <form>
        <h1> Add contact</h1>
        <div className="row mb-2">
          <label for="fullName" className="form-label">
            full Name
          </label>
          <input type="text" id="fullName" className="form-control" />
        </div>

        <div className="row mb-2">
          <label for="emailAddress" className="form-label">
            Email Address
          </label>
          <input type="email" id="emailAddress" className="form-control" />
        </div>

        <div className="row mb-2">
          <label for="phone" className="form-label">
            phone
          </label>
          <input type="number" id="phone" className="form-control" />
        </div>

        <div className="row mb-2">
          <label for="address" className="form-label">
            Address
          </label>
          <input type="text" id="address" className="form-control" />
        </div>

        <div className="row mb-2">
          <div className="col">
            <button className="btn btn-success me-2" type="button">
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
