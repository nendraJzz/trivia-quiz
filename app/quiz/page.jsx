"use client";

import { useState, useEffect } from "react";

const Quiz = () => {
  const questions = [
    {
      question: "Apa nama planet terdekat dengan matahari?",
      answer: "Merkurius",
    },
    { question: "Berapa jumlah provinsi di Indonesia?", answer: "38" },
    { question: "Siapa penemu telepon?", answer: "Alexander Graham Bell" },
    { question: "Siapa pencipta Facebook?", answer: "Mark Zuckerberg" },
    { question: "Apa simbol kimia untuk air?", answer: "H2O" },
  ];

  const [isClient, setIsClient] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [shareLink, setShareLink] = useState("");

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
      const baseUrl = window.location.origin;
      const quizLink = `${baseUrl}`;
      setShareLink(quizLink);
      setFinished(true);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAnswer();
    }
  };

  const handleWhatsAppShare = () => {
    const shareText = `Saya baru saja menyelesaikan kuis dan mendapatkan skor ${score} dari ${questions.length} pertanyaan! 

Lihat hasilku dan coba kuis ini di: 
${shareLink}

Tertantang untuk mengalahkan skorku?`;

    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      shareText
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setUserAnswer("");
    setScore(0);
    setFinished(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r p-3 from-blue-300 to-blue-500 flex justify-center items-center py-10">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        {finished ? (
          <div className="text-center">
            <h2 className="text-3xl font-semibold mb-4 text-blue-600">
              Quiz Selesai!
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              Skor Anda: {score} / {questions.length}
            </p>

            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-2">
                Link Hasil Kuis:
              </label>
              <input
                type="text"
                readOnly
                value={shareLink}
                className="w-full p-2 border rounded bg-gray-100 text-sm"
              />
            </div>
            <button
              onClick={handleRetry}
              className="bg-yellow-500 text-white py-3 w-full rounded-lg shadow-md hover:bg-yellow-600 transition duration-300 ease-in-out transform hover:scale-105 mb-4"
            >
              Coba Lagi
            </button>
            <button
              onClick={handleWhatsAppShare}
              className="bg-green-500 text-white py-3 w-full rounded-lg shadow-md hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105 flex justify-center items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="mr-2"
              >
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.149-.173.198-.297.297-.495.099-.198.05-.372-.025-.521-.074-.149-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.041 1.016-1.041 2.479 1.066 2.876 1.215 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              Bagikan Skor ke Teman Lewat WhatsApp
            </button>
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
              className="border-2 border-blue-400 text-black p-3 w-full mb-6 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
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
