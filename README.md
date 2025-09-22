# MERN Docker Project — BullRunners Crypto Portfolio Tracker

Dockerized **MERN (MongoDB, Express, React, Node.js)** crypto portfolio tracker application, deployed to AWS using **Terraform** and automated via **GitHub Actions** with OIDC authentication.

## Table of Contents

- [Tech Stack](#-tech-stack)
- [Architecture Overview](#-architecture-overview)
- [Setup Instructions](#-setup-instructions)
  - [1. Prerequisites](#1-prerequisites)
  - [2. Terraform Infrastructure](#2-terraform-infrastructure)
  - [3. GitHub Secrets](#3-github-secrets)
  - [4. CI/CD Workflow](#4-cicd-workflow)
- [Usage](#-usage)
- [Limitations & Notes](#-limitations--notes)
- [License](#-license)

---

## Tech Stack

**Backend**

- ![Node.js](https://img.shields.io/badge/Node.js-43853D?logo=node.js&logoColor=white) Express.js
- ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?logo=mongodb&logoColor=white) MongoDB Atlas
- ![Mongoose](https://img.shields.io/badge/Mongoose-880000?logo=mongoose&logoColor=white) Mongoose ODM

**Frontend**

- ![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB) React + Vite
- ![JavaScript](https://img.shields.io/badge/JavaScript-323330?logo=javascript&logoColor=F7DF1E) Modern ES6+

**Infrastructure**

- ![AWS](https://img.shields.io/badge/AWS-232F3E?logo=amazon-aws&logoColor=FF9900) EC2 + ALB
- ![Terraform](https://img.shields.io/badge/Terraform-7B42BC?logo=terraform&logoColor=white) IaC modules
- ![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white) Docker & Docker Compose
- ![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?logo=github-actions&logoColor=white) CI/CD pipeline with OIDC

---

## Architecture Overview

- **Frontend (React + Nginx)** → served on an EC2 instance, load-balanced through AWS Application Load Balancer
- **Backend (Express API)** → runs as a Docker container on the same EC2 host, accessible under `/api`
- **MongoDB Atlas** → managed cloud database, secured via IP whitelisting
- **Infrastructure** → provisioned with Terraform (EC2 instance, Security Groups, ALB, IAM roles, OIDC)
- **CI/CD** → GitHub Actions builds images, pushes them to ECR, and triggers deployment via SSM

---

## Setup Instructions

### 1. Prerequisites

- AWS account with permissions to create:
  - ECR repositories
  - IAM roles & OIDC provider
  - EC2, Security Groups and ALB
- Terraform `>= 1.5`
- GitHub repository for this project
- MongoDB Atlas cluster (with `MONGO_URI` and whitelisted EC2 Public IP)
- Coingecko API Key (`COINGECKO_KEY`)

---

### 2. Terraform Infrastructure

1. Clone the repo and switch to the terraform folder:

```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>/terraform
```

Create terraform.tfvars file to define sensitive variables:

```hcl
ecr_repo_frontend = "mern-docker-frontend"
ecr_repo_backend = "mern-docker-backend"
mongo_uri = "your-mongodb-uri"
coingecko_key = "your-coingecko-key"
github_owner = "your-github-username"
github_repo = "your-github-repo-name"
```

Initialize and apply:

```bash
terraform init
terraform apply
```

This will create:

- EC2 instance (Ubuntu 24.04, with Docker, AWS CLI, SSM Agent installed)
- IAM role for GitHub OIDC
- Security Groups & ALB

ECR repositories must exist beforehand.

3. GitHub Secrets
   Add the following repository secret from Terraform outputs under Git repository Settings > Secrets and variables > Actions:

   AWS_ROLE_ARN - The ARN of the OIDC role created by Terraform (e.g., arn:aws:iam::<account_id>:role/gh-actions-mern-docker)

4. CI/CD Workflow
   On push to main, GitHub Actions will:
   - Assume the OIDC role in AWS
   - Build backend & frontend Docker images
   - Push them to ECR
   - Trigger SSM command on EC2 > docker compose pull && docker compose up -d.

## Usage

Access the application via the ALB DNS name printed in Terraform outputs.
API base path is /api.

## Limitations & Notes

- Requires existing ECR repositories
- MongoDB Atlas must have ALB/EC2 IP whitelisted
- Single EC2 host – no auto-scaling yet
