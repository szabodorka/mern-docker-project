variable "region" {
  type = string
  default = "eu-central-1"
}

variable "ecr_repo_frontend" {
  type = string
}

variable "ecr_repo_backend" {
  type = string
}

variable "mongo_uri" {
  type = string
}

variable "project_name" {
  type = string
  default = "mern-docker"
}

variable "my_ip" {
  type = string
}

variable "instance_type" {
  type = string
  default = "t3.small"
}

variable "coingecko_key" {
  type = string
}

variable "github_owner" {
  type = string
}