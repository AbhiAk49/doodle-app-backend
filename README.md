## Doodle-coop
# Local Setup
### 1. Project setup
```
npm install
```

### 2.Run Server Locally
```
npm run start
```
# Deployed Project 
- Deployed using Heroku App - [https://doodle-coop.herokuapp.com/](https://doodle-coop.herokuapp.com/)

# Documentation
### Register for New User
New Users are required to sign up with fresh email id (not required to be valid), name, and password.
>Note : Password must contain one uppercase, one lowercase, one number and one special character.

### Login with Registered Email 
After creating account users can log into application to finally begin doodling!

### Home Page
This page shows a session creation form, active sessions and past sessions.

#### 1. Creating a new session
Creates a session and share the session as available(active) session to the added users in the users list.
After, the user creates a session, user is redirected to the canvas page and joins the "room"

#### 2. Available Sessions
Shows cards for each session available, if any, each session can be joined by join button.
Sessions can also be deleted if required.
>Note : Deleted Session can only be deleted by the host who created it. If deleted, session disappears from the other users too.

#### 3. Previous Sessions
If session was ended, it will be added to the this dropdown to view the history of sessions. 
Past sessions cleared will also be deleted from others's history too.

### Doodle Canvas Page

