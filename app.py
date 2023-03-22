from flask import Flask, send_from_directory
from flask_restful import Api
from api.ApiHandler import VideoUrls
from api.ApiHandler import VideoDescription

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
api = Api(app)

@app.route("/", defaults={'path': ''})
def serve(path):
    return send_from_directory('frontend/build', 'index.html')

api.add_resource(VideoUrls, '/api/yturls')
api.add_resource(VideoDescription, '/api/getingredients')