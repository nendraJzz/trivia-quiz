"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Home = () => {
  const [name, setName] = useState("");
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      router.push(`/quiz?name=${name}`);
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-300 to-blue-500">
      <div className="fixed font-sans top-4 left-4 right-4 mx-auto w-auto max-w-7xl bg-white border border-gray-300 rounded-lg p-3 shadow-lg">
        <h1 className="text-lg font-bold text-gray-800 text-center">Lihat hasil akhir setelah selesai, dan bagikan hasilmu untuk menantang temanmu!</h1>
      </div>
      <div className="bg-white p-10 rounded-xl shadow-xl w-96 max-w-md">
        <h1 className="text-4xl font-semibold mb-6 text-center text-blue-600">
          Trivia Quiz
        </h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="border-2 border-blue-400 p-3 w-full mb-6 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            placeholder="Masukkan nama Anda"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-3 w-full rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Mulai Quiz
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
