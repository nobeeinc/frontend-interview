import { useState } from 'react'
import { Button } from '@mui/material'
import { useRouter } from 'next/dist/client/router'
import { CloseIcon } from '../icons/CloseIcon'
import { BackIcon } from '../icons/BackIcon'
import { validateEmail } from '@frontend/validateEmail'
import style from '@frontend/assets/styles/SignupLogin.module.css'

//form of data
type LoginData = {
  email: string
  password: string
}

export const LoginForm = () => {
  const router = useRouter()
  const [emailFocus, setEmailFocus] = useState(false)
  const [passFocus, setPassFocus] = useState(false)

  //0 is valid
  //1 is require
  //2 is invalid
  //3 is wrong email or password
  const [validEmail, setValidEmail] = useState<number>(0) //invalid email
  const [validPassword, setValidPassword] = useState<number>(0) //invalid password
  //initialize state of login data
  const [LoginData, setLoginData] = useState<LoginData>({
    email: '',
    password: '',
  })

  const checkValidEmail = () => {
    if (LoginData.email == '') {
      setValidEmail(1)
      return false
    } else if (!validateEmail(LoginData.email)) {
      setValidEmail(2)
      return false
    } else {
      setValidEmail(0)
      return true
    }
  }

  const checkValidPassword = () => {
    if (LoginData.password == '') {
      setValidPassword(1)
      return false
    }
    return true
  }

  //when something change, change state
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setLoginData({ ...LoginData, [name]: value })
  }

  //when something change, change state
  const handlePassChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setLoginData({ ...LoginData, [name]: value })
  }

  //Color of the border
  const focusColor = {
    borderColor: '#42A87A',
  }

  const defaultColor = {
    borderColor: validEmail == 0 ? '#DBE5E6' : 'red',
  }

  const defaultColorPass = {
    borderColor: validPassword == 0 ? '#DBE5E6' : 'red',
  }

  const handleFormSubmit = async () => {
    //check for email and password
    const validEmail: boolean = checkValidEmail()
    const validPass: boolean = checkValidPassword()

    if (validEmail && validPass) {
      await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(LoginData),
      })
        .then((response) => {
          response.json().then((token) => {
            if (response.ok) {
              const query = { token: token['accessToken'] }
              router.push({
                pathname: '/loginSuccess',
                query,
              })
            } else {
              setValidPassword(3)
              alert('invalid Email or Password')
            }
          })
        })
        .catch(() => {
          alert('Server error, please try again!')
        })
    }
  }

  return (
    <div className={style.body}>
      {/* change to Login header */}

      <div
        style={{
          lineHeight: '28px',
          marginTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex' }}>
          {/* back button */}
          <button onClick={() => router.back()}>
            <BackIcon className="h-4 w-4 fill-current text-black" />
          </button>
        </div>

        <h5
          style={{
            fontSize: '23.04px',
            fontWeight: 600,
            lineHeight: '28px',
            color: '#161616',
          }}
        >
          Login
        </h5>

        <div style={{ alignItems: 'center', display: 'flex' }}>
          {/* Do something with close button */}
          <button
            onClick={() => {
              router.back()
              router.back()
            }}
          >
            <CloseIcon className="h-6 w-6 fill-current text-black" />
          </button>
        </div>
      </div>

      {/* Error message */}
      {(validEmail != 0 || validPassword != 0) && (
        <div className={style.errorMessage}>
          {validEmail == 1 && (
            <div className={style.message}>Email is required!</div>
          )}
          {validEmail == 2 && (
            <div className={style.message}>Invalid email address!</div>
          )}
          {validPassword == 1 && (
            <div className={style.message}>Password is required!</div>
          )}
          {validPassword == 3 && (
            <div className={style.message}>
              The password you entered incorrect, please try again!
            </div>
          )}
        </div>
      )}

      <form>
        <div style={{ fontSize: '14px', fontWeight: 600 }}>
          {/* part to ask for email */}
          <label style={{ marginTop: '24px', display: 'flex' }}>
            Your email
          </label>

          <div style={{ display: 'flex' }}>
            <input
              className={style.box}
              name="email"
              value={LoginData.email}
              onChange={handleEmailChange}
              autoComplete="off"
              style={emailFocus ? focusColor : defaultColor}
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            />
          </div>

          {/* Password input */}
          <div>
            <label style={{ marginTop: '24px', display: 'flex' }}>
              Password
            </label>
            <div style={{ display: 'flex' }}>
              <input
                className={style.box}
                type="password"
                name="password"
                value={LoginData.password}
                onChange={handlePassChange}
                autoComplete="off"
                style={passFocus ? focusColor : defaultColorPass}
                onFocus={() => setPassFocus(true)}
                onBlur={() => setPassFocus(false)}
              />
            </div>
          </div>
        </div>

        {/* button to submit form */}
        <Button onClick={handleFormSubmit} className={style.buttonStyle}>
          Continue
        </Button>
      </form>

      <a href="http://localhost:3000/signup" className={style.linkStyle}>
        Sign up?
      </a>
    </div>
  )
}
