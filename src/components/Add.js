import React, { useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {  useNavigate } from "react-router-dom";
import axios from "axios";


import MicroskoolIcon from "../Images/micro.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {

  faDownload,
  faFile,

  faPrint,
  faSave,
  faShareAlt,
} from "@fortawesome/free-solid-svg-icons";

import "draft-js/dist/Draft.css";


function Add() {
  let navigate = useNavigate();
  const [userInfo, setuserInfo] = useState({
    title: "",
  });
  const onChangeValue = (e) => {
    setuserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const uploadFile=(image)=>{
let url = URL.createObjectURL(image)



return {url};
  }

  let editorState = EditorState.createEmpty();
const [id]=useState( "MISB" + Math.random(0, 9) * 232032897+"IJIFNSDDNNK11NNKNK1NK1VCFCVJSDSDV737DGSDSDDBSDHSDJHSHDJDHJJ8838729838YEJNJSNJDJANAJSJASJKAJSJI3283033200000000000000000000007DS6DS767___DHBSHD4488D5333WEY7Y7Y84DTZGXZGXGVB7744443324FCHJCYGDFNSDNSN")
  const [fileName, setfileName] = useState("MicroskoolDocument")
  const [content, setcontent] = useState(editorState);
  const onEditorStateChange = (editorState) => {
    setcontent(editorState);
  };

  const [isError, setError] = useState(null);
  const addDetails = async (event) => {
    try {
      event.preventDefault();
      event.persist();
      if (userInfo.content.value.length < 100) {
        setError("Required, Add content minimum length 100 characters");
        return;
      }
      axios
        .post(`${process.env.REACT_APP_BACKEND}addArticle`, {
          title: userInfo.title,
          content: userInfo.content.value,
          id,
          author: localStorage.getItem("email"),
          editor: localStorage.getItem("email"),
          editorname: localStorage.getItem("first_name") + " "+localStorage.getItem("surname"),
          fileName: fileName + ".misb",
        })
        .then((res) => {
          if (res.data.success === true) {
            navigate("/");
          }
        });
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="full-screen">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <span
              style={{ float: "right" }}
              className=" "
              onClick={() => {}}
            ></span>
            <div className="menu-icon" style={{ marginTop: "19px" }}>
              <img alt="logo" src={MicroskoolIcon} />
            </div>
            <span style={{ fontSize: "large" }} className={"item-text title"}>
              Microskool Safe Book
            </span>
          </div>
        </div>
        <div className="row">
          <div
            className="col-sm-12"
            style={{ margin: "5px", backgroundColor: "rgb(83,83,170)" }}
          >
            <span style={{width:'250px', display:'flex', margin:'5px', backgroundColor:'whitesmoke', padding:'5px', alignItems:'center'}}>
              <FontAwesomeIcon icon={faFile}></FontAwesomeIcon>{" "}
             <input placeholder="File Name" value={fileName} style={{width:'180px', border:'none', background:'none', outline:0, paddingLeft:'7px'}} onChange={(e)=>{
              setfileName(e.target.value)
             }} />
              <i className="text-secondary">.misb</i>
            </span>

         

            <button className="btn  margin text-light" onClick={addDetails}>
              <FontAwesomeIcon icon={faSave}></FontAwesomeIcon> Save
            </button>

            <button className="btn  margin text-light  ">
              <FontAwesomeIcon icon={faPrint}></FontAwesomeIcon> Print
            </button>

            <button className="btn  margin text-light  ">
              <FontAwesomeIcon icon={faShareAlt}></FontAwesomeIcon> Share
            </button>
            <a href={`${process.env.REACT_APP_BACKEND}download/${id}`}  className="btn  margin text-light  ">
              <FontAwesomeIcon icon={faDownload}></FontAwesomeIcon> Download
            </a>
          </div>
        </div>
        <div className="row">
          <form onSubmit={addDetails} className="update__forms">
            <div className="form-row">
              <div className="form-group col-md-12">
                <input
                  type="text"
                  name="title"
                  value={userInfo.title}
                  onChange={onChangeValue}
                  className="form-control"
                  placeholder="Title *"
                  required
                />
              </div>
              <div className="form-group col-md-12 editor" style={{overflow:'auto'}}>
                <br />
                <Editor
                  editorState={content}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onEditorStateChange={onEditorStateChange}
                  placeholder="Type here"
                  editorStyle={{
                    backgroundColor: "white",
                    padding: "20px",
                    borderRadius: "5px",
                    width: "8.5in",
                    border: "solid 1px lightgray",
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginBottom: "50px",
                  }}
                  toolbar={{
                    history: { inDropdown: true },
                    image: {
                      uploadCallback: uploadFile,
                      alt: { present: true, mandatory: false },
                      previewImage: true,
                      inputAccept:
                        "image/gif,image/jpeg,image/jpg,image/png,image/svg",
                    },
                  }}
                />
                <textarea
                  style={{ display: "none" }}
                  disabled
                  ref={(val) => (userInfo.content = val)}
                  value={draftToHtml(convertToRaw(content.getCurrentContent()))}
                />
              </div>
              {isError !== null && <div className="errors"> {isError} </div>}
              <div className="form-group col-sm-12 text-right"></div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Add;
