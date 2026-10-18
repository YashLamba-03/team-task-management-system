# Team Task Management System

![CI](https://github.com/YashLamba-03/team-task-management-system/actions/workflows/ci.yml/badge.svg)

A beginner-friendly, browser-based application for small student teams to create, assign, update, track, and delete tasks from one interface. The project also demonstrates DevOps and Source Code Management practices, including Git branching, Pull Requests, automated testing, and continuous integration with GitHub Actions.

**Live Demo:** https://YashLamba-03.github.io/team-task-management-system/

**Repository:** https://github.com/YashLamba-03/team-task-management-system

**Course:** DevOps Fundamentals and SCM (CSDV2010P)
**Programme:** B.Tech DevOps, Semester III, Academic Year 2025–26

---

## Table of Contents

- [Team](#team)
- [Problem Statement](#problem-statement)
- [Features](#features)
- [Screenshots](#screenshots)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Using the Application](#using-the-application)
- [Running the Tests](#running-the-tests)
- [Git Workflow](#git-workflow)
- [Continuous Integration](#continuous-integration)
- [Deployment](#deployment)
- [Limitations](#limitations)
- [Future Improvements](#future-improvements)
- [AI Usage Disclosure](#ai-usage-disclosure)

---

## Team

| S. No. | Student Name      | SAP ID / Roll No.         | Role in Project                          |
|--------|-------------------|---------------------------|------------------------------------------|
| 1      | Satvik            | 590028325 / 25010104207   | Application Development & Testing        |
| 2      | Yashashwee Lamba  | 590026138 / 25010101686   | SCM, CI/CD & Deployment                  |

---

## Problem Statement

Small student teams often manage project tasks through chat messages, notebooks, spreadsheets, or scattered documents. These methods make it hard to see which tasks are pending, who owns each one, what their priority is, and which are finished. There is also no structured way to demonstrate version control, branching, testing, and continuous integration.

This project provides a simple web-based task manager that addresses these problems while following a clear Git and GitHub workflow.

---

## Features

### Dashboard
- Total number of tasks
- Number of completed tasks
- Number of tasks in progress
- Number of tasks still to do

### Task Management
- **Create** a task with a name, description, assigned member, priority, deadline, and status
- **View** all tasks in an organized list, with each task showing its details
- **Edit** any existing task through the same form used to create it
- **Delete** a task after confirming the action
- **Update status** directly from the task card using a dropdown (To Do, In Progress, Completed)

### Priority and Deadlines
- Priorities are Low, Medium, or High
- Each task stores a deadline date

### Search and Filtering
- Search by task name or description
- Filter by status
- Filter by priority
- Filters can be combined

### Team Members
- Lists the team members
- Shows how many tasks are assigned to each member

### Validation and Safety
- Required fields are checked before a task is saved, with clear messages
- Task text is escaped before display, which prevents user input from being run as HTML

### Responsive Layout
- Works in common modern browsers
- The dashboard and team sections adjust to smaller screens

---

## Screenshots

| Dashboard | Task List |
|-----------|-----------|
| ![Dashboard](docs/screenshots/dashboard.png) | ![Tasks](docs/screenshots/tasks.png) |

| Team Members | Successful CI Run |
|--------------|-------------------|
| ![Team](docs/screenshots/team.png) | ![CI](docs/screenshots/ci.png) |

---

## Technology Stack

| Area                    | Technology                       |
|-------------------------|----------------------------------|
| Structure               | HTML5                            |
| Styling                 | CSS3                             |
| Logic and interactivity | JavaScript (ES6)                 |
| Automated testing       | Jest                             |
| Version control         | Git                              |
| Repository hosting      | GitHub                           |
| Continuous integration  | GitHub Actions                   |
| Deployment              | GitHub Pages                     |
| Development environment | Visual Studio Code               |

---

## Project Structure

```
team-task-management-system/
├── .github/
│   └── workflows/
│       └── ci.yml            # GitHub Actions workflow that runs the tests
├── css/
│   └── style.css             # All page styling
├── js/
│   ├── taskLogic.js          # Pure logic: validation, filtering, statistics
│   └── app.js                # Page behavior: forms, rendering, events
├── tests/
│   └── taskLogic.test.js     # Automated unit tests
├── docs/
│   └── screenshots/          # Images used in this README
├── index.html                # Main page
├── package.json              # Project metadata and npm scripts
├── package-lock.json         # Locked dependency versions
├── .gitignore                # Files Git should ignore (e.g. node_modules)
└── README.md                 # This file
```

### How the code is organized

- **`taskLogic.js`** contains functions that take data and return results without touching the page. Because they don't depend on the browser, they can be tested directly. This file includes `validateTask`, `createTask`, `filterTasks`, `computeStats`, and `countTasksByMember`.
- **`app.js`** connects those functions to the page. It reads form values, updates the task list, handles the Add, Edit, Delete, and status buttons, and refreshes the dashboard and team counts.
- **`index.html`** defines the layout. It loads `taskLogic.js` before `app.js`, because `app.js` uses functions defined in `taskLogic.js`.

---

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Edge, or Firefox)
- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (version 20 or later, which includes npm)
- [Visual Studio Code](https://code.visualstudio.com/) (recommended)

### Installation

1. Clone the repository:

```bash
   git clone https://github.com/YashLamba-03/team-task-management-system.git
   cd team-task-management-system
```

2. Install the development dependencies (needed only for running the tests):

```bash
   npm install
```

3. Open the application by double-clicking `index.html`, or by opening it from your browser's File menu.

No build step is required. The application runs entirely in the browser.

---

## Using the Application

### Adding a task
1. Open the **Tasks** section.
2. Click **+ Add Task**.
3. Fill in the name, description, team member, priority, and deadline. Choose a status.
4. Click **Create Task**. If a required field is missing, a message explains what to fix.

### Editing a task
1. Click **Edit** on a task card.
2. Change the details in the form.
3. Click **Save Changes**.

### Changing a task's status
Use the **Status** dropdown on the task card. The dashboard updates immediately.

### Deleting a task
1. Click **Delete** on a task card.
2. Confirm the prompt.

### Searching and filtering
- Type in the search box to match task names or descriptions.
- Use the **All Statuses** and **All Priorities** dropdowns to narrow the list. The filters work together.

### Viewing team workload
Open the **Team Members** section to see how many tasks each member has.

---

## Running the Tests

The project uses [Jest](https://jestjs.io/) for automated unit tests. The tests cover:

1. Validation accepts complete task data.
2. Validation rejects an empty task name.
3. Filtering by status and by search text.
4. Dashboard statistics count tasks by status.
5. Team workload counts tasks per member.

To run the tests:

```bash
npm test
```

A passing run ends with output similar to:

```
Test Suites: 1 passed, 1 total
Tests:       5 passed, 5 total
```

---

## Git Workflow

This project follows a feature-branch workflow:

1. **`main`** always holds the stable, working version of the application.
2. Each team member creates a **feature branch** for their work, such as `feature/task-crud` or `feature/team-assignment`.
3. Changes are committed with clear, descriptive messages.
4. The branch is pushed to GitHub and a **Pull Request** is opened against `main`.
5. The Pull Request is reviewed and the CI checks must pass.
6. The Pull Request is merged, and the feature branch is deleted.

### Example commands

```bash
git checkout main
git pull
git checkout -b feature/my-feature

# make changes, then
git add <files>
git commit -m "Describe the change clearly"
git push -u origin feature/my-feature
```

Then open a Pull Request on GitHub from `feature/my-feature` into `main`.

### Commit history

The project history includes commits for folder restructuring, task storage and management features, search and filtering, unit tests, and the CI workflow. See the full history with:

```bash
git log --oneline
```

---

## Continuous Integration

The CI pipeline is defined in `.github/workflows/ci.yml` and is run by GitHub Actions. It runs automatically when:

- code is pushed to `main`, or
- a Pull Request targets `main`.

Each run:

1. Checks out the repository code.
2. Sets up Node.js 20.
3. Installs dependencies with `npm ci`.
4. Runs the test suite with `npm test`.

A green check on a Pull Request means the tests passed on GitHub's servers. A red X means at least one step failed. Click the failed run in the **Actions** tab to see the details.

---

## Deployment

The application is deployed with **GitHub Pages**, served directly from the `main` branch.

To deploy or redeploy:

1. Go to **Settings → Pages** in the repository.
2. Under **Source**, select **Deploy from a branch**.
3. Choose the **main** branch and the **/ (root)** folder, then click **Save**.
4. Wait a minute or two, then open the live URL: https://YashLamba-03.github.io/team-task-management-system/

Each merge into `main` updates the live site.

---

## Limitations

- **Data is not saved between page refreshes.** Tasks are stored in the browser's memory only, so refreshing the page clears them. This is intentional for the first version and keeps the application simple.
- **Team members are fixed.** The member list is defined in `index.html` (Member 1 and Member 2). Team members can't be added or renamed through the interface.
- **No user accounts or login.** Anyone who can open the page can view and change tasks.

---

## Future Improvements

- Save tasks in the browser's `localStorage` so they persist after a refresh
- Allow adding and removing team members from the interface
- Sort tasks by deadline or priority
- Show overdue tasks in a highlighted color
- Add more automated tests for the page behavior
- Add user accounts and a shared backend database

---

## AI Usage Disclosure

AI tools (ChatGPT, Claude, and online document tools) were used as learning and development assistants for understanding concepts, planning, debugging, and drafting documentation. All AI-assisted code was reviewed, tested, modified where necessary, and explained by the team before inclusion. The AI-use record documenting the prompts, outputs used, modifications, and reflections is maintained separately.

---

## License

This project was created for academic purposes as part of the Semester III Mini Project for the B.Tech DevOps programme.