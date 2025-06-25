import React, { useState, useContext } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";

const LoginPopup = ({ setShowLogin }) => {
  const url = "http://localhost:4000/";
  const { setToken } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({ name: "", email: "", password: "" });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const onLogin = async (e) => {
    e.preventDefault();
    let newurl = url;
    if (currState === "Login") {
      newurl += "api/user/login";
    } else {
      newurl += "api/user/register";
    }
    const response = await axios.post(newurl, data);
    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);
    } else {
      alert(response.data.message);
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="Close"
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "Sign Up" && (
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={onChangeHandler}
              placeholder="Your Name"
              required
            />
          )}
          <input
            type="text"
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            placeholder="Your Email"
            required
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">
          {currState === "Sign Up" ? "Create account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms and privacy policy.</p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a new account?
            <span onClick={() => setCurrState("Sign Up")}>
              &nbsp;Click here
            </span>
          </p>
        ) : (
          <p>
            Already have an account?
            <span onClick={() => setCurrState("Login")}>&nbsp;Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
