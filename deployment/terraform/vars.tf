variable "region" {
  description = "The AWS region to use"
  default     = "us-east-1"
}

variable "aws_credentials_profile" {
  description = "Entry within ~/.aws/credentials to fetch creds from"
  default = "scottx611x@gmail.com"
}