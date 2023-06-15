from flask_restful import  Resource
from flask import request
from flask import Flask, jsonify

from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from oauth2client.tools import argparser
from flask_cors import cross_origin
# import youtube_dl

# from pytube import YouTube

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
        
        response = flask.jsonify({
            'resultStatus': 'SUCCESS',
            'url': yt_urls
        })

        return response
        # return {
        #     'resultStatus': 'SUCCESS',
        #     'url': yt_urls
        # }
    
class VideoDescription(Resource):
    def post(self):
        # args = request.args
        # print (args)
        api_key = "AIzaSyBg-3GkQ_eQJkc3ncJ4TxzQQEYx2JSukM4"
        video_id = str(request.json['id'])
        youtube = build('youtube', 'v3', developerKey=api_key)
        # url = 'https://www.youtube.com/watch?v=' + video_id
        # with youtube_dl.YoutubeDL() as ydl:
        #     info_dict = ydl.extract_info(url, download=False)
        #     description = info_dict.get('description', None)
        # video_url = 'https://www.youtube.com/watch?v=' + video_id
        # ydl = youtube_dl.YoutubeDL()

        # fetch the video details
        # video = ydl.extract_info(video_url, download=False)
        # video = YouTube("https://www.youtube.com/watch?v=" + video_id)
        # print("The video from backend", video)
        # print("The video from backend", video.author)
        # print ("Hello from Video Description")
        try:
            # Call the YouTube API to retrieve the video resource
            video_response = youtube.videos().list(
                part='snippet',
                id=video_id
            ).execute()

            # Retrieve the video description from the response
            description = video_response['items'][0]['snippet']['description']

            # Print the video description
            print(description)
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
            response = flask.jsonify({
                'resultStatus': 'SUCCESS',
                'description': resList
            })

            return response
            # return {
            #     'resultStatus': 'SUCCESS',
            #     'description': resList
            # }

        except HttpError as e:
            print(f'An HTTP error {e.resp.status} occurred:\n{e.content}')
            print ("Video ID: ", video_id)
        # description = video.description
        



