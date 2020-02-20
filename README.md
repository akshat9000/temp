# Course List Page
## About
This repository is the mid-term project for Pay-Pal VAP.

The webpage provides its users first with the option to either login, sign up if they already haven't, and view all the courses that are 
available on the portal.

Upon login or sign-up, the user can view all the available courses, and also the courses they have subscribed for.

The process of actually making a user subscribed to a course with a selected faculty is underway.

## Dependencies
1. Body-Parser
2. EJS
3. Express
4. Nodemon *(optional)*

## Main Routes
* '/'
  * GET is the initial landing page, with the options of *Login*, *Sign Up*, and *View Courses*
  * POST submits the option and redirects accordingly
* '/login'
  * GET renders the html with the option to either login as a *Student* or *Faculty*
  * POST submits the option and redirects accordingly
* '/signUp'
  * GET renders the html with the input fields for *Username* and *Password* for either *Student* or *Faculty*
  * POST submits the data for validation
    * If the credentials are *Incorrect*, the user is redirected to this same route/page
    * Else the user is logged in
* '/create'
  * allows a logged in faculty to *Create* new courses
* '/courses'
  * Displays either all the courses availabel
  * Or all the courses a student has subscribed to
  * Can be empty
