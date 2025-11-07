# video_chat_app

A MERN-stack mini-app for video chat and real-time messaging.

## Table of Contents

- [Overview](#overview)  
- [Features](#features)  
- [Architecture & Tech Stack](#architecture--tech-stack)  
- [Getting Started](#getting-started)  
  - [Prerequisites](#prerequisites)  
  - [Installation](#installation)  
  - [Running the App](#running-the-app)  
- [Usage](#usage)  
- [Configuration](#configuration)  
- [Folder Structure](#folder-structure)  
- [Contributing](#contributing)  
- [License](#license)  
- [Contact](#contact)

---

## Overview

This project is a full-stack application built with the MERN stack (MongoDB, Express, React, Node.js) that enables users to engage in video chat and real-time messaging.  
It is designed for learning and demonstration of WebRTC/video chat integration, socket communication, user room management, and React UI.

---

## Features

- Real-time video chat between two or more users  
- Real-time text messaging alongside video  
- Room creation / joining capability  
- User interface built with React  
- Backend API built with Express + Node.js and MongoDB for data persistence  
- Implementing STREAM API for lightning fast video and audio services
- Responsive UI and deployment ready  

---

## Architecture & Tech Stack

- **Frontend:** React,Tanstack Query 
- **Backend:** Node.js, Express  
- **Database:** MongoDB Atlas
- **Real-time communication:** Leveraging STREAM
- **Build & tooling:** Webpack or Create-React-App, Babel, ESLint, etc  

---

## Getting Started

### Prerequisites

- Node.js (≥ 14.x/16.x)  
- npm or yarn  
- MongoDB (local or cloud instance)  
- (Optional) A TURN/STUN server for WebRTC if required  

### Installation

```bash
# clone the repository
git clone https://github.com/KaushtubhKumar/video_chat_app.git

# move into project root
cd video_chat_app

# install backend dependencies
cd backend
npm install

# install frontend dependencies
cd ../frontend
npm install

### Running the code
# in one terminal, start backend
cd backend
npm run dev   # or npm start

# in another terminal, start frontend
cd frontend
npm start

