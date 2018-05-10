output "bucket_arn" {
  value = "${aws_s3_bucket.picInsight.arn}"
}

output "bucket_id" {
  value = "${aws_s3_bucket.picInsight.id}"
}

output "upload_bucket" {
  value = "${aws_s3_bucket.picInsight.bucket}"
}