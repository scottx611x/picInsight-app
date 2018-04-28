# picinsight-lambda: [![codecov](https://codecov.io/gh/scottx611x/picInsight-app/branch/master/graph/badge.svg)](https://codecov.io/gh/scottx611x/picInsight-app)

`picInsight.py` is representitive of an AWS Lambda function that gets triggered on new image uploads to our `pic-insight-upload` S3 bucket, leverages the Rekognition API to get image information, and then outputs said image info into a new S3 bucket (`pic-insight-processed`) for the app to be able to digest later.

<img width="1249" alt="screen shot 2018-04-28 at 10 40 47 am" src="https://user-images.githubusercontent.com/5629547/39397644-e88b8d08-4ad0-11e8-8bfb-17d4938a165d.png">
