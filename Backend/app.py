from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

@app.route("/", methods=["GET"])
def home():
    return "TruthTag Backend is Live 🚀"

@app.route("/check", methods=["POST"])
def check_job():
    data = request.json

    job = data.get("job", "").lower()
    company = data.get("company", "").lower()
    email = data.get("email", "").lower()

    risk = 0
    reasons = []

    scam_keywords = [
        "whatsapp", "telegram", "registration fee",
        "pay fee", "instant hiring", "no interview",
        "work from home", "earn money fast"
    ]

    for word in scam_keywords:
        if word in job:
            risk += 20
            reasons.append(f"Suspicious keyword found: {word}")

    if email.endswith("@gmail.com") or email.endswith("@yahoo.com"):
        risk += 15
        reasons.append("Free email domain used")

    try:
        website = "https://" + company.replace(" ", "") + ".com"
        requests.get(website, timeout=5)
    except:
        risk += 15
        reasons.append("Company website not found")

    if risk < 30:
        status = "🟢 Safe"
    elif risk < 60:
        status = "🟡 Suspicious"
    else:
        status = "🔴 Scam"

    return jsonify({
        "status": status,
        "risk": risk,
        "reasons": reasons
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)
