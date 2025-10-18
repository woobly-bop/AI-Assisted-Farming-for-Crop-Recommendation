"""
crop_recommendation.py

Simple wrapper to load the pipeline and produce predictions.
Used by the Flask API.
"""

import os
import joblib
import numpy as np

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
MODELS_DIR = os.path.join(ROOT, 'backend', 'models') if os.path.isdir(os.path.join(ROOT, 'backend', 'models')) else os.path.join(ROOT, 'models')

MODEL_PATH = os.path.join(MODELS_DIR, 'crop_model.pkl')

def load_model(path=MODEL_PATH):
    if not os.path.exists(path):
        raise FileNotFoundError(f"Crop model not found at {path}. Train the model first.")
    return joblib.load(path)

def predict(input_dict, model=None):
    """
    input_dict example:
    {"N":90,"P":40,"K":40,"temperature":25,"humidity":80,"ph":6.5,"rainfall":200}
    """
    if model is None:
        model = load_model()
    numeric_order = ['N','P','K','temperature','humidity','ph','rainfall']
    X = [[input_dict.get(f, None) for f in numeric_order]]
    pred = model.predict(X)[0]
    # Optionally return probabilities if classifier supports it
    proba = None
    try:
        proba = model.predict_proba(X).tolist()
    except Exception:
        proba = None
    return {'prediction': pred, 'probabilities': proba}
