import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Contacts = () => {
  const { store } = useContext(Context);
  const { actions } = useContext(Context);
  const navigate = useNavigate();

  const handleEdit = (item) => {
  store.currentContact = item;
  navigate("/edit-contact");
}
  const handleDelete = (item) => {actions.deleteContact(item)}
  return (
    <div className="container">
      <div>
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
            <div className="row bg-light m-3 p-3" key={item.id}>
              <li  className="mb-2">
                <strong>Name:</strong> {item.name} <br />
                <strong>Email:</strong> {item.email}<br />
                <strong>Phone:</strong> {item.phone}<br />
                <strong>Address:</strong> {item.address}
              </li>
              <span className="navbar">
              <button type="button" className="btn bg-info" onClick={() => handleEdit(item)}>Edit</button>
              <button type="button" className="btn bg-danger" onClick={()=> handleDelete(item)}>Delete</button>
              </span>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
