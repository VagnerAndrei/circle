# Circle
Círculo de Esporte Radicais
<div>
		<h2>Sobre</h2>
		<p>Circle é um Sistema Web para agrupamento de atletas de esportes
		radicais e realização das práticas. Fornecendo para o atleta
		a possibilidade de catalogar sua experiência com o esporte tanto
		individualmente quanto em grupo, além de detalhar a categoria
		esportiva e possuir um meio de registro dos locais de prática Também
		possui um sistema de melhor manobra e gerencia de eventos,
		campeonatos e rankings.</p>
	</div>

## This project was created from the archetype "wildfly-jakartaee-webapp-archetype".
#### JAX-RS
#### SPA

### Steps to installation:
#### Project:
<strong>Run</strong>: "mvn install"
<br/><br/>
#### Database:
Download and install PostgreSQL.<p>
Create a database 'circle' with user and password 'postgres'<p>
<strong>Run</strong>: "mvn flyway:migrate"
<br/><br/>
	
#### Application Server:
Download and start a Wildfly 19 Application Server <p>
<strong>Run</strong>: "mvn wildfly:execute-commands"<p>
<strong>Run</strong>: "mvn wildfly:deploy"<p>
<br/>
To undeploy:<p>
<strong>Run</strong>: "mvn wildfly:undepoy"
