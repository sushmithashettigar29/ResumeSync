import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import PersonalInformation from "../PersonalInformation/PersonalInformation";
import Education from "../Education/Education";
import Experience from "../Experience/Experience";
import ContactInformation from "../ContactInformation/ContactInformation";
import AwardsCertifications from "../AwardCertification/AwardCertification";
import JobDescriptionUpload from "../JobDescriptionUpload/JobDescriptionUpload";
import styles from "./NewResumeDetails.module.css"; // Import the CSS Module

const components = {
  PersonalInformation,
  Education,
  Experience,
  ContactInformation,
  AwardsCertifications,
  JobDescriptionUpload,
};

function NewResumeDetails() {
  const sections = [
    { id: 1, name: "Personal Information", component: "PersonalInformation" },
    { id: 2, name: "Education", component: "Education" },
    { id: 3, name: "Experience", component: "Experience" },
    { id: 4, name: "Contact Information", component: "ContactInformation" },
    { id: 5, name: "Award/Certification", component: "AwardsCertifications" },
    { id: 6, name: "Job Description", component: "JobDescriptionUpload" },
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
