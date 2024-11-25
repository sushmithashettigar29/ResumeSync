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
import NewResumeDetails from "./components/NewResumeDetails/NewResumeDetails";
import Summary from "./components/Summary/Summary";
import Skills from "./components/Skills/Skills";
import Courses from "./components/Courses/Courses";
import Internship from "./components/Internship/Internship";
import ActivitiesParticipation from "./components/ActivitiesParticipation/ActivitiesParticipation";
import Project from "./components/Project/Project";
import Hobbies from "./components/Hobbies/Hobbies";

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
      <Route path="/summary" element={<Summary />} />
      <Route path="/education" element={<Education />} />
      <Route path="/skills" element={<Skills />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/internship" element={<Internship />} />
      <Route path="/activities-participation" element={<ActivitiesParticipation />} />
      <Route path="/project" element={<Project />} />
      <Route path="/hobbies" element={<Hobbies />} />
      <Route path="/new-resume-details" element={<NewResumeDetails />} />
    </Routes>
  );
};

export default App;
