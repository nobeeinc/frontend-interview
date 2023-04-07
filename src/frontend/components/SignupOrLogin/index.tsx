import { useRouter } from "next/dist/client/router";
import { CloseIcon } from "../icons/CloseIcon";
import { Button } from "@mui/material";
import style from "../../assets/styles/SignupLogin.module.css"
import React, { useState } from "react";
import validateEmail from "@frontend/validateEmail";
import validatePassword from "@frontend/validatePassword";

export const SignupOrLogin = () => {
  const router = useRouter();
  
  const [email, setEmail] = useState<string>("");

  const checkValidEmail = async () => {
    
    const validEmail: boolean = await validateEmail(email);

    if (validEmail) {
      const response = await fetch("http://localhost:3000/api/auth/emails/" + email, {
        method: "HEAD",

      });

      if (response.ok) {
        router.push("/login");
      } else {
        router.push("/signup");
      }
    }

  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEmail(value);
  };

  return (
    
    <div className={style.body}>
      <div style={{marginTop: "24px", alignItems: "center", display: "flex", justifyContent: "space-between"}}>
        <h5 style={{fontSize: "23.04px", fontWeight: 600, lineHeight: "28px", color: "#161616", float: "left"}}>
          Sign up or Login
        </h5>
        
        <div style={{float: "right", alignItems: "center", display: "flex"}}>
          {/* Do something with close button */}
          <button onClick={() => router.back()}>
              <CloseIcon className="h-6 w-6 fill-current text-black"/>
          </button>
          
        </div>
      </div>

      {/* <form onSubmit={checkValidEmail}> */}
      <form>
        <div style={{fontSize: "14px", fontWeight: 600}}>
          {/* part to ask for email */}
          <label style={{marginTop: "24px", display: 'flex'}}>Your email</label>
            
          <div style={{display: "flex"}}>
            <input 
              className={style.box}
              type="email"
              name="email"
              value={email}
              onChange={handleInputChange}
            />
          </div>
        </div>
        {/* Continue button */}
        
        <Button 
          onClick={checkValidEmail}
          className={style.buttonStyle}
        >
          Continue
        </Button>
      </form>
    </div>
    
  )
}