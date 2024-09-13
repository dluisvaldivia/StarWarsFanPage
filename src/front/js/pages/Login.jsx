import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { actions } = useContext(Context);
  const [createUser, setCreateUser] = useState("");
  const [getUser, setGetUser] = useState("");
  const navigate = useNavigate();

  const handleCreateValue = async (event) => { setCreateUser(event.target.value); };
  const handleLoginValue = async (event) => { setGetUser(event.target.value); };

  const handleCreate = async () => {actions.postAgenda(createUser);
    navigate("/contacts");
  };

  const handleLogin = async () => {actions.getAgenda(getUser);
    navigate("/contacts");
  };

  return (
    <div className="container">
      <div>
        <form>
          <h1>Log-in page</h1>
          {/* NEW USER */}
          <div className="row">
            <label className="mb-1" htmlFor="newUserName"> New user </label>
            <input className="mb-1"
              id="newUserName"
              value={createUser}
              placeholder="Enter a new user name"
              onChange={handleCreateValue}>
            </input>

            <div className="col">
              <button
                className="btn btn-info"
                type="button"
                disabled={!createUser.trim()}
                onClick={handleCreate}>
                Create 
              </button>
            </div>
          </div>

          {/* LOGIN EXISTING USER */}
          <div className="row">
            <label className="mb-1" htmlFor="getUserName">
              login with your existing user name
            </label>  
            <input
              className="mb-1"
              id="getUserName"
              value={getUser}
              placeholder="enter an existing user name"
              onChange={handleLoginValue}>   
            </input>

            <div className="col">
              <button
                className="btn btn-info"
                type="button"
                disabled={!getUser.trim()}
                onClick={handleLogin}>
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
