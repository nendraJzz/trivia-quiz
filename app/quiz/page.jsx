"use client";

import { useState, useEffect } from "react";

const Quiz = () => {
  const questions = [
    { question: "Apa ibu kota Indonesia?", answer: "Jakarta" },
    { question: "Siapa presiden pertama Indonesia?", answer: "Soekarno" },
    {
      question: "Apa nama planet terdekat dengan matahari?",
      answer: "Merkurius",
    },
    { question: "Berapa jumlah provinsi di Indonesia?", answer: "38" },
    { question: "Apa bahasa resmi di Indonesia?", answer: "Bahasa Indonesia" },
    { question: "Siapa penemu telepon?", answer: "Alexander Graham Bell" },
    {
      question: "Apa nama samudra terbesar di dunia?",
      answer: "Samudra Pasifik",
    },
    { question: "Siapa pencipta Facebook?", answer: "Mark Zuckerberg" },
    { question: "Apa simbol kimia untuk air?", answer: "H2O" },
    { question: "Berapa banyak benua di dunia?", answer: "7" },
  ];

  const [isClient, setIsClient] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const handleAnswer = () => {
    if (
      userAnswer.toLowerCase().trim() ===
      questions[currentQuestion].answer.toLowerCase().trim()
    ) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      setUserAnswer("");
    } else {
      setFinished(true);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAnswer();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-300 to-blue-500 flex justify-center items-center py-10">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        {finished ? (
          <div className="text-center">
            <h2 className="text-3xl font-semibold mb-4 text-blue-600">
              Quiz Selesai!
            </h2>
            <p className="text-lg text-gray-700">
              Skor Anda: {score} / {questions.length}
            </p>
          </div>
        ) : (
          <div>
            <h2 className="text-3xl font-semibold mb-6 text-blue-600">
              Pertanyaan {currentQuestion + 1}
            </h2>
            <p className="mb-6 text-xl text-gray-700">
              {questions[currentQuestion].question}
            </p>
            <input
              type="text"
              className="border-2 border-blue-400 p-3 w-full mb-6 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              placeholder="Jawaban Anda"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              onClick={handleAnswer}
              className="bg-blue-500 text-white py-3 w-full rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
