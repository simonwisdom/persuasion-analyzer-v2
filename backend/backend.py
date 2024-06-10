import os
import json
import logging
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from pymongo import MongoClient
from pymongo.server_api import ServerApi
from bson import json_util
import gridfs
from fetch_profile import fetch_profile_endpoint
from analyze_profile import analyze_profile_endpoint
from chatbot import chatbot_endpoint

app = Flask(__name__)

# Configure logging
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')


@app.route('/fetch-profile', methods=['POST'])
def fetch_profile():
    return fetch_profile_endpoint()

@app.route('/analyze-profile', methods=['POST'])
def analyze_profile():
    return analyze_profile_endpoint()

@app.route('/api/messages', methods=['POST'])
def messages_endpoint():
    return chatbot_endpoint()

if __name__ == '__main__':
    app.run(debug=True)