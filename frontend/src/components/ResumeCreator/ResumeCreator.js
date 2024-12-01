import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import styles from "./ResumeCreator.module.css";
import NavBar from "../NavBar/NavBar.js";

const ResumeCreator = () => {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    try {
      const savedData = JSON.parse(localStorage.getItem("resumeData"));
      setFormData(savedData || {});
    } catch (error) {
      console.error("Error fetching resume data:", error);
    }
  }, []);

  const formatDate = (date) => {
    if (!date) return "N/A";
    const options = { month: "short", year: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  const generatePDF = () => {
    if (!formData) {
      alert("No data available to generate the resume.");
      return;
    }

    const doc = new jsPDF();
    let yPosition = 10;
    const lineHeight = 5;
    const pageHeight = 280;

    // Helper function to add labeled text
    const addLabeledText = (label, value) => {
      doc.setFont("times", "bold");
      doc.text(`${label}:`, 10, yPosition);
      const labelWidth = doc.getTextWidth(`${label}:`);
      doc.setFont("times", "normal");
      doc.text(value || "N/A", 10 + labelWidth + 2, yPosition);
      yPosition += lineHeight;
      checkPageOverflow();
    };

    const addText = (text, fontSize = 12) => {
      doc.setFontSize(fontSize);
      doc.text(text, 10, yPosition);
      yPosition += lineHeight;
      checkPageOverflow();
    };

    const checkPageOverflow = () => {
      if (yPosition + lineHeight > pageHeight) {
        doc.addPage();
        yPosition = 10;
      }
    };

    const addDivider = () => {
      doc.setDrawColor(200);
      doc.line(10, yPosition, 200, yPosition);
      yPosition += lineHeight;
      checkPageOverflow();
    };

    // Add Personal Information
    // if (formData.personalInformation) {
    //   const {
    //     firstName,
    //     lastName,
    //     email,
    //     mobileNumber,
    //     linkedIn,
    //     gitHub,
    //     address,
    //   } = formData.personalInformation;

    //   doc.setFont("times", "bold");
    //   doc.setFontSize(16);
    //   doc.text(`${firstName || "N/A"} ${lastName || ""}`, 10, yPosition);
    //   yPosition += lineHeight;

    //   doc.setFontSize(12);
    //   addLabeledText("Email", email);
    //   addLabeledText("Mobile", mobileNumber);
    //   addLabeledText("LinkedIn", linkedIn);
    //   addLabeledText("GitHub", gitHub);
    //   addLabeledText("Address", address);
    //   addDivider();
    // }

    // Add Personal Information with User Image on Right
    if (formData.personalInformation) {
      const {
        firstName,
        lastName,
        email,
        mobileNumber,
        linkedIn,
        gitHub,
        address,
        profileImage, // New field for the profile image
      } = formData.personalInformation;

      const textStartX = 10; // Start of text on the left
      const textLineHeight = 5; // Line height for text
      const textFontSize = 12;
      const imageWidth = 30; // Reduced width of the image
      const imageHeight = 30; // Reduced height of the image
      const pageWidth = doc.internal.pageSize.width;
      const imageX = pageWidth - imageWidth - 10; // Position the image to the right margin
      const imageY = yPosition; // Align image vertically with the text

      // Add Personal Information Text
      doc.setFont("times", "bold");
      doc.setFontSize(16);
      doc.text(
        `${firstName || "N/A"} ${lastName || ""}`,
        textStartX,
        yPosition - 3
      );
      yPosition += textLineHeight;

      doc.setFont("times", "normal");
      doc.setFontSize(textFontSize);

      // Helper function to add labeled text
      const addLabeledText = (label, value) => {
        doc.text(`${label}: ${value || "N/A"}`, textStartX, yPosition);
        yPosition += textLineHeight;
      };

      addLabeledText("Email", email);
      addLabeledText("Mobile", mobileNumber);
      addLabeledText("LinkedIn", linkedIn);
      addLabeledText("GitHub", gitHub);
      addLabeledText("Address", address);

      // Add Profile Image if available
      if (profileImage) {
        try {
          doc.addImage(
            profileImage,
            "JPEG",
            imageX,
            imageY,
            imageWidth,
            imageHeight
          );
        } catch (error) {
          console.error("Failed to load profile image:", error);
        }
      }

      // Add some space after this section
      yPosition = Math.max(yPosition, imageY + imageHeight + 3);

      // Add a divider line
      addDivider();
    }

    // Add Summary
    if (formData.summary) {
      doc.setFont("times", "bold");
      addText("SUMMARY", 14);
      doc.setFont("times", "normal");
      addText(formData.summary || "N/A");
    }

    // Education Section
    if (formData.education && formData.education.length > 0) {
      doc.setFont("times", "bold");
      addText("EDUCATION", 14, true);

      formData.education.forEach((edu) => {
        const {
          courseName = "N/A",
          collegeOrSchoolName = "N/A",
          startingYear = "N/A",
          endingYear = "N/A",
          percentageOrCGPA = "N/A",
          currentlyStudying = false,
        } = edu;

        const leftText = `${courseName} - ${collegeOrSchoolName}`;
        const rightText = `${startingYear} - ${
          currentlyStudying ? "Present" : endingYear
        } | CGPA/Percentage: ${percentageOrCGPA}`;

        doc.setFont("times", "normal");
        doc.text(leftText, 10, yPosition);
        doc.text(rightText, 200, yPosition, { align: "right" });

        yPosition += lineHeight; // Adjust vertical position for the next entry
      });
    }

    // Skills
    if (formData.skills) {
      doc.setFont("times", "bold");
      addText("SKILLS", 14, true);

      Object.keys(formData.skills).forEach((category) => {
        if (formData.skills[category].length > 0) {
          doc.setFont("times", "bold");
          const categoryText = `${
            category.charAt(0).toUpperCase() + category.slice(1)
          } :  `;

          doc.text(categoryText, 10, yPosition);

          doc.setFont("times", "normal");
          const skillsText = formData.skills[category].join(", ") || "N/A";
          const categoryWidth = doc.getTextWidth(categoryText);
          doc.text(skillsText, 10 + categoryWidth, yPosition);

          yPosition += lineHeight;
          checkPageOverflow();
        }
      });
    }

    // Add Courses
    if (formData.courses && formData.courses.length > 0) {
      addText("COURSES", 14);
      formData.courses.forEach((course, index) => {
        const courseSentences = formData.courses.map((course) => {
          return `${course.courseTitle || "N/A"} (${
            course.duration || "N/A"
          }) was offered by ${course.offeredBy || "N/A"} and completed in ${
            course.completionYear || "N/A"
          }`;
        });
        addText(courseSentences.join(". ") + ".");
      });
    }

    // Add Internships
    if (formData.internships && formData.internships.length > 0) {
      addText("INTERNSHIPS", 14); // Section header
      formData.internships.forEach((internship) => {
        const formattedDate = `${formatDate(
          internship.startMonth
        )} - ${formatDate(internship.endMonth)}`;
        const roleText = internship.role || "N/A";

        // Left-aligned role, right-aligned date
        doc.text(roleText, 10, yPosition); // Role on the left
        doc.text(formattedDate, 200, yPosition, { align: "right" }); // Date on the right

        // Description below
        yPosition += lineHeight;
        doc.text(internship.description || "N/A", 10, yPosition);
        yPosition += lineHeight;
        checkPageOverflow();
      });
    }

    // Add Activities
    if (formData.activities && formData.activities.length > 0) {
      addText("ACTIVITIES", 14);
      formData.activities.forEach((activity, index) => {
        addText(`${activity.eventName || "N/A"}`);
        addText(`- ${activity.role || "N/A"}`);
        addText(`- ${activity.duration || "N/A"}`);
        addText(`- ${activity.description || "N/A"}`);
        addText("");
      });
    }

    // Add Projects
    if (formData.projects && formData.projects.length > 0) {
      addText("PROJECTS", 14);
      formData.projects.forEach((project, index) => {
        addText(`${index + 1}. Title: ${project.title || "N/A"}`);
        addText(`Start Month: ${project.startMonth || "N/A"}`);
        addText(`End Month: ${project.endMonth || "N/A"}`);
        addText(`Description: ${project.description || "N/A"}`);
        addText("");
      });
    }

    // Add Hobbies
    if (formData.hobbies && formData.hobbies.length > 0) {
      addText("HOBBIES", 14);
      formData.hobbies.forEach((hobby, index) => {
        addText(`${index + 1}. ${hobby || "N/A"}`);
      });
    }

    // Save the PDF
    doc.save("resume.pdf");
    localStorage.clear();
  };

  return (
    <div className={styles.container}>
      <NavBar />
      <div className={styles.content}>
        <div className={styles.formContainer}>
          <h1>Resume Preview</h1>
          {formData ? (
            <div className={styles.preview}>
              <p>
                <strong>Name:</strong>{" "}
                {formData.personalInformation?.firstName || "N/A"}{" "}
                {formData.personalInformation?.lastName || ""}
              </p>
              <p>
                <strong>Email:</strong>{" "}
                {formData.personalInformation?.email || "N/A"}
              </p>
              {/* Add more preview content here */}
            </div>
          ) : (
            <p>Loading data...</p>
          )}
          <button onClick={generatePDF} className={styles.downloadButton}>
            Download Resume
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeCreator;
