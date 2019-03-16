# EnergyContract
Projeto utilizando .NET Core 2, EF Core, Angular7 e SQL Server database


## Projeto Back-End

- Abra a solution usando o Visual Studio 2017

- Configure a "DevConnection" no arquivo appsettings.json (localizado no projeto EnergyContractCrud.API)

- Defina o projeto "EnergyContractCrud.API" como StartUp Project, e execute.

#### Comandos - Entity Framework
Abra o Packager Manager Console, selecione o projeto "EnergyContractCrud.Infrastructure", e execute o seguinte comando:

Update-Database

(Para criar o migration - caso não exista - execute o comando: Add-Migration "Create")


## Projeto Front-End

- Execute os comandos:

npm install

npm install -g @angular/cli

Para executar o projeto, execute o comando: ng serve -o

------------------------------------------------------------------------------------

# EnergyContract
Project using .NET Core 2, EF Core, Angular7 and SQL Server database

## Back-End Project

### To register a new user:

- Open the solution using Visual Studio 2017.

- Configure the "DevConnection" on appsettings.json file (EnergyContractCrud.API project)

- Set the "EnergyContractCrud.API" project as StartUp Project, and execute.

### Entity Framework Commands
Open the Packager Manager Console, select the project "EnergyContractCrud.Infrastructure", and execute the command:

Update-Database

(To create migration - if don't exists - execute the commando: Add-Migration "Create")

------------------------------------------------------------------------------------

## Front-End Project

- Execute the commands:

npm install

npm install -g @angular/cli

To execute the project, execute: ng serve -o
