from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import os
import pandas as pd

app = Flask(__name__)
CORS(app)

MODELS_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'models')

# Load trained models
crop_model = joblib.load(os.path.join(MODELS_DIR, 'crop_model.pkl'))
yield_model = joblib.load(os.path.join(MODELS_DIR, 'yield_model.pkl'))

@app.route('/')
def home():
    return jsonify({"message": "AI-Assisted Farming Backend is running!"})

@app.route('/api/recommend-crop', methods=['POST'])
def recommend_crop():
    data = request.get_json()

    # Validate keys
    required_keys = ['N','P','K','temperature','humidity','ph','rainfall']
    for key in required_keys:
        if key not in data:
            return jsonify({"error": f"Missing key: {key}"}), 400

    # Convert to DataFrame
    feature_df = pd.DataFrame([{
        'N': data['N'],
        'P': data['P'],
        'K': data['K'],
        'temperature': data['temperature'],
        'humidity': data['humidity'],
        'ph': data['ph'],
        'rainfall': data['rainfall']
    }])

    # Predict
    pred = crop_model.predict(feature_df)[0]
    return jsonify({"recommended_crop": pred})

@app.route('/api/predict-yield', methods=['POST'])
def predict_yield():
    data = request.get_json()

    # Validate keys
    required_keys = ['Crop','Area','Annual_Rainfall','Fertilizer','Pesticide','Season','State','Crop_Year']
    for key in required_keys:
        if key not in data:
            return jsonify({"error": f"Missing key: {key}"}), 400

    # Convert to DataFrame
    feature_df = pd.DataFrame([{
        'Crop': data['Crop'],
        'Area': data['Area'],
        'Annual_Rainfall': data['Annual_Rainfall'],
        'Fertilizer': data['Fertilizer'],
        'Pesticide': data['Pesticide'],
        'Season': data['Season'],
        'State': data['State'],
        'Crop_Year': data['Crop_Year']
    }])

    # Predict
    pred = yield_model.predict(feature_df)[0]
    return jsonify({"predicted_yield": float(pred)})

if __name__ == "__main__":
    app.run(debug=True)
