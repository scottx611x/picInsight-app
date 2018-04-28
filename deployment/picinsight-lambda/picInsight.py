from __future__ import print_function

import boto3
import json


class RekognitionAggregator(object):

    def __init__(self, s3_event, region="us-east-1"):
        self.s3_client = boto3.client('s3')
        self.rekognition_client = boto3.client("rekognition", region)

        uploaded_object_key = s3_event['object']['key']
        self.uploaded_image = {
            "S3Object": {
                "Bucket": s3_event['bucket']['name'],
                "Name": uploaded_object_key,
            }
        }
        self.processed_bucket = "pic-insight-processed"
        self.result_object_key = "{}-results.json".format(uploaded_object_key)
        
        self.image_info = self._get_image_info()

    def upload_results(self):
        results = bytes(
            json.dumps(self.image_info), 
            'utf-8'
        )
        self.s3_client.put_object(
            Key=self.result_object_key,
            Body=results,
            Bucket=self.processed_bucket
        )

    def _get_image_info(self):
        image_info = {
            "celebrities": self._recognize_celebrities(),
            "labels": self._detect_labels(),
            "faces": self._detect_faces()
        }
        print(image_info)
        return image_info

    def _detect_labels(self, max_labels=7, min_confidence=95):
        return self.rekognition_client.detect_labels(
            Image=self.uploaded_image,
            MaxLabels=max_labels,
            MinConfidence=min_confidence,
        )

    def _detect_faces(self):
        return self.rekognition_client.detect_faces(
            Image=self.uploaded_image,
            Attributes=['ALL']
        )

    def _recognize_celebrities(self):
        return self.rekognition_client.recognize_celebrities(
            Image=self.uploaded_image)


def lambda_handler(event, context):
    s3_event = event['Records'][0]['s3']
    RekognitionAggregator(s3_event).upload_results()

