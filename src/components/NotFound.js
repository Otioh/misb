import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MicroskoolIcon from "../Images/micro.png";
import {
    faLock,
    faKey,
    faUserLock,
    faEye,
    faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";


import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { useSelector } from "react-redux";


function NotFound() {



    const [email, setEmail] = useState();
    const [password, setpassword] = useState("");
    let navigate = useNavigate();




    return (
        <>
            <div className="mother centered">
                <div className="card shadow margin">
                    <div className="card-header">
                        <img alt="Logo" className="microskool-icon" src={MicroskoolIcon} />
                        <b style={{ float: "right" }} className="microskool-title">
                            MiSB
                        </b>
                    </div>
                    <div className="card-body">
                       
                       <h3>
                        Requested Resource not Found
                       </h3>
                    </div>
                    <div className="card-footer">
                        <button
                            className="btn microskool-button"
                            onClick={()=>{
                                navigate('/')
                            }}
                        >
                            <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon> Go Back
                        </button>
                        <br />

                    </div>
                </div>
            </div>
        </>
    );
}

export default NotFound;
