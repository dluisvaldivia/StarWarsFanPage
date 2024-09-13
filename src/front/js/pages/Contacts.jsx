import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Contacts = () => {
  const { store } = useContext(Context);

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
      <div className="row">
        <div className="col">
          <ul>
          {store.contacts.map((item) => (
              <li key={item.id}>
                {item.name} - {item.email} - {item.phone} - {item.address}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
