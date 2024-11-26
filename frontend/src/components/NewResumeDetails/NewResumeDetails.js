import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import PersonalInformation from "../PersonalInformation/PersonalInformation";
import Education from "../Education/Education";
import JobDescriptionUpload from "../JobDescriptionUpload/JobDescriptionUpload";
import styles from "./NewResumeDetails.module.css"; // Import the CSS Module
import Summary from "../Summary/Summary";
import Skills from "../Skills/Skills";
import Courses from "../Courses/Courses";
import Internship from "../Internship/Internship";
import ActivitiesParticipation from "../ActivitiesParticipation/ActivitiesParticipation";
import Project from "../Project/Project";
import Hobbies from "../Hobbies/Hobbies";

const components = {
  PersonalInformation,
  Summary,
  Education,
  Skills,
  Courses,
  Internship,
  ActivitiesParticipation,
  Project,
  Hobbies,
  JobDescriptionUpload
};

function NewResumeDetails() {
  const sections = [
    { id: 1, name: "Personal Information", component: "PersonalInformation" },
    { id: 2, name: "Summary", component: "Summary" },
    { id: 3, name: "Education", component: "Education" },
    { id: 4, name: "Skills", component: "Skills" },
    { id: 5, name: "Courses", component: "Courses" },
    { id: 6, name: "Internship", component: "Internship" },
    { id: 7, name: "Activities / Participation", component: "ActivitiesParticipation" },
    { id: 8, name: "Project", component: "Project" },
    { id: 9, name: "Hobbies", component: "Hobbies" },
    { id: 10, name: "Job Description", component: "JobDescriptionUpload" },
  ];

  const [selectedSection, setSelectedSection] = useState(sections[0]);

  // Navigate to the next section
  const navigateToNext = () => {
    const currentIndex = sections.findIndex(
      (item) => item.id === selectedSection.id
    );
    if (currentIndex < sections.length - 1) {
      const nextSection = sections[currentIndex + 1];
      setSelectedSection(nextSection);
    }
  };

  const CurrentComponent = components[selectedSection.component];

  return (
    <div className={styles.container}>
      <NavBar />

      <div className={styles.detailsContainer}>
        {/* Sidebar */}
        <div className={styles.sidebar}>
          {sections.map((item) => (
            <div
              key={item.id}
              className={`${styles.sidebarItem} ${
                selectedSection.id === item.id ? styles.selected : ""
              }`}
              onClick={() => setSelectedSection(item)}
            >
              {item.name}
            </div>
          ))}
        </div>

        {/* Main Section */}
        <div className={styles.details}>
          <h2>{selectedSection.name}</h2>
          <CurrentComponent navigateToNext={navigateToNext} />
        </div>
      </div>
    </div>
  );
}

export default NewResumeDetails;
