import React, { useState, useEffect } from "react";
import "./login.css";
import "../../App.css";
import side_img from "../Assests/images/sidebanner.png";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const initialValues = { Name: "", UserName: "", Email: "", Mobile: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [TnC, setTnC] = useState(false);

  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    mobile: "",
  });

  const handleChange = (e) => {
    console.log(e);
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const errors = validate(formValues);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0 && isSubmit && TnC) {
      navigate("/Category_page");
    }
    setIsSubmit(true);
    setTnC(true);

    
    var f_Name = document.getElementById("name").value;
    var f_UserName = document.getElementById("username").value;
    var f_Email = document.getElementById("email").value;
    var f_Mobile = document.getElementById("mobile").value;

    localStorage.setItem("Name", f_Name);
    localStorage.setItem("UserName", f_UserName);
    localStorage.setItem("Email", f_Email);
    localStorage.setItem("Mobile_no", f_Mobile);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit && setTnC) {
      console.log(formValues);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.name) {
      errors.name = "Field is required";
    }
    if (!values.username) {
      errors.username = "Field is required";
    } else if (values.username.length < 5) {
      errors.username = "UserName must be atleast 5 characers";
    } else if (values.username.length > 15) {
      errors.username = "UserName must not excced 15 characers";
    }

    if (!values.email) {
      errors.email = "Field is required";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }

    if (!values.mobile) {
      errors.mobile = "Field is required";
    } else if (values.mobile.length > 10) {
      errors.mobile = "Mobile no must be 10 digits";
    } else if (values.mobile.length < 10) {
      errors.mobile = "Mobile no must be 10 digits";
    } else if (values.Mobile.length === 10) {
      errors.mobile = "Mobile no must be 10 digits";
    }

    if (!values.c_box) {
      errors.c_box = "Check this box if you want to proceed";
    }

    return errors;
  };

  return (
    <div className="page_1">
      <div className="image_bg">
        <img src={side_img} alt="image_isde" className="image_bg" />
      </div>
      <div className="login_form">
        <h2 className="heading">Supper App</h2>
        <h4 className="heading2">Create your new account</h4>
        <form onSubmit={handleSubmit}>
          <input value={formValues.name} className="form_input" id="name" placeholder="Name"name="name" type="text" onChange={handleChange} ></input>
          <p className="errormsg">{formErrors.name}</p>

          <input className="form_input" id="username" placeholder="UserName" name="username" type="text" value={formValues.username} onChange={handleChange} ></input>
          <p className="errormsg">{formErrors.username}</p>

          <input className="form_input" id="email" placeholder="Email" name="email" type="email" value={formValues.email} onChange={handleChange} ></input>
          <p className="errormsg">{formErrors.email}</p>

          <input className="form_input" id="mobile" placeholder="Mobile" name="mobile" type="number" value={formValues.mobile} onChange={handleChange} maxLength="10" ></input>
          <p className="errormsg">{formErrors.mobile}</p>

          <label className="c_box">
            <input type="checkbox" onChange={handleChange} name="c_box" />
            Share my registration data with Superapp
          </label>
          <p className="errormsg">{formErrors.c_box}</p>

          <button className="submit_button" onClick={handleSubmit}> SIGN UP</button>
        </form>
        <div>
          <p className="p1">
            By clicking on Sign up. you agree to Superapp{" "}
            <span className="terms_codN">Terms and Conditions of Use</span>
          </p>
          <p className="p2">
            To learn more about how Superapp collects, uses, shares and protects
            your personal data please head Superapp
            <span className="terms_codN">Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Login;
