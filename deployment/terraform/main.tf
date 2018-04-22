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
  picInsight_user_arn = "${module.iam.picInsight_user_arn}"
  upload_bucket = "${module.s3.upload_bucket}"
  upload_bucket_arn = "${module.s3.upload_bucket_arn}"
}