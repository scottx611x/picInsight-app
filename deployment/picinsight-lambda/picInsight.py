from __future__ import print_function

import boto3
import json


class RekognitionAggregator(object):
    s3_client = boto3.client('s3')
    rekognition_client = boto3.client("rekognition", "us-east-1")

    def __init__(self, s3_event):
        uploaded_object_key = s3_event['object']['key']
        self.bucket = s3_event['bucket']['name']
        self.uploaded_image = {
            "S3Object": {
                "Bucket": self.bucket,
                "Name": uploaded_object_key,
            }
        }

        self.result_object_key = "{}.json".format(
            uploaded_object_key.split(".")[0]
        )

        self.image_info = self._get_image_info()

    def _results_to_bytes(self):
        return bytes(
            json.dumps(self.image_info),
            'utf-8'
        )

    def upload_results(self):
        self.s3_client.put_object(
            Key="public/processed/{}".format(self.result_object_key),
            Body=self._results_to_bytes(),
            Bucket=self.bucket
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
            Image=self.uploaded_image
        )


def lambda_handler(event, context):
    s3_event = event['Records'][0]['s3']
    RekognitionAggregator(s3_event).upload_results()
