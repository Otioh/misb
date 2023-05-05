import React, { useState, useEffect } from "react";

import axios from "axios";
import MicroskoolIcon from "../Images/micro.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faCoins,  faDownload, faFileEdit,  faTimes, faUpload } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from 'react-bootstrap';

function Home({ setIds }) {
  const [show, setShow]=useState(false);
   const [vis, setvis] = useState(false);
   const [curId, setcurId] = useState("")
   const [selected, setselected]=useState(false);
   const [content, setcontent]=useState('<h3>Please Wait......</h3>')
const [file, setfile] = useState({})
const [email, setemail] = useState("");
const [password, setpassword] = useState("")









   const copy=()=>{
   if(email==="" || password===""){
    alert("E-Mail & Password is required")
   }else{
    
       axios
         .post(
           `${process.env.REACT_APP_BACKEND}transactions/validate`,
           {
             sender: email,
             amount:96,
             password: password,
           }
         )
         .then((res) => {
           if (res.data.success) {
             axios
               .post(
                 `${process.env.REACT_APP_BACKEND}transactions`,
                 {
                   transaction_id:
                     "T255" + Math.random() * 2344354,
                   item: "Material",
                   description_sender:
                     "Payment you made for a Microskool Document(MiSB)",
                   description_receiver:
                     "Charge for (MiSB) Document ",
                   sender: localStorage.getItem('email'),
                   receiver: "Microskool",
                   amount:96,
                   status: "Approved",
                 }
               )
               .then((res) => {
                 if (res.data.success) {
                   axios
                     .post(
                       `${process.env.REACT_APP_BACKEND}updatecoins`
                       ,
                       {
                         email:localStorage.getItem('email'),
                         coins:96,
                         type:'debt'
                         
                       }
                     )
                     .then((response) => {
                      
                        
                     });


                   axios
                     .post(
                       `${process.env.REACT_APP_BACKEND}transactions`,
                       {
                         transaction_id:
                           "T255" + Math.random() * 2344354,
                         item: "Material",
                         description_sender:
                           "Remittance for a Microskool Document(MiSB) ",
                         description_receiver:
                           "Earnings for a Microskool Document(MiSB) you created",
                         sender: "Microskool",
                         receiver: file.author,
                         amount: 66,
                         status: "Approved",
                       }
                     )
                     .then((res) => {

                       axios.post(`${process.env.REACT_APP_BACKEND}addArticle`,
                         {
                           title: file.title, content: file.content, id: "MISB" + Math.random(0, 9) * 232032897 + "IJIFNSDDNNK11NNKNK1NK1VCFCVJSDSDV737DGSDSDDBSDHSDJHSHDJDHJJ8838729838YEJNJSNJDJANAJSJASJKAJSJI3283033200000000000000000000007DS6DS767___DHBSHD4488D5333WEY7Y7Y84DTZGXZGXGVB7744443324FCHJCYGDFNSDNSN",
                           author: file.author, editor: localStorage.getItem('email'), editorname: localStorage.getItem('first_name') + " " + localStorage.getItem('surname'), fileName: file.fileName
                         }


                       ).then((res) => {

                         setselected(false)
                         setShow(false);
                         navigate('/receipt')
                       })


                     })

                   axios
                     .post(
                       `${process.env.REACT_APP_BACKEND}updatecoins`,
                       {
                         email: file.author,
                         coins: 66,
                         type: 'credit'

                       }
                     )
                     .then((response) => {


                      alert(response.data.message)
                   
                     });
                 alert(res.data.message)
                  
                 
                 } else {
                  
                  alert( "Transaction Failed")
                 }
               });
           } else {
            alert( res.data.message)
         
           }
         });
     
        }

   }







  let navigate = useNavigate()

  useEffect(() => {
    viewPost();
    if(localStorage.getItem("email")){

    }else{
      navigate('/login')
    }
  }, [navigate]);

  const [ispost, setpost] = useState([]);
  const viewPost = async () => {
    try {
      await axios
        .get(`${process.env.REACT_APP_BACKEND}allPost/${localStorage.getItem('email')}`)
        .then((res) => {
         
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
      <div className="row" style={{ position: "fixed", width: "100vw",  }}>
        <Modal
        fullscreen={true}
          show={show}
          onEscapeKeyDown={() => {
            setShow(false);
          }}
        >
          <ModalHeader style={{backgroundColor:'rgb(83,83,170)', color:'white'}}>
            
              <ModalTitle>Upload File</ModalTitle>
        
    
          </ModalHeader>
          <ModalBody>
            <div>
             {selected?<div style={{backgroundColor:'whitesmoke', width:'100%', height:'100%', padding:'20px'}}>
             
                <div style={{}}>
                  <span className="badge bg-info">Current File Owner: {file.editorname}</span>   
                  {
                    file.editor === localStorage.getItem("email") ? <i>You have access to this file, check your file list</i> : <span><input type="email" placeholder="Your E-Mail" className="simple-input" onChange={e => setemail(e.target.value)} /><input type="password" placeholder="Your Password" className="simple-input" onChange={e => setpassword(e.target.value)} /> <button className="btn btn-primary simple-button" onClick={copy}><FontAwesomeIcon icon={faCoins}></FontAwesomeIcon> 96 Grab a Copy</button> </span>
                  }
                  
                  </div>
                <span className="badge bg-primary">Document Preview A4 paper</span>
                <h3>{file.title}</h3>
                <div  style={{ backgroundColor: 'white', boxShadow: '0 0 12px lightgray', padding: '20px' }} className="post__description noCopy" dangerouslySetInnerHTML={{ __html: content }}/>
 

               </div>
              :<>
              <div>
                    <input type="file" accept=".misb" onChange={(e)=>{
                      const formData=new FormData()
                      formData.append('file', e.target.files[0])
  
                      axios.post(`${process.env.REACT_APP_BACKEND}file/${(Math.random() + 1).toString(36).substring(7) + ".misb"}`, formData).then((res) => {
setcontent(res.data.content)
                        setfile(res.data)
                      })
                      setselected(true)
                    }} />
                    <label>
                      Only <i>.misb</i>
                    </label>
              </div>
              </>}
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              className="btn text-danger"
              onClick={() => {
                setselected(false)
                setShow(false);
              }}
            >
              <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon> Close
            </button>
          </ModalFooter>
        </Modal>

        <Modal
          show={vis}
          onEscapeKeyDown={() => {
            setvis(false);
          }}
        >
          <ModalHeader>
            <ModalTitle>Delete File?</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <div>Are you sure you want to Delete this file?</div>
          </ModalBody>
          <ModalFooter>
            <button
              className="btn text-primary"
              onClick={() => {
                axios
                  .get(`${process.env.REACT_APP_BACKEND}deletePost/${curId}`)
                  .then((res) => {
                    alert(res.data.message);
                    setvis(false);
                  });
              }}
            >
              Yes
            </button>
            <button
              className="btn text-danger"
              onClick={() => {
                setvis(false);
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
                <FontAwesomeIcon icon={faUpload}></FontAwesomeIcon> From
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

            <div className="menu-icon" style={{ marginTop: "49px" }}>
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
                  <li className="list-group-item" key={index} style={{margin:'5px', boxShadow:'0 0 14px lightgray'}}>
                    <span>
                      <button
                        className="btn microskool-button"
                        style={{ float: "right" }}
                        onClick={() => {
                          setvis(true);
                          setcurId(item.id);
                        }}
                      >
                        Delete
                      </button>{" "}
                      <a href={`${process.env.REACT_APP_BACKEND}download/${item.id}`} className="btn microskool-button"
                        style={{ float: "right" }}>
                        <FontAwesomeIcon icon={faDownload}></FontAwesomeIcon> Download
                      </a>

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
                    </span>
                    <FontAwesomeIcon
                      className="text-microskool"
                      icon={faFileEdit}
                    ></FontAwesomeIcon>{" "}
                    <i style={{fontSize:'small'}}> {item.fileName}</i>
                    <div>{item.title.substring(0, 32)}...</div>
                    <div style={{ fontSize: "x-small", color: "gray" }}>
                      {new Date(item.dateLastEdited).toLocaleDateString()}||
                      {new Date(item.dateLastEdited).toLocaleTimeString()}
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
