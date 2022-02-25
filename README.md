<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://chat-application-dh.herokuapp.com/login">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Chat App</h3>

  <p align="center">
    <br />
    <a href="https://github.com/dd-712/chat-application"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://chat-application-dh.herokuapp.com/login">View Website</a>
    ·
    <a href="https://github.com/dd-712/chat-application/issues">Report Bug</a>
    ·
    <a href="https://github.com/dd-712/chat-application/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="https://chat-application-dh.herokuapp.com/login">Live Website<a/>
    <li>
      <a href="#about-the-project">About The Website</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

A Responsive website where users can chat with wach other, share photos, videos, files.

### Some ScreenShots Of Website

####Login page
 ![Login page][login]
 ### Chat Window
 ![Chat window][chat]
 ###Mobile View
 ![Mobile View][mobileChat]


### Built With

* [Express](https://expressjs.com/)
* [Node](https://nodejs.org/en/)
* [React](https://reactjs.org/)
* [Redux](https://redux.js.org/)
* [Mongoose](https://mongoosejs.com/)
* [Firebase](https://firebase.google.com/)


<!-- GETTING STARTED -->
## Getting Started

* Clone this repo
```
git clone https://github.com/dd-712/chat-application.git
```

* Create .env file into ChatApplicationServer and add below code.
    ```
secretKey=<Your_Secrete_key>
mongoUrl=<url to mongodb database>
bucket_url=<firebase bucket url>
    ```
* In app.js file located in ChatApplicationServer, update the following data.
	```
	const serviceAccount = require('./File wich contains private key of firebase database');

	admin.initializeApp({
	  credential: admin.credential.cert(serviceAccount),
	  databaseURL: "Your database Url goes here",
	  storageBucket: process.env.bucket_url
	});
	```

* Install node from here : https://nodejs.org/en/

* In ChatApplicationServer folder install the dependencies via terminal,
    ```
        npm install
    ```
* In chatapplicationclient folder install the dependencies required for React via terminal,
    ```
        yarn install
    ```
* Now you are ready to start the server.

### Prerequisites

* Javascript
* CSS
* Express
* Node
* React
* Redux
* Mongoose
* Socket.IO
* Firebase


## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Contact
* Divya patel -[@dd-712](https://github.com/dd-712) - divya807950@gmail.com
* Hrushi Patel - [@Hp-175](https://github.com/Hp-175) -  patelhrushi16@gmail.com

[login]: images/login.png
[chat]: images/chat.png
[mobileChat]: images/mobileChat.png
