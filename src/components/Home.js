import React, { useState, useEffect } from "react";

import axios from "axios";
import MicroskoolIcon from "../Images/micro.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faFileEdit, faTimes, faUpload } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from 'react-bootstrap';

function Home({ setIds }) {
  const [show, setShow]=useState(false)
  useEffect(() => {
    viewPost();
  }, []);
let navigate=useNavigate()
  const [ispost, setpost] = useState([]);
  const viewPost = async () => {
    try {
      await axios.get(`http://localhost:5000/allPost`).then((res) => {
        if (res.data.success === true) {
          setpost(res.data.data);
        }
      });
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <div className="row" style={{ position: "fixed", width: "100vw" }}>
        <Modal
          show={show}
          onEscapeKeyDown={() => {
            setShow(false);
          }}
        >
          <ModalHeader>
            <ModalTitle>Upload File</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <div>
              <input type="file" accept=".misb" />
              <label>
                Only <i>.misb</i>
              </label>
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              className="btn text-danger"
              onClick={() => {
                setShow(false);
              }}
            >
              <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
            </button>
          </ModalFooter>
        </Modal>
        <div className="row">
          <div className="col-sm-12">
            <span>
              <button
                style={{ float: "right", margin: "7px" }}
                className="btn btn-dark"
                onClick={() => {
                  setShow(true);
                }}
              >
                <FontAwesomeIcon icon={faUpload}></FontAwesomeIcon> Open from
                Device
              </button>

              <button
                style={{ float: "right", margin: "7px" }}
                className="btn btn-dark"
                onClick={() => {
                  navigate("/new-microskool-document");
                }}
              >
                <FontAwesomeIcon icon={faAdd}></FontAwesomeIcon> Create New
              </button>
            </span>

            <div className="menu-icon" style={{ marginTop: "19px" }}>
              <img alt="logo" src={MicroskoolIcon} />
            </div>
            <span style={{ fontSize: "large" }} className={"item-text title"}>
              Microskool Safe File Manager
            </span>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3"></div>
          <div className="col-sm-6">
            <div
              className="row"
              style={{
                width: "100%",
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "12px",
              }}
            >
              <h3>Select Document to Open</h3>

              <ul className="list-group">
                {ispost?.map((item, index) => (
                  <li className="list-group-item" key={index}>
                    <button
                      className="btn microskool-button"
                      style={{ float: "right" }}
                      onClick={() => {
                        setIds(item.id);
                        navigate(`/Edit/${item.id}`);
                      }}
                    >
                      Open
                    </button>{" "}
                    <FontAwesomeIcon
                      className="text-microskool"
                      icon={faFileEdit}
                    ></FontAwesomeIcon>{" "}
                    {item.fileName}
                    <div style={{ fontSize: "small", color: "gray" }}>
                      {item.title.substring(0, 52)}...
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-sm-3"></div>
        </div>
      </div>
    </>
  );
}
export default Home;
