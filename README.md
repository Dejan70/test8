# Task

[link](task.md)

# React Redux Saga Template

## Quick start guide

### Requirements
Before starting make sure you have NodeJs and NPM installed on machine:

* [NodeJS](https://nodejs.org/en/)
* [npm](https://www.npmjs.com/)

### Getting started with development

Clone repository and run command in console to install required packages:

#### `npm i`

Create .env file from .env.example in root of the project for given environment.

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.
Your app will be available on [http://localhost:3000](http://localhost:3000).

The page will reload if you make edits. You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minimized and the file names include the hashes.

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run build:prod`

Same as above with difference being that instead of .env file .env.prod is loaded.

This boilerplate was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), in addition to standard create react app packages following libraries were added:

## Core JavaScript libraries installed via NPM

* [ReactJS](https://facebook.github.io/react/)
* [Redux](http://redux.js.org/)
* [React Router](https://github.com/ReactTraining/react-router) - Client side routing
* [Redux-saga](https://redux-saga.github.io/redux-saga/) - CQRS sagas in Redux Middleware
* [Axios](https://github.com/mzabriskie/axios) - HTTP client
* [Moment](https://momentjs.com/) - Dates and time manipulation
* [FileSaver](https://github.com/eligrey/FileSaver.js/) - File saver
* [ReactHelmet](https://github.com/nfl/react-helmet) - Head tags manipulation

## React lifecycle

[link](docs/ReactComponentLifecycle.md)

## Architecture guide

[link](docs/ArchitectureGuide.md)
