# SkyLine

Tenant management learning project.

## Structure

- `backend/` - Spring Boot REST API
- `frontend/` - React + TypeScript + Vite
- `docker-compose.yml` - local container orchestration

## Prerequisites

- Java 21
- Gradle 8.x (or use the Gradle wrapper after it is generated)
- Node.js 20+
- npm
- SQL Server

## Backend

Open `backend/` in IntelliJ and run `SkyLineApplication`.

The health endpoint is:

`GET http://localhost:8080/api/v1/health`

## Frontend

From `frontend/`:

```bash
npm install
npm run dev
```

Then open the URL printed by Vite.

## Database

The backend currently contains SQL Server datasource placeholders in:

`backend/src/main/resources/application.properties`

Update them for your local SQL Server when we add the first database entities.

## Planned development

1. Basic User and Tenant CRUD
2. Authentication and authorization
3. Building and Unit management
4. Lease management
5. Validation and error handling
6. Automated tests
7. CI/CD and Docker releases
8. Observability
9. Async/event-driven features
