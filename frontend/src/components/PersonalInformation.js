// import React, { useState } from "react";
// import "../styles/PersonalInformation.css";

// const PersonalInformation = ({ navigateToNext }) => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     profession: "",
//     address: "",
//     city: "",
//     state: "",
//     zipCode: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form Data Submitted: ", formData);
//     navigateToNext(1); // Pass the ID of the next component
//   };

//   return (
//     <div className="container">
//       <div className="content">
//         <div className="form-container">
//           <form onSubmit={handleSubmit} className="form">
//             <div className="row">
//               <input
//                 type="text"
//                 name="firstName"
//                 placeholder="First name"
//                 value={formData.firstName}
//                 onChange={handleChange}
//                 required
//                 className="input"
//               />
//               <input
//                 type="text"
//                 name="lastName"
//                 placeholder="Surname"
//                 value={formData.lastName}
//                 onChange={handleChange}
//                 required
//                 className="input"
//               />
//             </div>
//             <div className="row">
//               <input
//                 type="text"
//                 name="profession"
//                 placeholder="e.g Software Engineer"
//                 value={formData.profession}
//                 onChange={handleChange}
//                 required
//                 className="input"
//               />
//               <input
//                 type="text"
//                 name="address"
//                 placeholder="Address"
//                 value={formData.address}
//                 onChange={handleChange}
//                 required
//                 className="input"
//               />
//             </div>
//             <div className="row">
//               <input
//                 type="text"
//                 name="city"
//                 placeholder="City"
//                 value={formData.city}
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
//               <input
//                 type="text"
//                 name="zipCode"
//                 placeholder="Zip Code"
//                 value={formData.zipCode}
//                 onChange={handleChange}
//                 required
//                 className="input"
//               />
//             </div>
//             <button type="submit" className="next-button">
//               Next Session
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PersonalInformation;
import React, { useState } from "react";
import "../styles/PersonalInformation.css";

const PersonalInformation = ({ navigateToNext }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    profession: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData);
    navigateToNext();
  };

  return (
    <div className="container">
      <div className="content">
        <div className="form-container">
          <form onSubmit={handleSubmit} className="form">
            <div className="row">
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="input"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="input"
              />
            </div>
            <div className="row">
              <input
                type="text"
                name="profession"
                placeholder="e.g. Software Engineer"
                value={formData.profession}
                onChange={handleChange}
                required
                className="input"
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
                className="input"
              />
            </div>
            <div className="row">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
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
              <input
                type="text"
                name="zipCode"
                placeholder="Zip Code"
                value={formData.zipCode}
                onChange={handleChange}
                required
                className="input"
              />
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

export default PersonalInformation;
