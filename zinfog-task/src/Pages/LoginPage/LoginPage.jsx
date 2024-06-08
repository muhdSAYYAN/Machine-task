import React, { useState } from "react";
import "./LoginPage.css";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlinePhone } from "react-icons/hi";
import axios from "axios";

const LoginPage = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const [logData, setLogData] = useState({});
  const [error, setError] = useState("");

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");  

    if (!inputs.username || !inputs.password) {
      setError("Please fill all the fields");
      return;
    }
    try {
      const response = await axios.post('http://localhost:7000/login', inputs,{withCredentials:true});
      setLogData(response.data);
      console.log('Login successful:', response.data);
      navigate('/home')
    } catch (err) {
      console.error('Login error:', err);
      setError("Invalid username or password");
    }
  };
    

  return (
    <div className="container-fluid w-100 d-flex justify-content-center align-items-center loginPage">
      <div className="bg-white pt-3 gap-4 d-flex flex-column justify-content-evenly align-items-center log-main">
        <div className="w-100 d-flex justify-content-center align-align-items-center">
          <img
            className="log-icon img-fluid"
            src={require("../../images/Vector 5.png")}
            alt=""
          />
          <img
            className="log-img img-fluid"
            src={require("../../images/Group 366.png")}
            alt=""
          />
          <img
            className="log-icon2 img-fluid"
            src={require("../../images/Vector 5.png")}
            alt=""
          />
        </div>

        <h6 className="log-clr">Report Download portal</h6>

        <form
          className="bg-info px-3 py-3 gap-2 d-flex flex-column justify-content-evenly align-items-center log-form"
          onSubmit={handleLogin}
        >
          <span>Login</span>
          <div className="d-flex flex-column log-inp">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              placeholder="Enter email Id"
              name="username"
              onChange={handleChange}
            />
          </div>
          <div className="d-flex flex-column log-inp">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button className="log-btn" type="submit">
            SUBMIT
          </button>
          <Link className="log-form-link">Reset Password</Link>
        </form>

        <div className="phone">
          <img
            className="log-icon3 img-fluid"
            src={require("../../images/Vector 5.png")}
            alt=""
          />
          <HiOutlinePhone className="phone" /> (+91)9288008801
        </div>

        <p className="log-privacy">
          I hereby agree to accept the <Link>Terms of services</Link> and{" "}
          <Link>Privacy policy</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
