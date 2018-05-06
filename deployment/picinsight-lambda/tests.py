import uuid

import mock
import unittest

from picInsight import RekognitionAggregator, lambda_handler


class MockRekognitonClient(object):

    def detect_labels(self, Image=None, MaxLabels=None, MinConfidence=None):
        return {
            'Labels': []
        }

    def detect_faces(self, Image=None, Attributes=None):
        return {
            'FaceDetails': []
        }

    def recognize_celebrities(self, Image=None):
        return {
            'CelebrityFaces': []
        }


class MockS3Client(object):

    def put_object(self, Key=None, Body=None, Bucket=None):
        return None


class RekognitionAggregatorTests(unittest.TestCase):

    def setUp(self):
        self.rekognition_mock = mock.patch(
            "picInsight.RekognitionAggregator.rekognition_client",
            MockRekognitonClient()
        )
        self.s3_mock = mock.patch(
            "picInsight.RekognitionAggregator.s3_client",
            MockS3Client()
        )
        self.rekognition_mock.start()
        self.s3_mock.start()

        self.image_uuid = uuid.uuid4()
        self.uploaded_image_key = "{}.jpg".format(self.image_uuid)
        self.s3_event = {
            "object": {"key": self.uploaded_image_key},
            "bucket": {"name": "test-upload"}
        }

        with mock.patch("boto3.client"):
            self.r_aggregator = RekognitionAggregator(self.s3_event)

    def tearDown(self):
        mock.patch.stopall()

    def test_upload_results(self):
        self.r_aggregator.upload_results()

        self.assertEqual(
            self.r_aggregator.image_info,
            {
                'celebrities': {'CelebrityFaces': []},
                'labels': {'Labels': []},
                'faces': {'FaceDetails': []}
            }
        )

    def test_lambda_handler(self):
        test_event = {
            "Records": [
                {
                    "s3": self.s3_event
                }
            ]
        }
        lambda_handler(test_event, None)

    def test_result_object_key(self):
        self.assertEqual(
            self.r_aggregator.result_object_key,
            "{}.json".format(self.image_uuid)
        )

    def test_uploaded_image(self):
        self.assertEqual(
            self.r_aggregator.uploaded_image,
            {
                "S3Object": {
                    "Bucket": self.s3_event['bucket']['name'],
                    "Name": self.uploaded_image_key,
                }
            }
        )

    def test_processed_bucket(self):
        self.assertEqual(
            self.r_aggregator.processed_bucket,
            "pic-insight-processed"
        )
if __name__ == '__main__':
    unittest.main()
