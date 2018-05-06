provider "aws" {
  region  = "${var.region}"
  profile = "${var.aws_credentials_profile}"
}

module "s3" {
  source  = "./modules/s3"
}

module "iam" {
  source  = "./modules/iam" 
  processed_bucket_arn = "${module.s3.processed_bucket_arn}"
  upload_bucket_arn = "${module.s3.upload_bucket_arn}"
}

module "lambda" {
  source  = "./modules/lambda"
  picInsight_iam_role_arn = "${module.iam.picInsight_iam_role_arn}"
  upload_bucket_id = "${module.s3.upload_bucket_id}"
  upload_bucket_arn = "${module.s3.upload_bucket_arn}"
}

module "cognito" {
  source = "./modules/cognito"
  region = "${var.region}"
  picInsight_iam_role_arn = "${module.iam.picInsight_iam_role_arn}"
}

resource "local_file" "aws_data" {
  filename = "../../aws_data.json"
  content  = <<EOF
{
  "identityPoolId": "${module.cognito.picInsight_identity_pool_id}", 
  "region": "${var.region}", 
  "uploadBucket": "${module.s3.upload_bucket}"
}
EOF

}