import React, { useState } from "react";
import {  Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Add from "./components/Add";
import Edit from "./components/Edit";
function App() {
 const [ids, setIds]= useState()
  return (
    <>
      <Routes>
        <Route path="/" element={<Home setIds={setIds} />} />
        <Route path="/new-microskool-document" element={<Add />} />
        <Route path="/Edit/:postID" element={<Edit ids={ids} />} />
      </Routes>
    </>
  );
}
export default App;
