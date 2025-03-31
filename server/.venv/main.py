from flask import Flask, request, jsonify
import os
from dotenv import load_dotenv
from flask_cors import CORS


load_dotenv()

app = Flask(__name__)
CORS(app, origins='*')


@app.route('/')
def home():
    return 'Hello from Flask!'

@app.route('/api/data', methods=['GET'])
def get_data():
    print(f'Enpoint Reached')
    api_key = os.getenv('API_KEY')

    if api_key:
        return jsonify({"message": "Successfully Retrieved", "source": "API",  'api_key': api_key}), 200
    return jsonify({"error": "No Api key found"}), 404






if __name__ == "__main__":
    app.run(debug=True, port=5000)