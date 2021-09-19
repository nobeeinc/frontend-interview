## Description

- You will be building the Mobile frontend for Login & Register flow. Design material is available [here](https://www.figma.com/file/Xp8SpVI9P8k1N7cnsJtUUf/Login-testing)
- Backend Api endpoints have already been set up, and accessible via `http://localhost:3000/api/...`
  + [/api/auth/register]('readme/api-documentations/register.md')
  + [/api/auth/login]('readme/api-documentations/log-in.md')
  + [/api/auth/logout]('readme/api-documentations/logout.md')
  + [/api/auth/keep-login]('readme/api-documentations/keep-login.md')
  + [/api/auth/user]('readme/api-documentations/user.md')
  + [/api/auth/emails/:email]('readme/api-documentations/email.md') <- check if email exists


## Set-up instructions

- Install node 14 or higher
- Run `npm install`
- Spin up local server with `npm run dev`


## Acceptance Criteria

### General
  - [ ] Use [Tailwindcss](https://tailwindcss.com)
  - [ ] Use [Formik](https://formik.org) and [yup](https://github.com/jquense/yup) to manage form and validation
  - [ ] Use [Material UI Button Component](https://mui.com/components/buttons)
  - [ ] Use [Material UI IconButton Component](https://mui.com/api/icon-button)
  - [ ] Use [Material UI Textfield Component](https://mui.com/components/text-fields)
  - [ ] No lint error (Using VSCode with ESLint extension is recommended)

### Email Form
  - [ ] Follow the design
  - [ ] Email must be validated before going to Login/Register step
      - [ ] Required
      - [ ] Valid email
  - [ ] If email already exists, direct user to Login step
  - [ ] If email does not exist, direct user to Register step

### Register Form
  - [ ] Follow the design
  - [ ] User should be able to go back to Email Form
  - [ ] User should be able to register
  - [ ] Email should be prefilled from previous step
  - [ ] Email must be validated before submitting
      - [ ] Required
      - [ ] Valid email
  - [ ] Password should be validated before submitting
      - [ ] Required
      - [ ] At least 8 character
      - [ ] Max 255 character
      - [ ] At least 1 uppercase
      - [ ] At least 1 number
      - [ ] At least 1 symbol
  - [ ] Password & Confirm Password must match before submitting
  - [ ] On success, user should be logged in
  - [ ] User should still be logged in after browser refresh, new tab & new window

### Login Form
  - [ ] Follow the design
  - [ ] User should be able to go back to Email Form
  - [ ] User should be able to login
  - [ ] Email should be prefilled from previous step
  - [ ] Email must be validated before submitting
      - [ ] Required
      - [ ] Valid email
  - [ ] Password must be validated before submitting
      - [ ] Required
  - [ ] User should still be logged in after browser refresh, new tab & new window

### Logout
  - [ ] Follow the design
  - [ ] User should be able to logout
  - [ ] User should still be logged out after browser refresh, new tab & new window
