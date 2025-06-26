# California House Price Prediction

This full-stack project predicts housing prices in California based on input features such as location, median income, and housing attributes. It uses a trained RandomForestRegressor model served via a Flask backend and a React + TypeScript frontend for user interaction.

---

## Features

- Frontend built with React, TypeScript, Tailwind CSS  
- Backend API built with Flask and scikit-learn  
- Model: Random Forest Regressor trained on the California Housing dataset  
- Form validation using Zod and React Hook Form  
- CORS enabled for cross-origin frontend-backend communication  

---

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/your-username/california-house-price-predictor.git
cd california-house-price-predictor

```

---

2. Install & run the Flask backend:

```bash
cd server
python server.py
```

---

3. Install & run the React frontend:

```bach
cd ../client
npm install
npm run dev
```

Sample Prediction Request

```bash
POST /predict
Content-Type: application/json

{
  "longitude": -122.24,
  "latitude": 37.82,
  "housing_median_age": 74,
  "total_rooms": 2453,
  "total_bedrooms": 229,
  "population": 1500,
  "households": 800,
  "median_income": 6.9,
  "<1H OCEAN": 1,
  "INLAND": 0,
  "ISLAND": 0,
  "NEAR BAY": 0,
  "NEAR OCEAN": 0
}
```

---

# Technologies Used

## Frontend:

- React + TypeScript
- Tailwind CSS
- React Hook Form
- Zod
- Axios

## Backend:

- Flask
- Flask-CORS
- scikit-learn
- pandas

## Model:

- RandomForestRegressor (scikit-learn)

---

# Future Improvements

- Support for batch predictions
- Improved model accuracy with hyperparameter tuning
- Dockerization
- Deployment on Vercel (frontend) and Render (backend)
