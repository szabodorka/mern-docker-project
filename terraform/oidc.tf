resource "aws_iam_openid_connect_provider" "github" {
  url = "https://token.actions.githubusercontent.com"
  client_id_list   = ["sts.amazonaws.com"]
  thumbprint_list  = ["6938fd4d98bab03faadb97b34396831e3780aea1", "1c58a3a8518e8759bf075b76b2e8f1ba34d5f2c0"]
}

data "aws_iam_policy_document" "gh_oidc_trust" {
  statement {
    actions = ["sts:AssumeRoleWithWebIdentity"]
    effect  = "Allow"
    principals {
      type        = "Federated"
      identifiers = [aws_iam_openid_connect_provider.github.arn]
    }
    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:aud"
      values   = ["sts.amazonaws.com"]
    }
    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:sub"
      values   = ["repo:${var.github_owner}/${var.github_repo}:ref:refs/heads/main"]
    }
  }
}

resource "aws_iam_role" "gh_actions" {
  name               = "gh-actions-mern-docker"
  assume_role_policy = data.aws_iam_policy_document.gh_oidc_trust.json
}

resource "aws_iam_role_policy_attachment" "gh_admin" {
  role       = aws_iam_role.gh_actions.name
  policy_arn = "arn:aws:iam::aws:policy/AdministratorAccess"
}