import React from "react";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
function NewResume() {
  const navigate = useNavigate();
  const navigateToPersonalInfo = ()=>{
    navigate("/personal-info")
  }
  return (
    <>
      <NavBar />
      <h1>New Resume working!</h1>
      <h1>Create Resume is working!</h1>
      <button onClick={navigateToPersonalInfo}>Lets start</button>
    </>
  );
}

export default NewResume;
