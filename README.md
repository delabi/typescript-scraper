This is the backend of the sugar index application.

It handles
1. Sugar information Scrapper from 3 jumia websites: Kenya, Uganda and Nigeria every 6 hours.
2. Stores the scrapped data in a PostgreSQL database via TypeORM.
3. Type ORM also Generates a REST API that can be used to consume the data.

Steps to run this project after cloning this repository:

1. Run `npm i` command in the project folder to install dependencies
2. Setup database settings inside `data-source.ts` file
3. Run `npm start` commands

The live application is running on https://sugar-scraper.onrender.com/sugars
You will be able to access the api locally using https://localhost:3000/sugars

From there you can access the REST API with information about sugar prices obtained from the Jumia Websites.

The current POSGTRES database is hosted on AWS RDS and the configurations are in the datasource.ts file.
