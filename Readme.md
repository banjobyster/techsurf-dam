# Digital Asset Management (Techsurf)
This Digital Asset Management (DAM) app is a full-stack solution built on the MERN stack (MongoDB, Express.js, React.js, Node.js) and leverages AWS S3 for cloud storage and the Azure Vision AI API for image analysis.

## Live Demo
Check out the live demo of this project: [Digital Asset Management](http://43.205.199.21:3000/signin)

## Problem Statement

The goal of this app is to streamline the management of digital images by incorporating various features and leveraging AI capabilities.

## Features

### In-Browser Image Transformation
- **Crop**: Crop images to specific dimensions.
- **Brightness**: Adjust brightness of the image.
- **Saturation**: Adjust saturation of the image.
- **Contrast**: Adjust contrast of the image.
- **Blur**: Adjust blur on the image.
- **Format**: Change file format for downloading.
- **Optimzed download**: Download optimized or original image.

### AI-powered Image Analysis and Tagging

- Utilizes AI algorithms to analyze and automatically tag images based on content, such as objects, scenes, or concepts.

### Image Optimization

- Implements image optimization techniques, including compression and format conversion, for improved performance and faster loading.

### Metadata Management

- Manages metadata associated with digital assets.

## Technologies Used

- MERN Stack (MongoDB, Express.js, React.js, Node.js)
- AWS S3 for cloud storage
- Azure Vision AI API for image analysis

## Project Overview
### Directory Structure
```plaintext
root
├── .gitignore
├── client
│   ├── node_modules
│   ├── public
│   │   ├── index.html
│   │   └── Logo.png
│   ├── src
│   │   ├── App.css
│   │   ├── App.js
│   │   ├── index.js
│   │   ├── components
│   │   │   ├── canvas
│   │   │   │   ├── imageSpace.js
│   │   │   │   ├── imageToolbar.js
│   │   │   │   └── metaDataSpace.js
│   │   │   └── utilities
│   │   │   │   ├── navbar
│   │   │   │   └── searchBar.js
│   │   │   ├── fileList.js
│   │   │   └── workspace.js
│   │   ├── scenes
│   │   │   ├── canvas
│   │   │   │   └── index.js
│   │   │   ├── homePage
│   │   │   │   └── index.js
│   │   │   ├── signInPage
│   │   │   │   └── index.js
│   │   │   ├── signUpPage
│   │   │   │   └── index.js
│   │   │   └── updatePassword
│   │   │       ├── changePassword.js
│   │   │       └── forgotPassword.js
│   │   └── state
│   │       └── index.js
│   ├── .env
│   ├── env_example.txt
│   ├── package-lock.json
│   └── package.json
└── server
    ├── controllers
    │   ├── auth.js
    │   └── workspace.js
    ├── middlewares
    │   └── auth.js
    ├── models
    │   └── Users.js
    ├── node_modules
    ├── routes
    │   ├── auth.js
    │   └── workspace.js
    ├── services
    │   ├── mailer.js
    │   └── randomGenerator.js
    ├── .env
    ├── env_example.txt
    ├── index.js
    ├── package-lock.json
    └── package.json
```

## Getting Started
To run this project locally for development:

1. Clone this repository to your local machine:
   ```shell
   git clone https://github.com/banjobyster/techsurf-dam.git
   ```

2. Navigate to the server directory and setup .env following example:
   ```shell
   cd server
   ```

3. Install server dependencies and start server:
   ```shell
   npm i
   npm run dev
   ```

4. Navigate to the client directory and setup .env following example:
   ```shell
   cd ..\client\
   ```

5. Install client dependencies and start serving frontend:
   ```shell
   npm i
   npm start
   ```

6. Server running at port 5000 and frontend accessible at port 3000 by default