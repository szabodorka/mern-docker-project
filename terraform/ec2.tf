data "aws_caller_identity" "me" {}

data "aws_ami" "ubuntu" {
  most_recent = true
  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd-gp3/ubuntu-noble-24.04-amd64-server-*"]
  }
  owners = ["099720109477"]
}

resource "aws_instance" "app" {
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = var.instance_type
  subnet_id              = data.aws_subnets.default.ids[0]
  vpc_security_group_ids = [aws_security_group.ec2_sg.id]
  iam_instance_profile   = aws_iam_instance_profile.ec2_profile.name
  
  tags = {
    Name = "${var.project_name}-server"
  }

  user_data = templatefile("./user_data.sh.tmpl", {
    region           = var.region
    account_id       = data.aws_caller_identity.me.account_id
    repo_frontend    = var.ecr_repo_frontend
    repo_backend     = var.ecr_repo_backend
    coingecko_key    = var.coingecko_key
    mongo_uri        = var.mongo_uri
    project_name     = var.project_name
  })
}

resource "aws_lb_target_group_attachment" "attach" {
  target_group_arn = aws_lb_target_group.tg.arn
  target_id        = aws_instance.app.id
  port             = 80
}