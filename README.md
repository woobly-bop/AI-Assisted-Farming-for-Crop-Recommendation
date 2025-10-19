# 🌾 AI-Assisted Farming for Crop Recommendation

## 📹 Demo Video

<p align="center">
  <a href="https://drive.google.com/file/d/1RZZ6fHhO3pxtRSqvruOcuiy2uNCTfZrC/view?usp=sharing">
    <img src="https://img.shields.io/badge/▶️%20Watch%20Demo-blue?style=for-the-badge" alt="Watch Demo">
  </a>
</p>

An intelligent farming assistant that leverages machine learning to provide data-driven crop recommendations and yield predictions, helping farmers optimize their agricultural practices for better productivity and sustainability.

## 🚀 Features

- **Crop Recommendation**: Analyze soil nutrients (N, P, K), temperature, humidity, pH, and rainfall to suggest the most suitable crops
- **Yield Prediction**: Predict crop yields based on area, rainfall, fertilizer/pesticide usage, season, and location
- **User-Friendly Interface**: Modern React-based web application with intuitive forms and real-time results
- **RESTful API**: Robust Flask backend serving ML predictions
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠 Tech Stack

### Backend
- **Python** - Core language
- **Flask** - Web framework for API
- **Scikit-learn** - Machine learning algorithms
- **Pandas & NumPy** - Data manipulation and analysis
- **Joblib** - Model serialization

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Modern UI components
- **React Hook Form** - Form management
- **Zod** - Schema validation

## 📁 Project Structure

```
AI-Assisted-Farming-for-Crop-Recommendation/
│
├── backend/                          # Python ML backend
│   ├── api/
│   │   └── app.py                    # Flask API endpoints
│   ├── data/                         # Datasets for training
│   ├── models/                       # Trained ML models (.pkl files)
│   ├── notebooks/                    # Jupyter notebooks for experimentation
│   ├── src/                          # Core Python modules
│   │   ├── data_preprocessing.py     # Data cleaning and preprocessing
│   │   ├── train_model.py            # Model training scripts
│   │   ├── crop_recommendation.py    # Crop recommendation logic
│   │   └── yield_prediction.py       # Yield prediction logic
│   ├── requirements.txt              # Python dependencies
│   └── README.md
│
├── frontend/                         # React web application
│   ├── src/
│   │   ├── components/               # Reusable UI components
│   │   ├── pages/                    # Main application pages
│   │   │   ├── CropRecommendation.tsx
│   │   │   └── YieldPrediction.tsx
│   │   └── lib/
│   │       └── api.ts                # API client functions
│   ├── public/                       # Static assets
│   ├── package.json                  # Node.js dependencies
│   └── README.md
│
├── .gitignore                        # Git ignore rules
├── LICENSE                           # Project license
└── README.md                         # This file
```

## 🏁 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 18+
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Ensure models are in place:**
   - Place trained model files (`crop_model.pkl`, `yield_model.pkl`) in the `models/` directory
   - If models don't exist, run training scripts in `src/train_model.py`

5. **Start the Flask server:**
   ```bash
   python api/app.py
   ```
   The API will be available at `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

## 📡 API Endpoints

### Crop Recommendation
**POST** `/api/recommend-crop`

**Request Body:**
```json
{
  "N": 50,
  "P": 50,
  "K": 50,
  "temperature": 25.0,
  "humidity": 70.0,
  "ph": 6.5,
  "rainfall": 100.0
}
```

**Response:**
```json
{
  "recommended_crop": "Rice"
}
```

### Yield Prediction
**POST** `/api/predict-yield`

**Request Body:**
```json
{
  "Crop": "Rice",
  "Area": 10.0,
  "Annual_Rainfall": 1000.0,
  "Fertilizer": 100.0,
  "Pesticide": 50.0,
  "Season": "Kharif",
  "State": "Andhra Pradesh"
}
```

**Response:**
```json
{
  "predicted_yield": 45.67
}
```

## 🎯 Usage

1. Open the web application in your browser
2. For crop recommendation:
   - Fill in soil nutrient levels (N, P, K)
   - Enter climate parameters (temperature, humidity, pH, rainfall)
   - Click "Get Recommendation" to receive AI-powered crop suggestions

3. For yield prediction:
   - Select crop type and farming area
   - Input rainfall, fertilizer, and pesticide usage
   - Choose season and state
   - Click "Predict Yield" to get estimated production

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built for hackathons and agricultural innovation
- Inspired by the need for sustainable farming practices
- Thanks to the open-source ML and web development communities

---

**Made with ❤️ for smarter farming**
