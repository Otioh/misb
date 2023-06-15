import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MicroskoolIcon from "../Images/micro.png";
import {
  faLock,

  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { notification } from 'antd';

import {  useNavigate } from "react-router-dom";
import axios from "axios";




function Login() {



  const [email, setEmail] = useState();
  const [password, setpassword] = useState("");
  let navigate = useNavigate();



  

  const login = () => {


    localStorage.setItem("email", email);

    axios
      .post(`${process.env.REACT_APP_BACKEND}auth`, { email, password })
      .then((response) => {
        if (response.data.success) {
         
              localStorage.setItem("email", email);
              localStorage.setItem(
                "first_name",
                response.data.data[0].first_name
              );
              localStorage.setItem("surname", response.data.data[0].surname);
              localStorage.setItem("phone", response.data.data[0].phone);
              localStorage.setItem("matric", response.data.data[0].matric);
              localStorage.setItem(
                "institution",
                response.data.data[0].institution
              );
              localStorage.setItem(
                "department",
                response.data.data[0].department
              );
              localStorage.setItem("level", response.data.data[0].level);
              localStorage.setItem("campus", response.data.data[0].campus);
              localStorage.setItem("coins", response.data.data[0].coins + "");
              localStorage.setItem("image", response.data.data[0].image);
              localStorage.setItem("password", response.data.data[0].password);
           
       setTimeout(() => {
        navigate('/')
         notification.success({message:response.data.message})
       }, 1000);
        } else {
          notification.error({ message: response.data.message })
       }
      })
      
  };

  useEffect(() => {
    return () => {
     
    };
  }, [email, password]);

  return (
    <>
      <div className="mother centered">
        <div className="card shadow margin">
          <div className="card-header">
            <img alt="Logo" className="microskool-icon" src={MicroskoolIcon} />
            <b style={{ float: "right" }} className="microskool-title">
              Login
            </b>
          </div>
          <div className="card-body">
            <input
              type="email"
              className="form-control"
              value={email}
              placeholder="E-Mail"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <span style={{ display: "flex" }}>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                placeholder="Password "
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
              />
              <button
                style={{ outline: 0, border: "none" }}
                className="btn"
                id="btn"
                onClick={() => {
                  document.getElementById("password").type = "text";
                  document.getElementById("btn").disabled = true;
                }}
              >
                <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
              </button>
            </span>
          </div>
          <div className="card-footer">
            <button
              className="btn microskool-button"
              onClick={login}
            >
              <FontAwesomeIcon icon={faLock}></FontAwesomeIcon> Login
            </button>
            <br />
            
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
