# HelpDesk – DevOps CI/CD Project

A containerized HelpDesk ticket management application with an automated CI/CD pipeline using Jenkins, Docker, and Git.

## Project Overview

HelpDesk is a ticket management web application that allows users to create and view support tickets.

This project demonstrates how to build, test, containerize, and deploy an application using DevOps tools.

## Technologies Used

| Technology | Purpose |
|---|---|
| Node.js | Backend runtime |
| Express.js | Web application framework |
| Git | Version control |
| GitHub | Source code hosting |
| Jenkins | CI/CD automation |
| Docker | Containerization |
| Docker Volume | Persistent ticket data |
| Node.js Test Runner | Automated testing |

## Architecture

```text
Developer
    |
    v
   Git
    |
    v
  Jenkins
    |
    +--> Install Dependencies
    |
    +--> Run Automated Tests
    |
    +--> Build Docker Image
    |
    +--> Deploy Docker Container
              |
              v
       HelpDesk Application
          Port 3000
```

## CI/CD Pipeline Stages

1. **Source Checkout:** Jenkins retrieves the application source code from Git.
2. **Install Dependencies:** Installs required Node.js packages.
3. **Run Tests:** Executes automated application tests.
4. **Build Docker Image:** Creates the `helpdesk:latest` image.
5. **Deploy:** Runs the application inside a Docker container.

## Automated Testing

The project includes three automated tests:

- Health endpoint verification.
- Ticket creation and listing.
- Ticket creation input validation.

**Latest test result:** 3 passed, 0 failed.

## Docker Configuration

Build the image:

```bash
docker build -t helpdesk:latest .
```

Run the container:

```bash
docker run -d --name helpdesk-app -p 3000:3000 -v helpdesk-data:/app/data --restart unless-stopped helpdesk:latest
```

Access the application:

```text
http://localhost:3000
```

## Run Locally

Install dependencies:

```bash
npm install
```

Start the application:

```bash
npm start
```

Run tests:

```bash
npm test
```

## Project Structure

```text
helpdesk-devops/
├── data/
├── public/
│   ├── app.js
│   ├── index.html
│   └── style.css
├── test/
│   └── app.test.js
├── .dockerignore
├── .gitignore
├── Dockerfile
├── Jenkinsfile
├── app.js
├── package.json
├── package-lock.json
└── README.md
```

## Key DevOps Concepts Demonstrated

- Version control using Git.
- Source code hosting using GitHub.
- CI/CD pipeline implementation using Jenkins.
- Automated testing.
- Docker image creation.
- Container deployment.
- Persistent storage using Docker volumes.

## Project Status

**Completed:** The Jenkins pipeline successfully installs dependencies, passes all three tests, builds the Docker image, and deploys the HelpDesk application locally.

## Author

**Anuvindh Thacholi**

GitHub: https://github.com/Anuvindhaws
