import { Card, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import firebaseConfig from '../firebase.config';
import './Signup.css'
import firebase from 'firebase/app';
import "firebase/auth"
import { Link, useHistory } from 'react-router-dom';

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

const Singup = () => {
  const history = useHistory();
  const [verifyMessage, setVerifyMessage]=useState(false)
  const [confirmPass, setConfirmPass]=useState(false)
  const [newUser, setNewUser] = useState({
    fullName: '',
    email: '',
    password: '',
    conPass: '',
    error: '',
    success:false
  })
  const handleChange = (e) => {
    const newUserInfo = { ...newUser }
    newUserInfo[e.target.name] = e.target.value;
    setNewUser(newUserInfo);
  }
  const handleSignup = (e) => {
    e.preventDefault()
    if (newUser.password === newUser.conPass) {
      firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
        .then(() => {
          const newUserInfo = { ...newUser }
          newUserInfo.success = true;
          newUserInfo.error = "";
          setNewUser(newUserInfo);
          const currentUser = firebase.auth().currentUser;
          currentUser.updateProfile({
            displayName: newUser.fullName,
          })
          currentUser.sendEmailVerification()
          setVerifyMessage(true)
        })
        .catch((error) => {
          const newUserInfo = { ...newUser }
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setNewUser(newUserInfo)

          // ..
        });
    } else setConfirmPass(true);
  }
  const toLogin = () => {
    history.push('/login')
  }
  return (
    <div className="signup_form">
      <Card className="form_wrapper">
        {
          verifyMessage &&
          <h5 style={{
            textAlign: "center",
            width: "100%",
            margin: "auto",
            padding: "7px",
            borderRadius: "30px",
            background: "#268b268c",
            color: "white"
          }}>
            Verification mail sent!
                            </h5>
        }
        <h4>Sign Up</h4>
       <form autoComplete="off" onSubmit={handleSignup}>
        
        <TextField
          className="text_field"
            fullWidth
            onBlur={handleChange}
          color="secondary"
          required
            name="fullName"
          label="Your full name"
        />
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
          label="New Password"
         />
          <TextField
            type="password"
            onBlur={handleChange}
          className="text_field"
            fullWidth
          required
          color="secondary"
          name="conPass"
          label="Confirm Password"
        />
    
        <input 
          className=" signup_btn"
          type="submit"
          value="Sign Up"
            fullWidth
          
          />
        </form>
        {
          confirmPass && <p className="text-danger text-center ">Password doesn't match</p>
        }
        {
          newUser.success ? <p className="text-success text-center"> User created successfully</p> : <p className="text-center text-danger">{ newUser.error}</p>
        }
        <p className="text-center ">Already have an account?  <span onClick={toLogin} className="switch_btn"> Log in</span>
        </p>
      </Card>
    </div>
  );
};

export default Singup;