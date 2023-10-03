import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { usePcContext } from "./Context";

const User = (props) => {
  const navigate = useNavigate()
  const {getUser} = usePcContext()
  const { email } = props.user

  const logout = async () => {
    const res = await axios.get("http://localhost:3001/api/users/logout")
    getUser([])
    return navigate(res.data.redirect)
  }

  return(
    <div className="d-flex justify-content-center align-items-center mt-5">
      <div className="text-center">
        <h4 className="mb-3">Usuario</h4>
        <div className="card">
          <div className="card-body">
            <p className="card-title">{email}</p>
            <button
          className="btn btn-danger form-control"
          onClick={logout}
          >
            Logout
          </button>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default User