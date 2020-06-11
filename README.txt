This project was created from the archetype "wildfly-jakartaee-webapp-archetype".

Steps to installation:

Database:
Download and install Postgresql
Create a database 'circle' with user and password 'postgres'

Run: "mvn flyway:migrate" in '/circle' directory

Application Server:
Download and start a Wildfly 19 Application Server

Run: "mvn wildfly:execute-commands" in '/circle' directory
Run: "mvn wildfly:deploy" in '/circle' directory

Is Ready: Enjoy!
