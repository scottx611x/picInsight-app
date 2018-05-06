# terraform

Sets up infrastructure necessary for picInsight app.

## What gets created?
- S3 buckets
  - Upload bucket
  - Processed bucket
- [Lambda function](https://github.com/scottx611x/picInsight-app/tree/master/deployment/picinsight-lambda)
  - S3 bucket upload Lambda trigger
- IAM role
  - IAM Policy
- Cognito Identity Pool

## Getting started
```bash
$ cd picInsight-app/deployment/terraform/
$ terraform init
$ terraform apply 
```

## Removing infrastructure:
```bash
$ terraform destroy
```

## Debugging:
```bash
$ export TF_DEBUG=<TRACE | DEBUG | ERROR>; terraform <command>
