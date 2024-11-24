// src/App.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import HomePage from "./components/HomePage/HomePage";
import NewResume from "./components/NewResume/NewResume";
import EnchanceResume from "./components/EnchanceResume/EnchanceResume";
import Profile from "./components/Profile/Profile";
import About from "./components/About/About";
import CreateResume from "./components/CreateResume/CreateResume";
import "./App.css";
import PersonalInformation from "./components/PersonalInformation/PersonalInformation";
import Education from "./components/Education/Education";
import Experience from "./components/Experience/Experience";
import ContactInformation from "./components/ContactInformation/ContactInformation";
import AwardCertification from "./components/AwardCertification/AwardCertification";
import NewResumeDetails from "./components/NewResumeDetails/NewResumeDetails";

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
      <Route path="/personal-info" element={<PersonalInformation />} />
      <Route path="/education" element={<Education />} />
      <Route path="/experience" element={<Experience />} />
      <Route path="/contact-info" element={<ContactInformation />} />
      <Route path="/award-certi" element={<AwardCertification />} />
      <Route path="/new-resume-details" element={<NewResumeDetails />} />
    </Routes>
  );
};

export default App;
