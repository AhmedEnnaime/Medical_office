import { BiLock } from "react-icons/bi";
import "../assets/css/login.css";
import logo from "../assets/images/thecure.svg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import useSessionStorage from "./customHooks/useSessionStorage";

const Login = () => {
  const [credentials, setCredentials] = useState({});
  const [userId, setUserId] = useSessionStorage("userId", "");
  const url = "http://localhost/YouCode/Theracure";
  const navigate = useNavigate();
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCredentials((values) => ({ ...values, [name]: value }));
  };
  async function handleSubmit(e) {
    e.preventDefault();
    await axios
      .post(`${url}/authenticate/`, credentials)
      .then((response) => {
        if (response.data.message === "Access allowed") {
          console.log(response.data);
          // if (window.sessionStorage["userId"]) {
          //   window.sessionStorage.setItem("userId", "");
          //   setUserId(response.data.credentials.id);
          // } else {
          //   setUserId(response.data.credentials.id);
          // }
          // navigate("/");
        } else {
          alert("Invalid credentials");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-head">
          <img width="250px" src={logo} alt="" />
          <BiLock className="lock-icon" />
        </div>
        <div className="login-inputs">
          <form action="" onSubmit={handleSubmit}>
            <input
              className="login-inp"
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={handleChange}
              required
            />
            <input
              className="login-inp"
              type="password"
              name="password"
              placeholder="Enter password"
              onChange={handleChange}
              required
            />
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
          <Link to={"/signup"}>
            <p className="signup-link">Don't have account ? sign up now</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
