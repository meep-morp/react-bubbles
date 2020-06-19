import React from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [cred, setCred] = useState({
    username: "Lambda School",
    password: "i<3Lambd4",
  });
  const [message, setMessage] = useState("");

  const { push } = useHistory();

  // make a post request to retrieve a token from the api

  const loginUser = e => {
    e.preventDefault();
    axiosWithAuth()
      .post(`http://localhost:5000/api/login`, cred)
      .then(res => {
        localStorage.setItem("token", res.data.payload);
        push("/bubbles");
      })
      .catch(err => {
        console.log(err);
        setMessage("Invalid Credentials");
      })
  }

  const onChangeHandler = e => {
    setCred({
      ...cred,
      [e.target.name]: e.target.value,
    })
  }


  // when you have handled the token, navigate to the BubblePage route
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={loginUser}>
        <div className="error">{message}</div>
        <input
          type="text"
          value={cred.username}
          name="username"
        />
        <input
          type="password"
          value={cred.password}
          name="password"
        />

        <button className="button" type="submit">Enter</button>
      </form>
    </>
  );
};

export default Login;
