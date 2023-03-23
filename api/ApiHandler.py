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
            "https://www.youtube.com/watch?v=XP41Huw-5H0",  # Video1
            "https://www.youtube.com/watch?v=9PGSlqTP1Sw",  # Video2
            "https://www.youtube.com/watch?v=VbUHSOPP_hk",  # Video3
            "https://www.youtube.com/watch?v=NrYmeJSNmVU",  # Video4
            "https://www.youtube.com/watch?v=1fe-2YDpFyw",  # Video5
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
        sub1 = "Ingredients:"
        sub2 = "Method:"
        # getting index of substrings
        idx1 = description.index(sub1)
        idx2 = description.index(sub2)
        
        res = ''
        # getting elements in between
        for idx in range(idx1 + len(sub1) + 1, idx2):
            res = res + description[idx]
 
        # printing result
        print("The extracted string : " + res)
        # split_word = 'Ingredients:'
        # res = description[description.find(split_word)+len(split_word):]
        # print('Result',res)
        return {
            'resultStatus': 'SUCCESS',
            'description': res
        }


