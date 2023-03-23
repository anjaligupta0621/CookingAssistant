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
            "https://www.youtube.com/watch?v=urY8nTA_aoQ",  # Video1
            "https://www.youtube.com/watch?v=9PGSlqTP1Sw",  # Video2
            "https://www.youtube.com/watch?v=VbUHSOPP_hk",  # Video3
            "https://www.youtube.com/watch?v=fc1mnFcztqs",  # Video4
            "https://www.youtube.com/watch?v=1fe-2YDpFyw",  # Video5
            "https://www.youtube.com/watch?v=F6Czd-2dwN0",  # Video6
            "https://www.youtube.com/watch?v=ZBwB53EvrRo",  # Video7
            "https://www.youtube.com/watch?v=r4saZD0J_gU",  # Video8
            "https://www.youtube.com/watch?v=jZQT6wnyeD4",  # Video9
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
        print(res.split('\n'))
        resList = res.split('\n')
        # printing result
        print("The extracted string : " + res)
        # split_word = 'Ingredients:'
        # res = description[description.find(split_word)+len(split_word):]
        # print('Result',res)
        return {
            'resultStatus': 'SUCCESS',
            'description': resList
        }


