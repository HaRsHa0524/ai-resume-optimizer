from flask import Flask, request, jsonify
from flask_cors import CORS
import pdfplumber

app = Flask(__name__)
CORS(app)

@app.route("/analyze", methods=["POST"])
def analyze_resume():

    if "resume" not in request.files:
        return jsonify({
            "error": "No file uploaded"
        })

    file = request.files["resume"]

    text = ""

    with pdfplumber.open(file) as pdf:
        for page in pdf.pages:
            extracted = page.extract_text()

            if extracted:
                text += extracted.lower() + " "

    keywords = [
        "python",
        "sql",
        "machine learning",
        "data analysis",
        "pandas",
        "numpy",
        "react",
        "javascript",
        "project",
        "communication"
    ]

    matched_keywords = []

    for keyword in keywords:
        if keyword in text:
            matched_keywords.append(keyword)

    missing_keywords = [
        keyword for keyword in keywords
        if keyword not in matched_keywords
    ]

    score = round(
        (len(matched_keywords) / len(keywords)) * 100
    )

    return jsonify({
        "score": score,
        "matchedKeywords": matched_keywords,
        "missingKeywords": missing_keywords,
        "suggestions": [
            "Add more technical skills",
            "Improve project descriptions",
            "Use ATS-friendly keywords"
        ]
    })

if __name__ == "__main__":
    app.run(debug=True)