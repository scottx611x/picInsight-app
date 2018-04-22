# terraform

Sets up infrastructure necessary for picInsight app.

## What gets created?
- S3 buckets
  - Upload bucket
  - Processed bucket
- Lambda function
- IAM role

## TODOs:
- [ ] Cognito?

## Getting started
```bash
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