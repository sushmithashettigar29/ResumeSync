import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import styles from "./ResumeCreator.module.css";
import NavBar from "../NavBar/NavBar.js";

const ResumeCreator = () => {
  const [formData, setFormData] = useState(null);

  // Load form data from localStorage
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("resumeData"));
    console.log("Retrieved resumeData:", savedData);
    setFormData(savedData || {}); // Handle null or undefined data
  }, []);

  // Format date (optional)
  const formatDate = (date) => {
    if (!date) return "N/A";
    const options = { month: "short", year: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  // Generate the resume PDF
  const generatePDF = () => {
    if (!formData) {
      alert("No data available to generate the resume.");
      return;
    }

    const doc = new jsPDF();
    let yPosition = 10; // Initial Y position
    const lineHeight = 10; // Line height for each row
    const pageHeight = 280; // Usable page height (A4 size)

    // Function to add text with dynamic page handling
    const addText = (text, size = 12) => {
      doc.setFontSize(size);
      if (yPosition + lineHeight >= pageHeight) {
        doc.addPage();
        yPosition = 10; // Reset to top of the new page
      }
      doc.text(text, 10, yPosition);
      yPosition += lineHeight;
    };

    // Add Resume Header
    addText("Resume", 16);

    // Add Personal Information
    if (formData.personalInformation) {
      const {
        firstName,
        lastName,
        email,
        mobileNumber,
        LinkedIn,
        GitHub,
        address,
      } = formData.personalInformation;

      addText("Personal Information", 14);
      addText(`Name: ${firstName || "N/A"} ${lastName || ""}`);
      addText(`Email: ${email || "N/A"}`);
      addText(`Mobile: ${mobileNumber || "N/A"}`);
      addText(`LinkedIn: ${LinkedIn || "N/A"}`);
      addText(`GitHub: ${GitHub || "N/A"}`);
      addText(`Address: ${address || "N/A"}`);
    }

    // Add Summary
    if (formData.summary) {
      addText("Summary", 14);
      addText(formData.summary || "N/A");
    }
    
    // Add Courses
    if (formData.courses && formData.courses.length > 0) {
      addText("Courses", 14);
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
      addText("Internships", 14);
      formData.internships.forEach((internship, index) => {
        addText(`${index + 1}. ${internship.role || "N/A"}`);
        addText(`Start Month: ${formatDate(internship.startMonth)}`);
        addText(`End Month: ${formatDate(internship.endMonth)}`);
        addText(`Description: ${internship.description || "N/A"}`);
        addText(""); // Blank line for separation
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
            <div className={styles.preview}>{/* Other preview sections */}</div>
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
