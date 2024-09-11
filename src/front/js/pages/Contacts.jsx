import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Contacts = () => {
    const { store } = useContext(Context)
    
  return (
    <div className="container">
        <div>
            <h1>Hi there, {store.username}</h1>
        </div>
      <div className="navbar">
        <h4>Contacts</h4>
        <Link to="/contact-form">
          <button className="btn btn-danger">Add contact</button>
        </Link>
      </div>
      <div className="row">{/* NEW CONTACT INFO TO BE ADDED */}</div>
    </div>
  );
};
