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

  const missingKeywords = keywords.filter(
    (keyword) => !matchedKeywords.includes(keyword)
  );

  const score = Math.round(
    (matchedKeywords.length / keywords.length) * 100
  );

  return NextResponse.json({
    score,
    matchedKeywords,
    missingKeywords,
    extractedText:
      "PDF uploaded successfully. Real PDF text extraction will be added later.",
    suggestions: [
      "Improve project descriptions",
      "Add more technical skills",
      "Use ATS-friendly keywords",
    ],
  });
}