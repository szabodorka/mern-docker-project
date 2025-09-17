# MERN Docker Project — BullRunners Crypto Portfolio Tracker

Dockerized MERN crypto portfolio tracker with DevOps focus: Docker Compose, multi-env configs, and CI/CD hooks.

## Features

- MERN stack (MongoDB, Express, React, Node.js)
- Dockerized services with `docker-compose`
- .env-driven configuration
- Ready for CI/CD (build & test jobs, image builds)

## Tech Stack

- **Frontend:** React
- **Backend:** Node.js + Express
- **Database:** MongoDB
- **Orchestration:** Docker Compose

## Repository Structure

```bash
.
├─ backend/
│  ├─ src/
│  ├─ Dockerfile
│  └─ package.json
├─ frontend/
│  ├─ src/
│  ├─ Dockerfile
│  └─ package.json
├─ .github/workflows/
├─ docker-compose.yml
├─ .env.example
└─ README.md
```

## Quick Start (Docker)

1. Copy env template and fill values:

```bash
cp .env.example .env
```

2. Build & run:

```bash
docker compose up --build
```
