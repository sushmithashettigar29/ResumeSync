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

    // Add Header with Personal Information
    if (formData.personalInformation) {
      const {
        firstName,
        lastName,
        email,
        mobileNumber,
        linkedIn,
        gitHub,
        address,
        profileImage,
      } = formData.personalInformation;

      const textStartX = 10;
      const textLineHeight = 5;
      const textFontSize = 12;
      const imageWidth = 30;
      const imageHeight = 30;
      const pageWidth = doc.internal.pageSize.width;
      const imageX = pageWidth - imageWidth - 10;
      const imageY = yPosition;

      // Name and Contact Details (Left)
      doc.setFont("times", "bold");
      doc.setFontSize(16);
      doc.text(
        `${firstName || "N/A"} ${lastName || ""}`,
        textStartX,
        yPosition - 3
      );
      yPosition += textLineHeight;

      doc.setFontSize(textFontSize);

      const addLabeledText = (label, value) => {
        doc.setFont("times", "bold");
        const labelWidth = doc.getTextWidth(label + ": ");
        doc.text(label + ": ", textStartX, yPosition); // Label in bold

        doc.setFont("times", "normal");
        doc.text(value || "N/A", textStartX + labelWidth, yPosition); // Value in normal font

        yPosition += textLineHeight;
      };

      addLabeledText("Email", email);
      addLabeledText("Mobile", mobileNumber);
      addLabeledText("LinkedIn", linkedIn);
      addLabeledText("GitHub", gitHub);
      addLabeledText("Address", address);

      // Add Profile Image (Right)
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

      yPosition = Math.max(yPosition, imageY + imageHeight + 3);
      addDivider();
    }

    // Add Summary Section
    if (formData.summary) {
      doc.setFont("times", "bold");
      addText("SUMMARY", 14);
      doc.setFont("times", "normal");
      addText(formData.summary || "N/A");
      yPosition += lineHeight;
    }

    // Education Section
    if (formData.educations && formData.educations.length > 0) {
      doc.setFont("times", "bold");
      doc.setFontSize(14);
      doc.text("Educations", 10, yPosition);
      yPosition += 10;

      formData.educations.forEach((edu) => {
        const {
          courseName = "N/A",
          collegeOrSchoolName = "N/A",
          startingYear = "N/A",
          endingYear = "N/A",
          percentageOrCGPA = "N/A",
        } = edu;
        doc.setFontSize(12);
        const leftX = 10;
        const rightX = 190; 
        doc.setFont("times", "bold");
        doc.text(courseName, leftX, yPosition);
        const yearText = `${startingYear} - ${endingYear}`;
        doc.text(yearText, rightX, yPosition, { align: "right" }); 
        yPosition += 10;
        doc.setFont("times", "normal");
        doc.text(collegeOrSchoolName, leftX, yPosition);
        doc.text(`CGPA/Percentage: ${percentageOrCGPA}`, rightX, yPosition, {
          align: "right",
        }); 
        yPosition += 5;
      });
    }

    // Skills Section
    if (formData.skills) {
      doc.setFont("times", "bold");
      addText("SKILLS", 14);

      Object.keys(formData.skills).forEach((category) => {
        if (formData.skills[category].length > 0) {
          // Format category text in bold
          const categoryText = `${
            category.charAt(0).toUpperCase() + category.slice(1)
          }: `;

          doc.setFont("times", "bold");
          const categoryTextWidth = doc.getTextWidth(categoryText);
          doc.text(categoryText, 10, yPosition);

          // Format skills text in normal font
          doc.setFont("times", "normal");
          const skillsText = formData.skills[category].join(", ") || "N/A";
          doc.text(skillsText, 10 + categoryTextWidth, yPosition);

          yPosition += lineHeight;
        }
      });
      yPosition += lineHeight + 1;
    }

    // Courses Section
    if (formData.courses && formData.courses.length > 0) {
      doc.setFont("times", "bold");
      addText("COURSES", 14);
      formData.courses.forEach((course) => {
        addText(`${course.courseTitle || "N/A"} (${course.duration || "N/A"})`);
        addText(
          `Offered by: ${course.offeredBy || "N/A"} | Completed in: ${
            course.completionYear || "N/A"
          }`
        );
        yPosition += lineHeight;
      });
    }

    // Internships Section
    if (formData.internships && formData.internships.length > 0) {
      doc.setFont("times", "bold");
      addText("INTERNSHIPS", 14);
      formData.internships.forEach((internship) => {
        const formattedDate = `${formatDate(
          internship.startMonth
        )} - ${formatDate(internship.endMonth)}`;
        const roleText = internship.role || "N/A";
        doc.text(roleText, 10, yPosition);
        doc.text(formattedDate, 200, yPosition, { align: "right" });
        yPosition += lineHeight;
        doc.text(internship.description || "N/A", 10, yPosition);
        yPosition += lineHeight;
      });
    }

    // Activities Section
    if (formData.activities && formData.activities.length > 0) {
      doc.setFont("times", "bold");
      addText("ACTIVITIES", 14);
      formData.activities.forEach((activity) => {
        const {
          eventName = "N/A",
          role = "N/A",
          duration = "N/A",
          description = "N/A",
        } = activity;
        const activityText = `${eventName}: I served as ${role} for ${duration}. ${description}`;
        doc.setFont("times", "normal");
        doc.text(activityText, 10, yPosition);
        yPosition += lineHeight + 2;
      });
    }

    // Projects Section
    if (formData.projects && formData.projects.length > 0) {
      doc.setFont("times", "bold");
      addText("PROJECTS", 14);
      formData.projects.forEach((project, index) => {
        const {
          title = "N/A",
          startMonth = "N/A",
          endMonth = "N/A",
          description = "N/A",
        } = project;
        const pageWidth = doc.internal.pageSize.width;
        const rightTextX = pageWidth - 10;
        const monthsText = `${startMonth} - ${endMonth}`;
        doc.setFont("times", "bold");
        doc.text(`${index + 1}. ${title}`, 10, yPosition);
        doc.setFont("times", "normal");
        doc.text(monthsText, rightTextX, yPosition, { align: "right" });
        yPosition += lineHeight;
        doc.text(description, 10, yPosition);
        yPosition += lineHeight + 5;
      });
    }

    // Hobbies Section
    if (formData.hobbies && formData.hobbies.length > 0) {
      doc.setFont("times", "bold");
      addText("HOBBIES", 14);
      const hobbiesText = formData.hobbies
        .filter((hobby) => hobby.trim() !== "")
        .join(", ");
      doc.setFont("times", "normal");
      doc.text(hobbiesText, 10, yPosition);

      yPosition += lineHeight + 2;
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





