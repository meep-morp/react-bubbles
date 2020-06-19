import React from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Svg, Circle } from '@potion/element';
import { Pack } from "@potion/layout";


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
    <div className="loginForm">
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

      <div className="bubbleDecor">
        <Svg width={400} height={400}>
          <Pack
            data={{
              children: [
                { value: 1, key: '1' },
                { value: 2, key: '2' },
                { value: 3, key: '3' },
              ],
            }}
            sum={datum => datum.value}
            size={[400, 400]}
            includeRoot={false}
            nodeEnter={d => ({ ...d, r: 0 })}
            animate
          >{nodes => nodes.map(({ x, y, r, key }) => (
            <Circle
              key={key}
              cx={x}
              cy={y}
              r={r}
              fill="#f8748a"
            />
          ))}</Pack>
        </Svg>
      </div>
    </div>
  );
};

export default Login;
