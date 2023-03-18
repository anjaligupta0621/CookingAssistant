import logging
import re

from flask import request
from flask_restful import Resource
from pytube import YouTube

log = logging.getLogger(__name__)


class YoutubeVideoDetails(Resource):
    def get(self):
        args = request.args
        thumbnail_url = ""
        video_title = "Not able to find video title."
        try:
            yt = YouTube(args['url'])
            # caption = yt.captions
            # description = yt.description
            thumbnail_url = yt.thumbnail_url
            video_title = re.sub(r"[^A-Za-z0-9 ]+", "", yt.title)
        except Exception as exc:
            logging.exception(exc)

        return {
            'video_title': video_title,
            'thumbnail_url': thumbnail_url
        }
