// Zip up python code & reqs into what will get run in the lambda
data "archive_file" "lambda_zip" {
    type        = "zip"
    source_dir  = "${var.lambda_dir}"
    output_path = "lambda.zip"
}

// Lambda function that will do the heavy lifting for our picInsight app
resource "aws_lambda_function" "picInsight_Rekognition" {
  filename         = "${data.archive_file.lambda_zip.output_path}"
  function_name    = "picinsight_upload_handler"
  role             = "${var.picInsight_iam_role_arn}"
  handler          = "picInsight.lambda_handler"
  source_code_hash = "${base64sha256(file(data.archive_file.lambda_zip.output_path))}"
  runtime          = "python3.6"
  timeout          = 10
}

// Trigger Lambda function invocation when our upload bucket gets a new object
resource "aws_s3_bucket_notification" "upload_bucket_trigger" {
  bucket = "${var.bucket_id}"

  lambda_function {
    lambda_function_arn = "${aws_lambda_function.picInsight_Rekognition.arn}"
    events              = ["s3:ObjectCreated:*"]
  }
}

// Allow Upload bucket to trigger lambda function invocation
resource "aws_lambda_permission" "allow_bucket" {
  statement_id  = "AllowExecutionFromS3Bucket"
  action        = "lambda:InvokeFunction"
  function_name = "${aws_lambda_function.picInsight_Rekognition.arn}"
  principal     = "s3.amazonaws.com"
  source_arn    = "${var.bucket_arn}"
}