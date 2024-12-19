import React, { useState, useContext } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export const Login = () => {
  const { store, actions } = useContext(Context)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const navigate = useNavigate();
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const dataToSend = { email, password }

    try {
      await actions.login(dataToSend);
    
    if (!store.isLogged){
      alert("login failed!")
      navigate("/login");
    }
    else{
      navigate("/characters")
    }} 
    catch (error){
      console.error("Error:", error);
      alert("an error occurred! please try again")
    }}


return(
  <div className="container bg-white p-3">
    <div className="row d-flex justify-content-center">
    <form onSubmit={handleSubmit} >
      <h1 className="pb-3">Login</h1>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} />
        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
      </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type={hidePassword ? "password" : "text" } className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <span onClick={() => setHidePassword(!hidePassword)} className="input-group-text">
                {hidePassword ? <i className="far fa-eye"></i> : <i className="far fa-eye-slash"></i>}
              </span>
        </div>
          <button type="submit" className="btn btn-info">Login</button>
    </form>
      <div>
        <h6 className="pt-3">Not a member? <Link to="/signup">Register</Link> </h6>
      </div>
    </div>
  </div>
)
}