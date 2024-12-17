import React, { useState, useContext } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import getState from "../store/flux.js";


export const SignUp = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const navigate = useNavigate();

  
const handleSubmit = async (event) => {
  event.preventDefault();

 if (password !== repeatPassword){
  alert('Passwords do not match');
  return false }

 const dataToSend = { "email": email,"password": password }
 
 console.log("this is being sent:", dataToSend);

  try {
    const response = await fetch('https://fantastic-carnival-4jqq7xrq659fxvq-3001.app.github.dev/api/signup',
      { method: "POST",
        headers: {
        "Content-Type": "application/json"},
      body: JSON.stringify(dataToSend)
      });
      
      if (!response.ok){
        const errorData = await response.json()
        console.error('Error creating account:', errorData);
        alert(errorData.error)
        return}

      const result = await response.json()
      console.log('User created!', result)
      navigate('/login');
}
catch(error) {
  console.error('Error creating user');
  alert(error.message); 
}}


return(
  <div className="container h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-lg-12 col-xl-11">
        <div className="card text-black">
          <div className="card-body p-md-5">
            <div className="row justify-content-center">  
              <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div data-mdb-input-init className="form-outline flex-fill mb-0">
                      <input type="email" id="form3Example3c" className="form-control" placeholder="email" onChange={(e)=> setEmail(e.target.value)} />
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div data-mdb-input-init className="form-outline flex-fill mb-0">
                      <input type="password" id="form3Example4c" className="form-control" placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                    <div data-mdb-input-init className="form-outline flex-fill mb-0">
                      <input type="password" id="form3Example4cd" className="form-control" placeholder="repeat password" onChange={(e) => setRepeatPassword(e.target.value)}/>
                    </div>
                  </div>

                  <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button  type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg">Register</button>
                  </div>

                </ form>
              </div>
              <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                <img src="https://preview.redd.it/fnmzll94m5201.jpg?width=1080&crop=smart&auto=webp&s=d6192bc400737dd3ad2d4e818024ba644e45eb36" className="img-fluid" alt="join the resistance" />

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)
}