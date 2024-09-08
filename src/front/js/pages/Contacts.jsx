import React from "react";
import { Link } from 'react-router-dom';

export const Contacts = () => {

    return (
        <div className="container">
            <div className="navbar">
        <h1>Contacts</h1>
        <Link to="/contact-form">
        <button className="btn btn-danger">Add contact</button>
        </Link>
            </div>
        <div className="row">
           {/* NEW CONTACT INFO TO BE ADDED */}
        </div>
        
        </div>
    )

}