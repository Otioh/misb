import React, { useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {  useNavigate } from "react-router-dom";
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, Spinner } from 'react-bootstrap'


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {


  faDownload,


  faFilePdf,
  faFolderOpen,
  faPrint,

  faRobot,
  faSave,

} from "@fortawesome/free-solid-svg-icons";



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
  const [id] = useState("MISB" + Date.now() + "IJIFNSDDNNK11NNKNK1NK1VCFCVJSDSDV737DGSDSDDBSDHSDJHSHDJDHJJ8838729838YEJNJSNJDJANAJSJASJKAJSJI3283033200000000000000000000007DS6DS767___DHBSHD4488D5333WEY7Y7Y84DTZGXZGXGVB7744443324FCHJCYGDFNSDNSN")
  const [fileName, setfileName] = useState("DropFile" + Date.now())
  const [content, setcontent] = useState(editorState);
  const [filepicked, setfilepicked] = useState(false)
  const [prompting, setprompting] = useState(false)
  const [error, seterror] = useState(null)
  const [description, setdescription] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')

  const [loading, setloading] = useState(false)
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

          content: userInfo.content.value,
          id,
          author: localStorage.getItem("email"),
          editor: localStorage.getItem("email"),
          editorname: localStorage.getItem("first_name") + " "+localStorage.getItem("surname"),
          fileName: fileName + ".misb",
        })
        .then((res) => {
          sessionStorage.setItem('lastdoc', fileName)
          alert(res.data)
        });
    } catch (error) {
      throw error;
    }
  };


  const generateAI = (e) => {
    e.preventDefault()
    setloading(true)
    axios.post(`${process.env.REACT_APP_BACKEND}generate-article`, { prompt: description, email, password }).then((res) => {
      setloading(false)
      // setuserInfo({ ...userInfo, content:{} res.data })
      setprompting(false)
    }).catch((err) => {
      setloading(false)
      seterror(err)
      console.log(err)
    })
  }






  return (
    <div className="row layer">
      <div className="col-12" style={{ overflow: 'auto', backgroundColor: 'rgb(83,83,170)' }}>
        <div className="p-2 my-bg flex-row-between "  >
          <div className="top-menus">
            <span className="text-light" style={{ fontWeight: 'bold', fontStyle: 'italic' }}>Drop Book</span>
            <button onClick={() => setprompting(true)}> <FontAwesomeIcon icon={faRobot}></FontAwesomeIcon> </button>
            <input id="file" accept=".misb" type="file" hidden onChange={() => setfilepicked(true)} /><label htmlFor="file">
              <FontAwesomeIcon icon={faFolderOpen}></FontAwesomeIcon> </label>
            <button onClick={addDetails}> <FontAwesomeIcon icon={faSave}></FontAwesomeIcon> </button>
            <button > <FontAwesomeIcon icon={faDownload}></FontAwesomeIcon> </button>
            <button> <FontAwesomeIcon icon={faPrint}></FontAwesomeIcon> </button>
            <button> <FontAwesomeIcon icon={faFilePdf}></FontAwesomeIcon> </button>

          </div>
          <div className="filename">
            <label>Filename</label>
            <input placeholder="File Name" value={fileName} onChange={(e) => {
              setfileName(e.target.value)
            }} />
          </div>
        </div>
      </div>















      <div className="row resp">
          <form onSubmit={addDetails} className="update__forms">
            <div className="form-row">


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
                    height: '600px',

                    width: "8.5in",
                    border: "solid 1px lightgray",
                    marginLeft: "auto",
                    marginRight: "auto",

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

              <div className="form-group col-sm-12 text-right"></div>

        </form>
      </div>

      <Modal show={filepicked} onEscapeKeyDown={() => setfilepicked(false)} >
        <ModalHeader>
          Document Preview
        </ModalHeader>
        <ModalBody>
          <div />
        </ModalBody>
      </Modal>



      <Modal show={prompting} onEscapeKeyDown={() => setprompting(false)} onHide={() => setprompting(false)}>
        <form onSubmit={generateAI}>
          <ModalHeader>
            <ModalTitle>

              Promt AI to create article
            </ModalTitle>
          </ModalHeader>
          <ModalBody>


            {error && <div className="alert alert-danger">{error?.response?.data?.message}</div>}
            <div >

              <div className="form-group p-2">
                <textarea className="form-control" placeholder="Describe your article" value={description} onChange={(e) => {
                  setdescription(e.target.value)
                }} />
              </div>
              <br />
              <hr />
              <span>Dropoud User to Charge</span>
              <div className="form-group p-2">
                <input className="form-control" value={email} placeholder="E-Mail" type="email" onChange={(e) => setemail(e.target.value)} />
            </div>
              <div className="form-group p-2">
                <input className="form-control" value={password} placeholder="Password" type="password" onChange={(e) => setpassword(e.target.value)} />
              </div>
            </div>

          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary" >
              {
                loading ?
                  <Spinner /> :
                  'Create'
              }
            </button>
          </ModalFooter>
        </form>
      </Modal>


    </div>
  );
}
export default Add;
