import { NextResponse } from "next/server";

export async function POST(request: Request) {

  const formData = await request.formData();

  const file = formData.get("resume") as File;

  if (!file) {
    return NextResponse.json({
      error: "No file uploaded",
    });
  }

  const keywords = [
    "html",
    "css",
    "javascript",
    "react",
    "next.js",
    "node.js",
    "python",
    "sql",
    "machine learning",
    "project",
  ];

  const matchedKeywords = [
    "html",
    "css",
    "javascript",
    "react",
    "project",
  ];

  const score = Math.round(
    (matchedKeywords.length / keywords.length) * 100
  );

  return NextResponse.json({
    score: score,

    matchedKeywords: matchedKeywords,

    missingKeywords: keywords.filter(
      (keyword) => !matchedKeywords.includes(keyword)
    ),

    extractedText:
      "PDF uploaded successfully. Real text extraction will be added later.",

    suggestions: [
      "Add more technical skills",
      "Mention project experience clearly",
      "Use more ATS-friendly keywords",
      "Add skills like SQL, Python, and Machine Learning if relevant",
    ],
  });

}