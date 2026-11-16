
pipeline {
    agent any
    environment {
        IMAGE_NAME = 'helpdesk:latest'
        CONTAINER_NAME = 'helpdesk-app'
        DOCKER = '"C:\\Users\\thach\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker.exe"'
    }
    stages {
        stage('Install Dependencies') {
            steps { bat 'npm install' }
        }
        stage('Run Tests') {
            steps { bat 'npm test' }
        }
        stage('Build Docker Image') {
            steps { bat '%DOCKER% build -t %IMAGE_NAME% .' }
        }
        stage('Deploy Locally') {
            steps {
                bat '%DOCKER% rm -f %CONTAINER_NAME% 2>NUL || exit /b 0'
                bat '%DOCKER% run -d --name %CONTAINER_NAME% -p 3000:3000 -v helpdesk-data:/app/data --restart unless-stopped %IMAGE_NAME%'
            }
        }
    }
    post {
        success { echo 'HelpDesk pipeline completed successfully.' }
        failure { echo 'Pipeline failed. Check the stage logs.' }
    }
}
