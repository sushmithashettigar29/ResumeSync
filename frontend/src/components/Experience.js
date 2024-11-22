// import React, { useState } from "react";
// import "../styles/Experience.css"; // Import the CSS file
// import NavBar from "./NavBar";
// import { useNavigate } from "react-router-dom";

// const Experience = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     employer: "",
//     company: "",
//     address: "",
//     role: "",
//     start: "",
//     finish: "",
//     currentlyWorking: false,
//     description: "",
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Experience Data Submitted: ", formData);
//   };
//   const navigateToContactInfo = ()=>{
//     navigate("/contact-info");
//   }
//   return (
//     <div className="container">
//       <div className="content">
//         <div className="form-container">
//           <form onSubmit={handleSubmit} className="form">
//             <div className="row">
//               <input
//                 type="text"
//                 name="employer"
//                 placeholder="Employer's name"
//                 value={formData.employer}
//                 onChange={handleChange}
//                 required
//                 className="input"
//               />
//               <input
//                 type="text"
//                 name="company"
//                 placeholder="Company name"
//                 value={formData.company}
//                 onChange={handleChange}
//                 required
//                 className="input"
//               />
//             </div>
//             <div className="row">
//               <input
//                 type="text"
//                 name="address"
//                 placeholder="Address"
//                 value={formData.address}
//                 onChange={handleChange}
//                 required
//                 className="input"
//               />
//               <input
//                 type="text"
//                 name="role"
//                 placeholder="Role"
//                 value={formData.role}
//                 onChange={handleChange}
//                 required
//                 className="input"
//               />
//             </div>
//             <div className="row time-period">
//               <input
//                 type="text"
//                 name="start"
//                 placeholder="MM/YY"
//                 value={formData.start}
//                 onChange={handleChange}
//                 required
//                 className="input"
//               />
//               <input
//                 type="text"
//                 name="finish"
//                 placeholder="MM/YY"
//                 value={formData.finish}
//                 onChange={handleChange}
//                 className="input"
//                 disabled={formData.currentlyWorking}
//               />
//               <label className="checkbox-label">
//                 <input
//                   type="checkbox"
//                   name="currentlyWorking"
//                   checked={formData.currentlyWorking}
//                   onChange={handleChange}
//                   className="checkbox"
//                 />
//                 Currently work here
//               </label>
//             </div>
//             <div className="row description-row">
//               <textarea
//                 name="description"
//                 placeholder="Describe your responsibilities..."
//                 value={formData.description}
//                 onChange={handleChange}
//                 rows="5"
//                 className="textarea"
//               ></textarea>
//               <div className="text-tools">
//                 <button type="button" className="text-tool">
//                   B
//                 </button>
//                 <button type="button" className="text-tool">
//                   I
//                 </button>
//                 <button type="button" className="text-tool">
//                   U
//                 </button>
//                 <button type="button" className="text-tool">
//                   A
//                 </button>
//               </div>
//             </div>
//             <button type="submit" className="next-button" onClick={navigateToContactInfo}>
//               Next Session
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Experience;

import React, { useState } from "react";
import "../styles/Experience.css";

const Experience = ({ navigateToNext }) => {
  const [formData, setFormData] = useState({
    employer: "",
    company: "",
    address: "",
    role: "",
    start: "",
    finish: "",
    currentlyWorking: false,
    description: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "currentlyWorking" && { finish: checked ? "" : prevState.finish }),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.start.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
      alert("Invalid start date format. Please use MM/YY.");
      return;
    }
    if (
      !formData.currentlyWorking &&
      !formData.finish.match(/^(0[1-9]|1[0-2])\/\d{2}$/)
    ) {
      alert("Invalid finish date format. Please use MM/YY.");
      return;
    }

    console.log("Experience Data Submitted: ", formData);
    navigateToNext(); // Navigate to the next section
  };

  return (
    <div className="container">
      <div className="content">
        <div className="form-container">
          <form onSubmit={handleSubmit} className="form">
            <div className="row">
              <input
                type="text"
                name="employer"
                placeholder="Employer's name"
                value={formData.employer}
                onChange={handleChange}
                required
                className="input"
              />
              <input
                type="text"
                name="company"
                placeholder="Company name"
                value={formData.company}
                onChange={handleChange}
                required
                className="input"
              />
            </div>
            <div className="row">
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
                className="input"
              />
              <input
                type="text"
                name="role"
                placeholder="Role"
                value={formData.role}
                onChange={handleChange}
                required
                className="input"
              />
            </div>
            <div className="row time-period">
              <input
                type="text"
                name="start"
                placeholder="MM/YY"
                value={formData.start}
                onChange={handleChange}
                required
                className="input"
              />
              <input
                type="text"
                name="finish"
                placeholder="MM/YY"
                value={formData.finish}
                onChange={handleChange}
                className="input"
                disabled={formData.currentlyWorking}
              />
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="currentlyWorking"
                  checked={formData.currentlyWorking}
                  onChange={handleChange}
                  className="checkbox"
                />
                Currently work here
              </label>
            </div>
            <button type="submit" className="next-button">
              Next Session
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Experience;

