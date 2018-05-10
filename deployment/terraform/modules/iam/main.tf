resource "aws_iam_role" "picInsight_iam_role" {
  name = "picInsight-iam-role"
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": "AllowLambdaAccess"
    },
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "s3.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": "AllowS3Access"
    },
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "rekognition.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": "AllowRekognitionAccess"
    },
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "cognito-identity.amazonaws.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy" "picInsight_iam_role_policy" {
  name = "picInsight-iam-role-policy"
  role = "${aws_iam_role.picInsight_iam_role.id}"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "s3:PutObject", 
        "s3:GetObject",
        "s3:ListBucket"
      ],
      "Effect": "Allow",
      "Resource": [
        "${var.bucket_arn}", 
        "${var.bucket_arn}/*"
      ]
    },
    {
      "Action": [
        "rekognition:*"
      ],
      "Effect": "Allow",
      "Resource": "*"
    },
    {
      "Action": [
        "cognito-identity:*"
      ],
      "Effect": "Allow",
      "Resource": "*"
    }
  ]
}
EOF
}