resource "aws_s3_bucket" "picInsight_upload" {
  bucket = "pic-insight-upload"
  tags {
    Name = "picInsight-upload"
  }
}

resource "aws_s3_bucket" "picInsight_processed" {
  bucket = "pic-insight-processed"
  tags {
    Name = "picInsight-processed"
  }
}