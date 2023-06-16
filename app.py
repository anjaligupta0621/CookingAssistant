from flask import Flask, send_from_directory, jsonify
from flask_restful import Api
from flask import request, redirect, url_for, render_template
from api.ApiHandler import VideoUrls
from api.ApiHandler import VideoDescription
from flask_cors import CORS
from flask_cors import cross_origin
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from oauth2client.tools import argparser
import os
import json
import requests
import tarfile
import logging

logging.basicConfig(filename='flask_app.log', level=logging.DEBUG,
                    format=f'%(asctime)s %(levelname)s %(name)s %(threadName)s : %(message)s')
log = logging.getLogger(__name__)

def create_app() -> Flask:
    app = Flask(__name__, static_url_path='', static_folder='frontend/build')
    log.info("Starting Cooking Assist")
    return app

app = create_app()
api = CORS(app)

@app.route("/", defaults={'path': ''})
def serve(path):
    return send_from_directory('frontend/build', 'index.html')

@app.route("/avplayer/<id>")
def serveAV(id):
    return send_from_directory('frontend/build', 'index.html')

@app.route("/instructions")
def serveInstr():
    return send_from_directory('frontend/build', 'index.html')

@app.route("/api/yturls", methods=["GET"])
def VideoUrls():
    """GET in server"""
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
    
    response = jsonify({
        'resultStatus': 'SUCCESS',
        'url': yt_urls
    })
    # Enable Access-Control-Allow-Origin
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

@app.route("/api/getingredients", methods=["POST"])
@cross_origin()
def VideoDescription():
    api_key = "AIzaSyBg-3GkQ_eQJkc3ncJ4TxzQQEYx2JSukM4"
    video_id = str(request.json['id'])
    youtube = build('youtube', 'v3', developerKey=api_key)
   
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

        response = jsonify({
            'resultStatus': 'SUCCESS',
            'description': resList
        })

        return response

    except HttpError as e:
        print(f'An HTTP error {e.resp.status} occurred:\n{e.content}')
        print ("Video ID: ", video_id)

# api.add_resource(VideoUrls, '/api/yturls')
# api.add_resource(VideoDescription, '/api/getingredients')