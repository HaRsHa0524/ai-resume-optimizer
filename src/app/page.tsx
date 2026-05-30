"use client";

import { useState } from "react";

export default function Home() {

  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [score, setScore] = useState<number | null>(null);

  const [loading, setLoading] = useState(false);

  const [suggestions, setSuggestions] =
    useState<string[]>([]);

  const [resumeText, setResumeText] = useState("");

  const [matchedKeywords, setMatchedKeywords] =
    useState<string[]>([]);

  const [missingKeywords, setMissingKeywords] =
    useState<string[]>([]);

  const analyzeResume = async () => {

    if (!file) return;

    setLoading(true);

    const formData = new FormData();

    formData.append("resume", file);

    const response = await fetch("/api/analyze", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    setScore(data.score);

    setSuggestions(data.suggestions || []);

    setResumeText(data.extractedText || "");

    setMatchedKeywords(data.matchedKeywords || []);

    setMissingKeywords(data.missingKeywords || []);

    setLoading(false);
  };

  const resetAnalysis = () => {

    setFileName("");

    setFile(null);

    setScore(null);

    setSuggestions([]);

    setResumeText("");

    setMatchedKeywords([]);

    setMissingKeywords([]);

  };

  const getStatus = () => {

    if (!score) return "";

    if (score >= 85) {
      return "Excellent Resume";
    }

    if (score >= 70) {
      return "Good Resume";
    }

    return "Needs Improvement";
  };

  const getScoreColor = () => {

    if (!score) return "";

    if (score >= 85) {
      return "bg-green-100";
    }

    if (score >= 70) {
      return "bg-yellow-100";
    }

    return "bg-red-100";
  };

  return (

    <div className="min-h-screen bg-gray-100">

      <nav className="bg-blue-600 text-white p-4 flex justify-between">

        <h1 className="text-xl font-bold">
          ATS Optimizer
        </h1>

        <p>
          AI Resume Analyzer
        </p>

      </nav>

      <div className="flex items-center justify-center mt-10">

        <div className="bg-white p-10 rounded-2xl shadow-xl w-[500px] text-center">

          <h1 className="text-4xl font-bold text-blue-600">
            AI Resume ATS Optimizer
          </h1>

          <p className="mt-3 text-gray-600">
            Upload your resume and get ATS score instantly
          </p>

          <label className="mt-6 flex flex-col items-center">

            <span className="bg-blue-600 text-white px-6 py-3 rounded-xl cursor-pointer hover:bg-blue-700">
              Choose Resume PDF
            </span>

            <input
              type="file"
              accept=".pdf"
              onChange={(e) => {

                const selectedFile = e.target.files?.[0];

                if (selectedFile) {

                  setFileName(selectedFile.name);

                  setFile(selectedFile);

                }

              }}
              className="hidden"
            />

          </label>

          {fileName && (
            <p className="mt-4 text-green-600">
              Uploaded: {fileName}
            </p>
          )}

          <div className="mt-6 flex justify-center gap-4">

            <button
              onClick={analyzeResume}
              disabled={fileName === ""}
              className={`px-6 py-3 rounded-xl text-white ${
                fileName === ""
                  ? "bg-gray-400"
                  : "bg-blue-600"
              }`}
            >
              Analyze Resume
            </button>

            <button
              onClick={resetAnalysis}
              className="bg-red-500 text-white px-6 py-3 rounded-xl"
            >
              Reset
            </button>

          </div>

          {loading && (
            <p className="mt-4 text-blue-600">
              Analyzing Resume...
            </p>
          )}

          {score && (
            <div className={`mt-6 p-4 rounded-xl ${getScoreColor()}`}>

              <h2 className="text-2xl font-bold text-blue-700">
                ATS Score: {score}%
              </h2>

              <p className="mt-2 text-lg text-gray-700">
                {getStatus()}
              </p>

            </div>
          )}

          {suggestions.length > 0 && (

            <div className="mt-6 text-left">

              <h3 className="text-xl font-bold mb-2">
                Suggestions
              </h3>

              <ul className="list-disc pl-5 text-gray-700">

                {suggestions.map((item, index) => (
                  <li key={index}>
                    {item}
                  </li>
                ))}

              </ul>

            </div>
          )}

          {matchedKeywords.length > 0 && (

            <div className="mt-6 text-left">

              <h3 className="text-xl font-bold mb-2">
                Matched Keywords
              </h3>

              <p className="text-green-600">
                {matchedKeywords.join(", ")}
              </p>

            </div>
          )}

          {missingKeywords.length > 0 && (

            <div className="mt-6 text-left">

              <h3 className="text-xl font-bold mb-2">
                Missing Keywords
              </h3>

              <p className="text-red-600">
                {missingKeywords.join(", ")}
              </p>

            </div>
          )}

          {resumeText && (

            <div className="mt-6 text-left">

              <h3 className="text-xl font-bold mb-2">
                Extracted Resume Text
              </h3>

              <div className="bg-gray-100 p-4 rounded-xl max-h-40 overflow-y-auto text-sm">

                {resumeText}

              </div>

            </div>
          )}

          <div className="mt-6 text-left">

            <h3 className="text-xl font-bold mb-2">
              Resume Tips
            </h3>

            <ul className="list-disc pl-5 text-gray-700">

              <li>Keep resume to one page</li>
              <li>Use clear headings</li>
              <li>Add technical skills</li>
              <li>Include project experience</li>
              <li>Use ATS-friendly keywords</li>

            </ul>

          </div>

          <p className="mt-8 text-sm text-gray-500">
            Built using Next.js, React and Tailwind CSS
          </p>

        </div>

      </div>

    </div>
  );
}