import React from "react";

export const ContactList = () => {
  return (
    <div>
      <h1> Add contact</h1>
      <form>
        <div>
          <label for="fullName" className="form-label">
            full Name
          </label>
          <input type="text" id="fullName" className="form-control" />
          
          
        </div>

        <div>
          <label for="emailAddress" className="form-label">
            Email Address
          </label>
          <input type="email" id="emailAddress" className="form-control" /> 
          
        </div>

        <div>
          <label for="phone" className="form-label">
            phone
          </label>
          <input type="number" id="phone" className="form-control" />
        
        </div>

        <div>
          <label for="address" className="form-label">
            Address
          </label>
          <input type="text" id="address" className="form-control" />
           
        </div>
      </form>
    </div>
  );
};
