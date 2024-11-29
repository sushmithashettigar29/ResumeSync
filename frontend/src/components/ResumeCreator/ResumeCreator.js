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

    // Helper function to add plain text with custom font size
    const addText = (text, fontSize = 12) => {
      doc.setFontSize(fontSize);
      doc.text(text, 10, yPosition);
      yPosition += lineHeight;
      checkPageOverflow();
    };

    // Check if content exceeds page height and add new page if necessary
    const checkPageOverflow = () => {
      if (yPosition + lineHeight > pageHeight) {
        doc.addPage();
        yPosition = 10;
      }
    };

    // Add Personal Information
    if (formData.personalInformation) {
      const {
        firstName,
        lastName,
        email,
        mobileNumber,
        linkedIn,
        gitHub,
        address,
      } = formData.personalInformation;

      doc.setFont("times", "bold");
      doc.setFontSize(16);
      doc.text(`${firstName || "N/A"} ${lastName || ""}`, 10, yPosition);
      yPosition += lineHeight;

      doc.setFontSize(12);
      addLabeledText("Email", email);
      addLabeledText("Mobile", mobileNumber);
      addLabeledText("LinkedIn", linkedIn);
      addLabeledText("GitHub", gitHub);
      addLabeledText("Address", address);
    }

    // Add Summary
    if (formData.summary) {
      doc.setFont("times", "bold");
      addText("SUMMARY", 14);
      doc.setFont("times", "normal");
      addText(formData.summary || "N/A");
    }

    // Add Education
    if (formData.education && Object.keys(formData.education).length > 0) {
      addText("EDUCATION", 14);
      const {
        courseName = "N/A",
        collegeOrSchoolName = "N/A",
        startingYear = "N/A",
        endingYear = "Currently Studying",
        percentageOrCGPA = "N/A",
        currentlyStudying = false,
      } = formData.education;

      const educationDetails = `${courseName} at ${collegeOrSchoolName} (${startingYear} - ${
        currentlyStudying ? "Present" : endingYear
      }) - CGPA/Percentage : ${percentageOrCGPA}`;
      addText(educationDetails);
    }

    // Add Courses
    if (formData.courses && formData.courses.length > 0) {
      addText("COURSES", 14);
      formData.courses.forEach((course, index) => {
        addText(
          `${index + 1}. ${course.courseTitle || "N/A"} - ${
            course.duration || "N/A"
          } (${course.offeredBy || "N/A"}, ${course.completionYear || "N/A"})`
        );
      });
    }

    // Add Internships
    if (formData.internships && formData.internships.length > 0) {
      addText("INTERNSHIPS", 14);
      formData.internships.forEach((internship, index) => {
        addText(`${index + 1}. ${internship.role || "N/A"}`);
        addText(`Start Month: ${formatDate(internship.startMonth)}`);
        addText(`End Month: ${formatDate(internship.endMonth)}`);
        addText(`Description: ${internship.description || "N/A"}`);
        addText(""); // Blank line for separation
      });
    }

    // Add Skills
    if (formData.skills) {
      addText("SKILLS", 14);
      Object.keys(formData.skills).forEach((category) => {
        if (formData.skills[category].length > 0) {
          addText(
            `${category.charAt(0).toUpperCase() + category.slice(1)}:`,
            12
          );
          addText(formData.skills[category].join(", ") || "N/A");
          addText("");
        }
      });
    }

    // Add Activities
    if (formData.activities && formData.activities.length > 0) {
      addText("ACTIVITIES", 14);
      formData.activities.forEach((activity, index) => {
        addText(`${index + 1}. ${activity.eventName || "N/A"}`);
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
