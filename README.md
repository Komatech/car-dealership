# 🚗 Car Dealership API

A RESTful API built with **Express** and **TypeScript** for managing a car dealership, using **MongoDB** as the database. The entire application runs inside Docker containers for easy local development.

---

## 🧰 Prerequisites

Ensure the following are installed on your machine:

- [Docker](https://www.docker.com/products/docker-desktop)
- [Docker Compose](https://docs.docker.com/compose/)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Komatech/car-dealership.git
cd car-dealership
```

### 2. Start the App with Docker

```bash
docker-compose up --build
```

This will:
- Build the Express TypeScript app container
- Start the Express API server on `http://localhost:3000`
- Start a MongoDB container with root access

---

## ✅ Health Check

After starting the containers, test the API's health by visiting:

```
http://localhost:3000/api/health
```

You should receive:

```json
{
  "status":true,
  "message":"Development is up and running 🚀"
}
```

---

## 📦 Useful Scripts (inside the container)

```bash
npm run dev     # Start in watch mode with ts-node-dev (development)
npm run compile   # Compile TypeScript to JavaScript
npm start       # Run compiled JavaScript from /dist
```

---

## 🧾 Environment Variables

The following environment variables are set in `docker-compose.yml`:

| Variable           | Description                      |
|--------------------|----------------------------------|
| `NODE_ENV`         | Set to `development`             |
| `PORT`             | API port (default: `3000`)       |
| `SERVICE_NAME`     | Custom service name              |
| `MONGO_URI`        | MongoDB connection string        |
| `AUTH_JWT_SECRET`  | Secret for JWT signing           |

> The MongoDB credentials used are:
> - **Username**: `root`
> - **Password**: `example`
> - **Host**: `mongodb` (Docker internal hostname)

---

## 🛑 Stopping the App

To stop all running containers:

```bash
docker-compose down
```

To also remove volumes:

```bash
docker-compose down -v
```

---

## 📬 Contributions

Feel free to fork this repo, open issues, or submit pull requests to improve functionality or documentation. Contributions are welcome!
