Copyright 2019 SER401 Project 14 Team - All Rights Reserved

Team Members: 
- RAYMOND ACEVEDO
- SHAWN WEINER
- CHRISTOPHER SALAZAR
- ROBERT PILLITTERI
- SHELTON LACY 

Unauthorized copying of this file, via any medium is strictly prohibited
Proprietary and confidential


# mathapp_backend
 Backend Development for mathapp ASU Capstone Project
 

 Generate API Docs:
 - apidoc -i /routes -o /doc
 - Sample Instructors route endpoint documented as an example for the rest of the coders.
 
# Requirements
 - Node v10.15.3
 - NPM v6.4.1
 - MySQL (current)
 - Apache Ant (optional for ant build scripts) v1.10.5 
   - Not needed for deployed instance
 - Java SE 1.8.0_202
   - Not needed for deployed instance

 # Installation
 1. Install MySQL
 2. Create a database on MySQL for use (needs to be done manually, app won't do it for you)
 1. Download source code -
 2. For local development copy .env-sample to .env and update the environment variables located there
 3. For AWS Deployment, use the ant aws command in the base directory - this will assemble the correct package for uploading to AWS Elastic Beanstalk under aws/mathapp.zip - Just upload this zip file. 
    1. Review the .env_sample file - I've adjusted the files to use the default RDS_ environment variables supplied by Elastic Beanstalk
 4. ** TODO ** Configure docker container build script for completely managed local dev environment.
 5. In root directory type the following commands:
    1. npm install
    2. npm start
 6. Application will listen on port indicated by the environment variable PORT or by default 8000
 
 
