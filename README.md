# HelpDesk – IT Support Ticket Management
Windows-native Node.js + Express app for a Jenkins CI/CD learning project.

## Run locally
Install Node.js 20+ then:
```powershell
npm install
npm test
npm start
```
Open http://localhost:3000

## Docker
```powershell
docker build -t helpdesk:latest .
docker run -d --name helpdesk-app -p 3000:3000 -v helpdesk-data:/app/data helpdesk:latest
```

The Jenkinsfile installs dependencies, runs tests, builds a Docker image and deploys it locally. Configure Jenkins to check out a local bare Git repository. Add authentication and stronger security before using with real support data.
