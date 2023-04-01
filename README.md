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

-   Deployed using Heroku App - [https://doodle-coop.herokuapp.com/](https://doodle-coop.herokuapp.com/) (Deprecated)
-   Deployed (Socket issue) Render App - [https://doodle-backend.onrender.com/](https://doodle-backend.onrender.com/)
-   Login Credentials (render) - abhiak49kumar@gmail.com, Abhishek@123

# Documentation

### Register for New User

New Users are required to sign up with fresh email id (not required to be valid), name, and password.

> Note : Password must contain one uppercase, one lowercase, one number and one special character.

### Login with Registered Email

After creating account users can log into application to finally begin doodling!

### Home Page

This page shows a session creation form, active sessions and past sessions.

#### 1. Creating a new session

Creates a session and share the session as available(active) session to the added users in the users list.
After, the user creates a session, user is redirected to the canvas page and joins the "room".

#### 2. Available Sessions

Shows cards for each session available, if any, each session can be joined by join button.
Sessions can also be deleted if required.

> Note : Deleted Session can only be deleted by the host who created it. If deleted, session disappears from the other users too.

#### 3. Previous Sessions

If session was ended, it will be added to the this dropdown to view the history of sessions.
Past sessions cleared will also be deleted from others's history too.

### Doodle Canvas Page

Title text field is used when saving.
The canvas is the place where users can doodle in. Color picker and Stroke size options are available for the users.
Canvas will update in real time as users draw on the canvas for all the users.
When a new user is joined the users in session will be able to see a joining notification.
When exited the session using exit button, other users will be notified with leave notification.
When any users clears the screen all others screen will also be cleared.
Any user can end a active session at any time using "Save&End" button, after certain buffer period all other users will also leave the session automatically, terminating the session.

> Note: Canvas can be saved only once by any user after the session has been terminated. Saving is only done after the session is terminated (Save&End)

### Saved Canvas

Saved canvas can be viewed here after they have been saved.
Saves will be available to those only which were included during the session creation by the host.

> Note: Only host is able to delete a saved session. After a save is deleted it will also disappear for other users too.
