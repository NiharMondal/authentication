import { Card, TextField } from '@material-ui/core';
import './Login.css'
import React, { useState } from 'react';
import firebaseConfig from '../firebase.config';
import firebase from 'firebase/app';
import "firebase/auth"
import { useHistory } from 'react-router-dom';

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

const Login = () => {
  const history = useHistory();
  const [user, setUser] = useState({
    fullName:'',
    email: '',
    password: '',
    error: '',
    success:false
  })
  const handleChange = (e) => {
    const newUserInfo = { ...user }
    newUserInfo[e.target.name] = e.target.value;
    setUser(newUserInfo);

  }
  const handleSignup = (e) => {
    e.preventDefault()
    if (user.password && user.email) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const userInfo = { ...user };
          userInfo.error = "";
          userInfo.success = true;
          const currentUser = firebase.auth().currentUser;
          
          if (currentUser.emailVerified) {
            setUser(userInfo, currentUser);
            history.replace("/")
          } else {
            currentUser.sendEmailVerification()
          }
          
          
        })
        .catch((error) => {
          const userInfo = { ...user };
          userInfo.error = error.message;
          userInfo.success = false;
          setUser(userInfo)
          
        });
    } 
  }
  
  const toSignup = () => {
    history.push("/signup")
  }
  return (
    <div className="signup_form ">
      <Card className="form_wrapper login_form">
        <h4>Login</h4>
        <form autoComplete="off" onSubmit={handleSignup} className="exact_form">

          <TextField
            className="text_field"
            fullWidth
            onBlur={handleChange}
            required
            color="secondary"
            name="email"
            label="Your Email address"
          />
          <TextField
            type="password"
            onBlur={handleChange}
            className="text_field"
            fullWidth
            required
            color="secondary"
            name="password"
            label="Enter Password"
          />

          <input
            className=" login_btn"
            type="submit"
            value="Login"
            fullWidth

          />
        </form>
        {user.success && <p className="text-success text-center">Logged in successfully</p>}
        {
          user.error && <p className="text-danger text-center">{ user.error}</p>
        }
       
        <p className="text-center ">Don't have an account? <span onClick={toSignup} className="switch_btn">Create an account</span></p>
      </Card>
    </div>
  );
};

export default Login;