"use client";

import { useState } from "react";

export default function Home() {

  const [fileName, setFileName] = useState("");
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const [suggestions, setSuggestions] =
    useState<string[]>([]);

  const analyzeResume = () => {

    setLoading(true);

    setTimeout(() => {

      const randomScore =
        Math.floor(Math.random() * 41) + 60;

      setScore(randomScore);

      setSuggestions([
        "Add more technical skills",
        "Improve project descriptions",
        "Use ATS-friendly keywords",
      ]);

      setLoading(false);

    }, 2000);
  };

  const resetAnalysis = () => {

    setFileName("");
    setScore(null);
    setSuggestions([]);

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

          <input
            type="file"
            accept=".pdf"
            onChange={(e) => {

              const file = e.target.files?.[0];

              if (file) {
                setFileName(file.name);
              }

            }}
            className="mt-6"
            key={fileName}
          />

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