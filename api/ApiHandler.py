from flask_restful import  Resource
from flask import request
from pytube import YouTube
import logging

log = logging.getLogger(__name__)

class VideoUrls(Resource):
    def get(self):
        args = request.args

        # online video urls for cooking videos
        yt_urls = [
            "https://www.youtube.com/watch?v=dSP6L6vGDPs",  # Video1
            "https://www.youtube.com/watch?v=7kwmmK4FhCI",  # Video2
            "https://www.youtube.com/watch?v=Gbuse4WX01I",  # Video3
            "https://www.youtube.com/watch?v=XP41Huw-5H0",  # Video4
            "https://www.youtube.com/watch?v=LwhBS9czmTk",  # Video5
            "https://www.youtube.com/watch?v=bQoIAuwO_v4",  # Video6
            "https://www.youtube.com/watch?v=df_8_BESHrI",  # Video7
            "https://www.youtube.com/watch?v=ptwOwvHxgI8",  # Video8
            "https://www.youtube.com/watch?v=-Bzs5Lhnpu8",  # Video9
            "https://www.youtube.com/watch?v=QA7YfDCmvs8",  # Video10
            "https://www.youtube.com/watch?v=E9bSLVgw0qI",  # Video11
            "https://www.youtube.com/watch?v=6XlMguO9r-M"] # Video12
        return {
            'resultStatus': 'SUCCESS',
            'url': yt_urls
        }
    
class VideoDescription(Resource):
    def post(self):
        # args = request.args
        # print (args)
        video_id = str(request.json['id'])
        video = YouTube("https://www.youtube.com/watch?v=" + video_id)
        print ("Hello from Video Description")
        print ("Video ID: ", video_id)
        description = video.description
        print (description)
        return {
            'resultStatus': 'SUCCESS',
            'description': description
        }


