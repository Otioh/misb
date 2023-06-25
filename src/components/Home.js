import React, { useState, useEffect } from "react";
import {notification} from 'antd';
import axios from "axios";
import MicroskoolIcon from "../Images/micro.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd,  faCoins,  faDeleteLeft,  faDownload, faFileEdit,  faPowerOff,  faRecycle,  faRobot,  faTimes, faUpload } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import {DataGrid} from '@mui/x-data-grid';
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from 'react-bootstrap';
import "./css/style.css";
import "./css/responsive.css";



function Home({ setIds }) {
  const [show, setShow]=useState(false);
   const [vis, setvis] = useState(false);
   const [curId, setcurId] = useState("")
   const [selected, setselected]=useState(false);
   const [content, setcontent]=useState('<h3>Please Wait......</h3>')
const [file, setfile] = useState({})
const [email, setemail] = useState("");
const [password, setpassword] = useState("")
const [toggled, settoggled] = useState(false)



  const columns = [
    {
      field: 'file', headerName: 'File', renderCell: (item) => (
        <>
        <FontAwesomeIcon
          className="text-microskool"
          icon={faFileEdit}
          ></FontAwesomeIcon> 
        </>
      ),
    },

    {
      field: 'fileName',
      headerName: 'File Name',
width:230

    },   

    {
      field: 'title',
      headerName: 'Title',
    

    },
    {
      field: 'dateLastEdited',
      headerName: 'Date Created',
   
    },


 
    {
      field: 'open', headerName: 'Open',  renderCell: (item) => (
        <>
      <button
        className="btn btn-outline-primary"
        
        onClick={() => {
          setIds(item.id);
          navigate(`/Edit/${item.id}`);
        }}
      >
        Open
      </button>

        </>
      ),
},
    {
      field: 'delete', headerName: 'Delete', width: 90, renderCell: (item) => (
        <>
         
          <button
            className="btn btn-outline-danger"

            onClick={() => {
              setvis(true);
              setcurId(item.id);
            }}
          >
             <FontAwesomeIcon icon={faDeleteLeft} />
          </button>
        </>
      ),
    }

    
  ];




   const copy=()=>{
   if(email==="" || password===""){
    notification.error({message:"E-Mail & Password is required"})
   }else{
    
       axios
         .post(
           `${process.env.REACT_APP_BACKEND}transactions/validate`,
           {
             sender: email,
             amount:150,
             password: password,
           }
         )
         .then((res) => {
       
           if (res.data.success) {
           
             axios
               .post(
                 `${process.env.REACT_APP_BACKEND}paybook`, { sender: email, receiver: file.author, amount:150 }).then((resp)=>{
                  notification.info({message:resp.data.message}) 
                  if(resp.data.success){



                     axios.post(`${process.env.REACT_APP_BACKEND}addArticle`,
                       {
                         title: file.title, content: file.content, id: "MISB" + Math.random(0, 9) * 232032897 + "IJIFNSDDNNK11NNKNK1NK1VCFCVJSDSDV737DGSDSDDBSDHSDJHSHDJDHJJ8838729838YEJNJSNJDJANAJSJASJKAJSJI3283033200000000000000000000007DS6DS767___DHBSHD4488D5333WEY7Y7Y84DTZGXZGXGVB7744443324FCHJCYGDFNSDNSN",
                         author: file.author, editor: localStorage.getItem('email'), editorname: localStorage.getItem('first_name') + " " + localStorage.getItem('surname'), fileName: file.fileName
                       }


                     ).then((response) => {

                       setselected(false)
                       setShow(false);
                       viewPost();


                                    notification.info({message:response.data.message})
                      setShow(false)
                      setselected(false)
                      if(response.data.success){
                        notification.success({ message: response.data.message })

                      }else{
                        notification.error({ message: response.data.message })

                      }

                     })
                   }

                 })
           
           } else {
            notification.error({message: res.data.message})
         
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
                    file.editor === localStorage.getItem("email") ? <i>You have access to this file, check your file list</i> : <span><input type="email" placeholder="Your E-Mail" className="simple-input" onChange={e => setemail(e.target.value)} /><input type="password" placeholder="Your Password" className="simple-input" onChange={e => setpassword(e.target.value)} /> <button className="btn btn-primary simple-button" onClick={copy}><FontAwesomeIcon icon={faCoins}></FontAwesomeIcon> 150 Grab a Copy</button> </span>
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

                        setcontent(res.data.data.content)
                        setfile(res.data.data)
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
                    viewPost()
                    notification.info({message:res.data.message});
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

        <div className="hero_area">
          {/* <!-- header section strats --> */}
          <header className="header_section">
            <div className="container-fluid">
              <nav className="navbar navbar-expand-lg custom_nav-container pt-3">
                <a className="navbar-brand" href="/">
                  <img style={{width:'70px'}} alt="logo" src={MicroskoolIcon} />
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" onClick={()=>{
                  settoggled(!toggled)
                }}>
                  <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent" style={toggled?{display:'block'}:{}}>
                  <div className="d-flex ml-auto flex-column flex-lg-row align-items-center">
                    <ul className="navbar-nav  ">
                      <li className="nav-item active">
                        <button style={{ border: 'none', backgroundColor: 'none' }} className="nav-link" onClick={() => {
                          navigate("/");
                        }}><FontAwesomeIcon icon={faFileEdit}></FontAwesomeIcon> Files </button>
                      </li>
                      <li className="nav-item">
                        <button style={{ border: 'none', backgroundColor: 'none' }} className="nav-link" onClick={() => {
                          navigate("/new-microskool-document");
                        }}>                     <FontAwesomeIcon icon={faRobot}></FontAwesomeIcon> Leverage AI
                        </button>
                      </li>
                      <li className="nav-item">
                        <button style={{ border: 'none', backgroundColor: 'none' }} className="nav-link" onClick={() => {
                          navigate("/new-microskool-document");
                        }}>
                          <FontAwesomeIcon icon={faAdd}></FontAwesomeIcon> Create New
                        </button>
                      </li>
                      
                      <li className="nav-item">
                        <button style={{ border: 'none', backgroundColor: 'none' }} className="nav-link" onClick={() => {
                          setShow(true);
                        }}
                        >
                          <FontAwesomeIcon icon={faUpload}></FontAwesomeIcon> From
                          Device
                        </button>
                      </li>
                      <li className="nav-item">
                        <button style={{ border: 'none', backgroundColor: 'none' }} className="nav-link" onClick={() => {
                          localStorage.clear()
                          navigate('/login')
                        }}
                        >
                          <FontAwesomeIcon icon={faPowerOff}></FontAwesomeIcon> <small>{localStorage.getItem('email')}</small></button>
                      </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0 ml-0 ml-lg-4 mb-3 mb-lg-0">
                      <button className="btn  my-2 my-sm-0 nav_search-btn" type="submit"></button>
                    </form>
                  </div>
                </div>
              </nav>
            </div>
          </header>
          </div>


<div className="row">
          {/* <div className="table-responsive" >

            <div style={{ height: '420px' }}>
              <DataGrid
                rows={courses}
                columns={columns}

              />
            </div>

          </div> */}



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
              <DataGrid  style={{height:'370px'}} rows={ispost}  rowsPerPageOptions={[2,5,10,20,50, 100]} columns={columns}/>

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
