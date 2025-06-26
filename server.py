from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import pickle

app = Flask(__name__)
CORS(app) 

# Load model and scaler
with open("./models/model.pkl", "rb") as f:
    grid_search = pickle.load(f)

with open("./models/scaler.pkl", "rb") as f:
    scaler = pickle.load(f)

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()

    try:
        custom_house = pd.DataFrame([data])
        custom_house['bedroom_ratio'] = custom_house['total_bedrooms'] / custom_house['total_rooms']
        custom_house['household_rooms'] = custom_house['total_rooms'] / custom_house['households']
        custom_house_scaled = scaler.transform(custom_house)
        predicted_price = grid_search.predict(custom_house_scaled)

        return jsonify({
            "predicted_price": round(predicted_price[0], 2)
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)
