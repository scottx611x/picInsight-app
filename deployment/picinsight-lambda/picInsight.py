from __future__ import print_function

import boto3

print('Loading function')

s3 = boto3.client('s3')


def lambda_handler(event, context):
    # Get the object from the event and show its content type
    bucket = event['Records'][0]['s3']['bucket']['name']
    print(bucket)
    key = event['Records'][0]['s3']['object']['key']
    print(key)
    detect_labels(bucket, key)


def detect_labels(bucket, key, max_labels=5,
                  min_confidence=95, region="us-east-1"):
    rekognition = boto3.client("rekognition", region)
    response = rekognition.detect_labels(
        Image={
            "S3Object": {
                "Bucket": bucket,
                "Name": key,
            }
        },
        MaxLabels=max_labels,
        MinConfidence=min_confidence,
    )
    print(response["Labels"])
    for label in response["Labels"]:
        print("{Name} - {Confidence}%".format(**label))
