This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

**Task Manager**

You have to create a task manager comprising of servers and tasks.

**What is a server?**

A server is a program that executes a task. Here, one server can perform only one task at a time.

**What is a task?**

A task is a piece of work to be done. Here a task will be presented by a linear progress bar that fills itself completely in 20 seconds. A timer will be running beside the task to show the time left to complete it. 

The system will have the following functionalities:

**Add a server:** The system will start with only 1 server and more servers can be added using the "Add a server" button. The system can have a minimum of 1 server & a maximum of 10 servers running simultaneously.

**Remove a server**: An idle server can be removed from the system by pressing the "Remove a server" button. If a server is not performing any task it will be removed immediately, however, if a server is doing a job it'll be removed after completing the job.

**Add tasks:** The system will start with 0 tasks. N number of tasks can be added to the task queue by entering N and pressing the "Add tasks" button. 

**Task execution:** A task starts immediately if there is a server available. If the server is not available, the task gets added to the task queue. A task that has not started yet can be removed by pressing a delete button. A task in the progress can't be removed or stopped. 

