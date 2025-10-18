"""
yield_prediction.py

Wrapper to load yield model and produce predictions.
"""

import os
import joblib

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
MODELS_DIR = os.path.join(ROOT, 'backend', 'models') if os.path.isdir(os.path.join(ROOT, 'backend', 'models')) else os.path.join(ROOT, 'models')

MODEL_PATH = os.path.join(MODELS_DIR, 'yield_model.pkl')

def load_model(path=MODEL_PATH):
    if not os.path.exists(path):
        raise FileNotFoundError(f"Yield model not found at {path}. Train the model first.")
    return joblib.load(path)

def predict(input_dict, model=None):
    """
    input_dict example:
    {"crop":"rice","area":2.5,"rainfall":250,"temperature":28}
    """
    if model is None:
        model = load_model()
    # order numeric/categorical as used in training
    numeric_order = ['area','rainfall','temperature']
    categorical_order = ['crop'] if 'crop' in model.named_steps['preprocessor'].transformers_[1][2] else []
    X = []
    row = []
    for f in numeric_order:
        row.append(input_dict.get(f, None))
    # include crop as categorical if model expects it
    if 'crop' in input_dict and categorical_order:
        row.append(input_dict.get('crop'))
    X.append(row)
    pred = model.predict(X)[0]
    return {'predicted_yield': float(pred)}
