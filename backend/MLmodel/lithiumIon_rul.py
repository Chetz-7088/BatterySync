import pickle
import json
import numpy as np
import sys
import os

try:
    MODEL_PATH = os.path.abspath(
        os.path.join(os.path.dirname(__file__), "lithium_ion.pkl")
    )
    with open(MODEL_PATH, "rb") as file:
        model = pickle.load(file)

except Exception as e:
    print(json.dumps({"error": f"Model loading failed: {str(e)}"}))
    sys.exit(1)

try:
    SCALER_X_PATH = os.path.abspath(
        os.path.join(os.path.dirname(__file__), "scaler_x.pkl")
    )
    with open(SCALER_X_PATH, "rb") as file:
        scaler_X = pickle.load(file)

except Exception as e:
    print(json.dumps({"error": f"Input scaler loading failed: {str(e)}"}))
    sys.exit(1)

try:
    SCALER_Y_PATH = os.path.abspath(
        os.path.join(os.path.dirname(__file__), "scaler_y.pkl")
    )
    with open(SCALER_Y_PATH, "rb") as file:
        scaler_Y = pickle.load(file)

except Exception as e:
    print(json.dumps({"error": f"Target scaler loading failed: {str(e)}"}))
    sys.exit(1)


def predict_rul(
    discharge_time,
    decrement,
    max_voltage_discharge,
    min_voltage_charge,
    time_at_4_15v,
    time_constant_current,
    charging_time,
):
    try:
        discharge_time = float(discharge_time)
        decrement = float(decrement)
        max_voltage_discharge = float(max_voltage_discharge)
        min_voltage_charge = float(min_voltage_charge)
        time_at_4_15v = float(time_at_4_15v)
        time_constant_current = float(time_constant_current)
        charging_time = float(charging_time)
    except ValueError:
        print(json.dumps({"error": "Invalid input values"}))
        sys.exit(1)

    input_data = np.array(
        [
            [
                discharge_time,
                decrement,
                max_voltage_discharge,
                min_voltage_charge,
                time_at_4_15v,
                time_constant_current,
                charging_time,
            ]
        ]
    )
    input_scaled = scaler_X.transform(input_data)

    try:
        predicted_rul_scaled = model.predict(input_scaled)
        predicted_rul_scaled_reshaped = predicted_rul_scaled.reshape(-1, 1)
        predicted_rul = scaler_Y.inverse_transform(predicted_rul_scaled_reshaped)
        print(json.dumps({"predictedRUL": round(float(predicted_rul[0][0]), 10)}))
    except Exception as e:
        print(json.dumps({"error": f"Prediction error: {str(e)}"}))
        sys.exit(1)


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    try:
        if len(sys.argv) == 8:
            predict_rul(*sys.argv[1:])
        else:
            print(json.dumps({"error": "Invalid arguments"}))
    except Exception as e:
        print(json.dumps({"error": f"Unexpected script error: {str(e)}"}))
        sys.exit(1)
