resource "aws_cognito_user_pool" "picInsight_user_pool" {
  name = "picInsight_user_pool"
}

resource "aws_cognito_user_pool_client" "picInsight_user_pool_client" {
  name = "picInsight_user_pool_client"
  user_pool_id = "${aws_cognito_user_pool.picInsight_user_pool.id}"
}

resource "aws_cognito_identity_pool" "picInsight_identity_pool" {
  identity_pool_name               = "picinsight identity pool"
  allow_unauthenticated_identities = true

  cognito_identity_providers {
    client_id               = "${aws_cognito_user_pool_client.picInsight_user_pool_client.id}"
    provider_name           = "cognito-idp.${var.region}.amazonaws.com/${aws_cognito_user_pool.picInsight_user_pool.id}"
    server_side_token_check = false
  }
}

resource "aws_cognito_identity_pool_roles_attachment" "main" {
  identity_pool_id = "${aws_cognito_identity_pool.picInsight_identity_pool.id}"

  roles {
    "authenticated" = "${var.picInsight_iam_role_arn}"
    "unauthenticated" = "${var.picInsight_iam_role_arn}"  
  }
}