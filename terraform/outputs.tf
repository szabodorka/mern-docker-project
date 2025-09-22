output "alb_dns" {
  value = aws_lb.this.dns_name
}

output "github_role_arn" {
  value = aws_iam_role.gh_actions.arn
}