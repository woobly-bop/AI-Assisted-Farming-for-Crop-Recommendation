import os
import joblib
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.pipeline import Pipeline
from sklearn.metrics import accuracy_score, mean_squared_error
from data_preprocessing import build_crop_pipeline, build_yield_pipeline

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
DATA_DIR = os.path.join(ROOT, 'backend', 'data')
MODELS_DIR = os.path.join(ROOT, 'backend', 'models')
os.makedirs(MODELS_DIR, exist_ok=True)

# ----------------- Crop Recommendation -----------------
def train_crop_model():
    df = pd.read_csv(os.path.join(DATA_DIR, 'crop_data.csv'))
    numeric = ['N','P','K','temperature','humidity','ph','rainfall']
    categorical = []
    X = df[numeric + categorical]
    y = df['Crop']
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

    pipeline = Pipeline([
        ('preprocessor', build_crop_pipeline(numeric, categorical)),
        ('classifier', RandomForestClassifier(n_estimators=200, random_state=42, n_jobs=-1))
    ])
    pipeline.fit(X_train, y_train)
    preds = pipeline.predict(X_test)
    print("Crop Recommendation Accuracy:", accuracy_score(y_test, preds))
    joblib.dump(pipeline, os.path.join(MODELS_DIR, 'crop_model.pkl'))
    print("Crop model saved!")

# ----------------- Yield Prediction -----------------
def train_yield_model():
    df = pd.read_csv(os.path.join(DATA_DIR, 'yield_data.csv'))
    numeric = ['Area', 'Annual_Rainfall', 'Fertilizer', 'Pesticide']  # adjust based on your CSV
    categorical = ['Crop', 'Season', 'State']  # optional one-hot
    X = df[numeric + categorical]
    y = df['Yield']
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    pipeline = Pipeline([
        ('preprocessor', build_yield_pipeline(numeric, categorical)),
        ('regressor', RandomForestRegressor(n_estimators=200, random_state=42, n_jobs=-1))
    ])
    pipeline.fit(X_train, y_train)
    preds = pipeline.predict(X_test)
    rmse = np.sqrt(mean_squared_error(y_test, preds))
    print("Yield Prediction RMSE:", rmse)
    joblib.dump(pipeline, os.path.join(MODELS_DIR, 'yield_model.pkl'))
    print("Yield model saved!")

# ----------------- Main -----------------
if __name__ == "__main__":
    train_crop_model()
    train_yield_model()
