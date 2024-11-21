// src/App.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import HomePage from "./components/HomePage";
import NewResume from "./components/NewResume";
import EnchanceResume from "./components/EnchanceResume";
import Profile from "./components/Profile";
import About from "./components/About";
import CreateResume from "./components/CreateResume";
import "./App.css";
import PersonalInformation from "./components/PersonalInformation";
import Education from "./components/Education";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/new-resume" element={<NewResume />} />
      <Route path="/enhance-resume" element={<EnchanceResume />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/about" element={<About />} />
      <Route path="/create-resume" element={<CreateResume />} />
      <Route path="/personal-info" element={<PersonalInformation/>}/>
      <Route path="/education" element={<Education/>}/>
    </Routes>
  );
};

export default App;
