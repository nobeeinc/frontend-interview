## Description

- You will be building the Mobile frontend for Login & Register flow. Design material is available at [https://www.figma.com/file/Xp8SpVI9P8k1N7cnsJtUUf/Login-testing](https://www.figma.com/file/Xp8SpVI9P8k1N7cnsJtUUf/Login-testing)
- You will have 5 days to submit this assignment. Simply make a PR to this [repo](https://github.com/nobeeinc/frontend-interview), including your name and link to your CV in the PR description
- Backend Api endpoints have already been set up, and accessible via `http://localhost:3000/api/...`
  + [POST /api/auth/register](api-documentations/register.md)
  + [POST /api/auth/login](api-documentations/login.md)
  + [POST /api/auth/logout](api-documentations/logout.md)
  + [POST /api/auth/keep-login](api-documentations/keep-login.md)
  + [GET /api/auth/user](api-documentations/user.md)
  + [HEAD /api/auth/emails/:email](api-documentations/email.md) <- check if email exists


## Set-up instructions

- Install node 14 or higher
- Clone the repo `git clone https://github.com/nobeeinc/frontend-interview.git`
- Run `npm install`
- Spin up local server with `npm run dev`


## Acceptance Criteria

### General
  - [x] Use [Tailwindcss](https://tailwindcss.com)
  - [x] Use [Formik](https://formik.org) and [yup](https://github.com/jquense/yup) to manage form and validation
  - [x] Use [Material UI Button Component](https://mui.com/components/buttons)
  - [ ] Use [Material UI IconButton Component](https://mui.com/api/icon-button)
  - [x] Use [Material UI Textfield Component](https://mui.com/components/text-fields)
  - [x] No lint error (Using VSCode with ESLint extension is recommended)

### Email Form
  - [x] Follow the design
  - [x] Email must be validated before going to Login/Register step
      - [x] Required
      - [x] Valid email
  - [x] If email already exists, direct user to Login step
  - [x] If email does not exist, direct user to Register step

### Register Form
  - [x] Follow the design
  - [x] User should be able to go back to Email Form
  - [ ] User should be able to register
  - [x] Email should be prefilled from previous step
  - [x] Email must be validated before submitting
      - [x] Required
      - [x] Valid email
  - [x] Password should be validated before submitting
      - [x] Required
      - [x] At least 8 character
      - [x] Max 255 character
      - [x] At least 1 uppercase
      - [x] At least 1 number
      - [x] At least 1 symbol
  - [x] Password & Confirm Password must match before submitting
  - [x] On success, user should be logged in
  - [x] Display logged-in state accordingly (see design)
  - [x] User should still be logged in after browser refresh, new tab & new window

### Login Form
  - [x] Follow the design
  - [ ] User should be able to go back to Email Form
  - [x] User should be able to login
  - [x] Display logged-in state accordingly (see design)
  - [ ] Email should be prefilled from previous step
  - [x] Email must be validated before submitting
      - [x] Required
      - [x] Valid email
  - [x] Password must be validated before submitting
      - [x] Required
  - [x] User should still be logged in after browser refresh, new tab & new window

### Logout
  - [x] Follow the design
  - [x] User should be able to logout
  - [x] Display logged-out state accordingly (see design)
  - [x] User should still be logged out after browser refresh, new tab & new window
