import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Private = () => {
const navigate = useNavigate();


useEffect(() => {
    const token = localStorage.getItem("token");
    if(!token) {
        navigate("/login")
    }
}, [])

    return(
        <div ClassName="container"> 
        <div className="row">
            
            <h1>welcome to the restricted part of the site</h1>
            </div>
        </div>

    )
}