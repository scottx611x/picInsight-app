resource "aws_s3_bucket" "picInsight" {
  bucket = "pic-insight"
  tags {
    Name = "picInsight"
  }
}