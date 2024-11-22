// import React, { useState } from "react";
// import "../styles/Education.css";
// import NavBar from "./NavBar";
// import { useNavigate } from "react-router-dom";

// const Education = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     institution: "",
//     course: "",
//     country: "",
//     state: "",
//     start: "",
//     finish: "",
//     currentlyStudying: false,
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
//     console.log("Form Data Submitted: ", formData);
//   };

//   const navigateToExperience = ()=>{
//     navigate("/experience");
//   }
//   return (
//     <div className="container">
//       <div className="content">
//         <div className="form-container">
//           <form onSubmit={handleSubmit} className="form">
//             <div className="row">
//               <input
//                 type="text"
//                 name="institution"
//                 placeholder="Name of school"
//                 value={formData.institution}
//                 onChange={handleChange}
//                 required
//                 className="input"
//               />
//               <input
//                 type="text"
//                 name="course"
//                 placeholder="Course studied"
//                 value={formData.course}
//                 onChange={handleChange}
//                 required
//                 className="input"
//               />
//             </div>
//             <div className="row">
//               <input
//                 type="text"
//                 name="country"
//                 placeholder="Country name"
//                 value={formData.country}
//                 onChange={handleChange}
//                 required
//                 className="input"
//               />
//               <input
//                 type="text"
//                 name="state"
//                 placeholder="State"
//                 value={formData.state}
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
//                 disabled={formData.currentlyStudying}
//               />
//               <label className="checkbox-label">
//                 <input
//                   type="checkbox"
//                   name="currentlyStudying"
//                   checked={formData.currentlyStudying}
//                   onChange={handleChange}
//                   className="checkbox"
//                 />
//                 Currently study here
//               </label>
//             </div>
//             <button type="submit" className="next-button" onClick={navigateToExperience}>
//               Next Session
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Education;
import React, { useState } from "react";
import "../styles/Education.css";

const Education = ({ navigateToNext }) => {
  const [formData, setFormData] = useState({
    institution: "",
    course: "",
    country: "",
    state: "",
    start: "",
    finish: "",
    currentlyStudying: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "currentlyStudying" && { finish: checked ? "" : prevState.finish }),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.start.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
      alert("Invalid start date format. Please use MM/YY.");
      return;
    }
    if (
      !formData.currentlyStudying &&
      !formData.finish.match(/^(0[1-9]|1[0-2])\/\d{2}$/)
    ) {
      alert("Invalid finish date format. Please use MM/YY.");
      return;
    }

    console.log("Education Form Submitted: ", formData);
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
                name="institution"
                placeholder="Name of school"
                value={formData.institution}
                onChange={handleChange}
                required
                className="input"
              />
              <input
                type="text"
                name="course"
                placeholder="Course studied"
                value={formData.course}
                onChange={handleChange}
                required
                className="input"
              />
            </div>
            <div className="row">
              <input
                type="text"
                name="country"
                placeholder="Country name"
                value={formData.country}
                onChange={handleChange}
                required
                className="input"
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
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
                disabled={formData.currentlyStudying}
              />
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="currentlyStudying"
                  checked={formData.currentlyStudying}
                  onChange={handleChange}
                  className="checkbox"
                />
                Currently study here
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

export default Education;

