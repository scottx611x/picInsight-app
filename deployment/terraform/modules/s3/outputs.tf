output "processed_bucket_arn" {
  value = "${aws_s3_bucket.picInsight_processed.arn}"
}

output "upload_bucket_arn" {
  value = "${aws_s3_bucket.picInsight_upload.arn}"
}

output "upload_bucket_id" {
  value = "${aws_s3_bucket.picInsight_upload.id}"
}