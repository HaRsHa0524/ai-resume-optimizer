import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const file = formData.get("resume") as File;

    if (!file) {
      return NextResponse.json({
        error: "No file uploaded",
      });
    }

    const arrayBuffer = await file.arrayBuffer();

    const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");

    const pdf = await pdfjs.getDocument({
      data: arrayBuffer,
      disableWorker: true,
    }).promise;

    let resumeText = "";

    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
      const page = await pdf.getPage(pageNumber);
      const content = await page.getTextContent();

      const pageText = content.items
        .map((item: any) => item.str)
        .join(" ");

      resumeText += pageText + " ";
    }

    const text = resumeText.toLowerCase();

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

    const matchedKeywords = keywords.filter((keyword) =>
      text.includes(keyword)
    );

    const missingKeywords = keywords.filter(
      (keyword) => !text.includes(keyword)
    );

    const score = Math.round(
      (matchedKeywords.length / keywords.length) * 100
    );

    return NextResponse.json({
      score,
      matchedKeywords,
      missingKeywords,
      extractedText: resumeText,
      suggestions: [
        "Add more job-related keywords",
        "Improve project descriptions",
        "Mention technical skills clearly",
        "Use ATS-friendly formatting",
      ],
    });
  } catch (error) {
    return NextResponse.json({
      score: 0,
      matchedKeywords: [],
      missingKeywords: [],
      extractedText: "PDF reading failed. Please try another PDF.",
      suggestions: [
        "Upload a text-based PDF, not a scanned image PDF",
        "Use a simple ATS-friendly resume format",
      ],
    });
  }
}