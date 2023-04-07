import { Button} from "@mui/material";
import { useRouter } from 'next/dist/client/router';
import { CloseIcon } from '../icons/CloseIcon';
import { BackIcon } from '../icons/BackIcon';
import React, { useState } from 'react';
import style from "@frontend/assets/styles/SignupLogin.module.css"
import validateEmail from '@frontend/validateEmail';
import validatePassword from '@frontend/validatePassword';

//form of data
type SignupData = {
  email: string;
  password: string;
};

export const SignupForm = () => {
  const router = useRouter();
  const [emailFocus, setEmailFocus] = useState(false);
  const [passFocus, setPassFocus] = useState(false);

  //0 is valid
  //1 is require
  //2 is invalid
  //3 is wrong email or password
  const [validEmail, setValidEmail] = useState<number>(0);            //invalid email
  const [validPassword, setValidPassword] = useState<number>(0);      //invalid password
  //initialize state of sign up data
  const [SignupData, setSignupData] = useState<SignupData> ({
    email: "",
    password: ""
  });
  const [firstPassword, setFirstPassword] = useState<string>("");     //first password
  const [secondPassword, setSecondPassword] = useState<string>("");   //second password

  const checkValidEmail = ():boolean => {    
    if (SignupData.email == "") {
      setValidEmail(1);
      return false;
    } else if (!validateEmail(SignupData.email)) {
      setValidEmail(2);
      return false;
    } else {
      setValidEmail(0);
      return true;
    }
  }

  const checkValidPassword = ():boolean => {
    // if 2 password does not match
    if (firstPassword != secondPassword) {
      setValidPassword(3);
      return false;
    }

    // if first password is blank
    if (firstPassword == "") {
      setValidPassword(1);
      return false;
    }

    // if password doesn't meet all requirements, alert users and continue with signup form
    else if (!validatePassword(firstPassword)) {
      setValidPassword(2);
      return false;
    }
    setSignupData({ ...SignupData, ["password"]: firstPassword});
    return true;
  }

  //when email input change, change state
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSignupData({ ...SignupData, [name]: value });
  };

  //Color of the border
  const focusColor = {
    borderColor: "#42A87A"
  }
  const defaultColor = {
    borderColor: (validEmail == 0) ? '#DBE5E6': 'red'
  }
  const defaultColorPass = {
    borderColor: (validPassword == 0) ? '#DBE5E6': 'red'
  }

  const handlePassChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstPassword(event.target.value);
  }

  const handlePassChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSecondPassword(event.target.value);
  }

  const handleFormSubmit = async () => {
    //check for email
    const validEmail:boolean = checkValidEmail();
    const validPass:boolean = checkValidPassword();

    if (validEmail && validPass) {
      await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(SignupData),
      }).then(response => {
        response.json()
          .then(token => {
            if (response.ok) {
              const query = {token: token['accessToken']};
              router.push({
                pathname: '/loginSuccess',
                query,
              });
            } else {
              setValidEmail(3);
              alert("invalid Email or Password");
            }
          });
        
      })
      .catch (error => {
        alert("Server error, please try again!");
      });
    }
  };

  return ((
    <div className={style.body}>
      {/* change to Login header */}
      
      <div style={{lineHeight: "28px", marginTop: "24px", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        <div style={{display: "flex"}}>
          {/* back button */}
          <button onClick={() => router.back()}>
            <BackIcon className='h-4 w-4 fill-current text-black'/>
          </button>
        </div>

        <h5 style={{fontSize: "23.04px", fontWeight: 600, lineHeight: "28px", color: "#161616"}}>
          Sign up
        </h5>

        <div style={{alignItems: "center", display: "flex"}}>
          {/* Do something with close button */}
          <button onClick={() => {router.back(); router.back()}}>
              <CloseIcon className="h-6 w-6 fill-current text-black"/>
          </button>       
        </div>
      </div>

      {/* Error message */}
      {(validEmail != 0 || validPassword != 0) && <div className={style.errorMessage}>
        {(validEmail == 1) && <div className={style.message}>Email is required!</div>}
        {(validEmail == 2) && <div className={style.message}>Invalid email address!</div>}
        {(validPassword == 1) && <div className={style.message}>Password is required!</div>}
        {(validPassword == 2) && <div className={style.message}>Invalid password!</div>}
        {(validPassword == 3) && <div className={style.message}>Password does not match</div>}
      </div>}


      <form>
        <div style={{fontSize: "14px", fontWeight: 600}}>

          {/* part to ask for email */}
          <label style={{marginTop: "24px", display: 'flex'}}>Your email</label>
            
            <div style={{display: "flex"}}>
              <input 
                className={style.box}
                name="email"
                value={SignupData.email}
                onChange={handleEmailChange}
                autoComplete='off'
                style={emailFocus ? focusColor: defaultColor}
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
              />
            </div>

          {/* Password input */}
          <div>
            <label style={{marginTop: "24px", display: "flex"}}>
              Password
            </label>
            <div style={{display: "flex"}}>
              <input 
                className={style.box}
                type="password"
                name="password"
                value={firstPassword}
                onChange={handlePassChange1}
                autoComplete='off'
                style={passFocus ? focusColor: defaultColorPass}
                onFocus={() => setPassFocus(true)}
                onBlur={() => setPassFocus(false)}
              />
            </div>
          </div>

          <div>
            <label style={{marginTop: "24px", display: "flex"}}>
              Confirm password
            </label>
            <div style={{display: "flex"}}>
              <input 
                className={style.box}
                type="password"
                name="password2"
                value={secondPassword}
                onChange={handlePassChange2}
                autoComplete='off'
                style={passFocus ? focusColor: defaultColorPass}
                onFocus={() => setPassFocus(true)}
                onBlur={() => setPassFocus(false)}
              />
            </div>
          </div>
        </div>
        
        {/* button to submit form */}
        <Button 
          onClick={handleFormSubmit}
          className={style.buttonStyle}
        >
          Continue
        </Button>
        
      </form>

      <div style={{marginTop: "18px"}}>
        <a style={{marginRight: "8px"}}>Already have an account?</a>
        <a href='http://localhost:3000/login' className={style.linkStyle}>Login</a>
      </div>
  
    </div>
  ));
}
