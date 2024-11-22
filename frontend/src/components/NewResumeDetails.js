// import React, { useState } from "react";
// import NavBar from "./NavBar";
// import PersonalInformation from "./PersonalInformation";
// import Education from "./Education";
// import Experience from "./Experience";
// import ContactInformation from "./ContactInformation";
// import AwardsCertifications from "./AwardCertification";
// import "../styles/NewResumeDetails.css";

// function NewResumeDetails() {
//   const names = [
//     { id: 1, name: "Personal Information", component: "PersonalInformation" },
//     { id: 2, name: "Education", component: "Education" },
//     { id: 3, name: "Experience", component: "Experience" },
//     { id: 4, name: "Contact Information", component: "ContactInformation" },
//     { id: 5, name: "Award/Certification", component: "AwardsCertifications" },
//   ];

//   // Navigation handler
//   const navigateToNext = (id) => {
//     const nextItem = names.find((item) => item.id === id + 1);
//     if (nextItem) {
//       setSelectedName({
//         id: nextItem.id,
//         name: nextItem.name,
//         component: renderComponent(nextItem.component),
//       });
//     }
//   };

//   // Render component dynamically
//   const renderComponent = (componentName) => {
//     switch (componentName) {
//       case "PersonalInformation":
//         return <PersonalInformation navigateToNext={navigateToNext} />;
//       case "Education":
//         return <Education/>;
//       case "Experience":
//         return <Experience />;
//       case "ContactInformation":
//         return <ContactInformation />;
//       case "AwardsCertifications":
//         return <AwardsCertifications />;
//       default:
//         return null;
//     }
//   };

//   const [selectedName, setSelectedName] = useState({
//     id: 1,
//     name: "Personal Information",
//     component: <PersonalInformation navigateToNext={navigateToNext} />,
//   });

//   return (
//     <div className="container">
//       <NavBar />

//       <div className="detailsContainer">
//         {/* Sidebar */}
//         <div className="sidebar">
//           {names.map((item) => (
//             <div
//               key={item.id}
//               className={`sidebarItem ${
//                 selectedName.id === item.id ? "selected" : ""
//               }`}
//               onClick={() =>
//                 setSelectedName({
//                   id: item.id,
//                   name: item.name,
//                   component: renderComponent(item.component),
//                 })
//               }
//             >
//               {item.name}
//             </div>
//           ))}
//         </div>

//         {/* Details Section */}
//         <div className="details">
//           <h2>{selectedName.name}</h2>
//           <div>{selectedName.component}</div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default NewResumeDetails;


import React, { useState } from "react";
import NavBar from "./NavBar";
import PersonalInformation from "./PersonalInformation";
import Education from "./Education";
import Experience from "./Experience";
import ContactInformation from "./ContactInformation";
import AwardsCertifications from "./AwardCertification";
import "../styles/NewResumeDetails.css";
import JobDescriptionUpload from "./JobDescriptionUpload";

const components = {
  PersonalInformation,
  Education,
  Experience,
  ContactInformation,
  AwardsCertifications,
  JobDescriptionUpload
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
    const currentIndex = sections.findIndex((item) => item.id === selectedSection.id);
    if (currentIndex < sections.length - 1) {
      const nextSection = sections[currentIndex + 1];
      setSelectedSection(nextSection);
    }
  };

  const CurrentComponent = components[selectedSection.component];

  return (
    <div className="container">
      <NavBar />

      <div className="detailsContainer">
        {/* Sidebar */}
        <div className="sidebar">
          {sections.map((item) => (
            <div
              key={item.id}
              className={`sidebarItem ${
                selectedSection.id === item.id ? "selected" : ""
              }`}
              onClick={() => setSelectedSection(item)}
            >
              {item.name}
            </div>
          ))}
        </div>

        {/* Main Section */}
        <div className="details">
          <h2>{selectedSection.name}</h2>
          <CurrentComponent navigateToNext={navigateToNext} />
        </div>
      </div>
    </div>
  );
}

export default NewResumeDetails;
