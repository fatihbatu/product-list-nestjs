# Demo Product List Project

## Overview

This project is a simple application that showcases the interaction between a Next.js frontend, NestJS backend, and a PostgreSQL database.

## Technologies Used

- Frontend: Next.js with TypeScript
- Backend: NestJS REST API
- Database: PostgreSQL (Docker Image)
- Database Manager: PGAdmin

## Frontend Features

- Home Page:
  - Contains buttons to seed data and navigate to the product list page.
- Product List Page:
  - Displays a list of products retrieved from the backend.
  - Includes a button to sort products by price (sorting handled on the backend).
  - Provides options to pin/unpin products.

## Backend Features

- Built with NestJS, the backend consists of a products module.
- Endpoints:
  - POST `/seed`: Seeds data from a local JSON file into the database.
  - DELETE `/seed`: Deletes all data from the database.
  - PUT `/unpin/:id`: Pins a product based on its ID and data on body with key name position.
  - PUT `/unpin/:id`: Unpins a product based on its ID.

## Database Details

- PostgreSQL is used as the database, managed via a Docker image.
- Database Name: productdb
- Default User: postgres
- Default Password: postgres

## Database Manager

- PGAdmin is utilized for managing the PostgreSQL database.
- Default Email: admin@admin.com
- Default Password: pgadmin4

## Environment Variables

Ensure the following environment variables are set:

- `POSTGRES_USER`: PostgreSQL username (e.g., `postgres`).
- `POSTGRES_PASSWORD`: PostgreSQL password (e.g., `postgres`).
- `POSTGRES_DB`: PostgreSQL database name (e.g., `productdb`).
- `PGADMIN_DEFAULT_EMAIL`: Default email for PGAdmin login.
- `PGADMIN_DEFAULT_PASSWORD`: Default password for PGAdmin login.
- `DATABASE_URL`: Connection URL for the PostgreSQL database.

## Running the Project

1. Ensure you have Docker installed on your system.
2. Clone this repository.
3. Set the required environment variables either manually or via an `.env` file.
4. Navigate to the project directory.
5. Run the following command to start the project:
   ```
   docker-compose f- docker-compıse.dev.yml up
   ```
6. Once the containers are up and running, you can access the application at `http://localhost:3001` in your web browser.

## Notes

- Make sure ports `3000` and `5432` are not in use by other applications.
- You may need to wait a few moments for the containers to initialize before accessing the application.
- PGAdmin can be accessed at `http://localhost:5050` in your web browser.

## Contributors

- [Your Name]
- [Your Email]

Feel free to contribute to this project by submitting pull requests or reporting issues!
