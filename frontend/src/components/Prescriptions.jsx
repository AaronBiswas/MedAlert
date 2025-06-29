import React, { useEffect, useState } from "react";
import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API);

async function getPossibleIllness(meds) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `Analyze the following list of medicines and dosages, and guess the illness or condition:\n\n${meds
    .map((m) => `- ${m.medicine} (${m.dosage})`)
    .join("\n")}\n\nReply in one sentence only.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

function Prescriptions() {
  const [takenMedicines, setTakenMedicines] = useState([]);
  const [possibleIllness, setPossibleIllness] = useState("Loading...");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/data/reminder`, { withCredentials: true })
      .then(async (res) => {
        const meds = res.data
          .filter((entry) => entry.taken && entry.taken.length > 0)
          .map((entry) => ({ medicine: entry.medicine, dosage: entry.dosage }));

        setTakenMedicines(meds.map((m) => `${m.medicine} (${m.dosage})`));

        if (meds.length > 0) {
          const illness = await getPossibleIllness(meds);
          console.log(illness)
          setPossibleIllness(illness);
        } else {
          setPossibleIllness("No medicines marked as taken.");
        }
      })
      .catch((err) => {
        console.error("Error loading data:", err);
        setPossibleIllness("Failed to load.");
      });
  }, []);

  return (
    <div className="card bg-white shadow-md rounded-xl w-full min-h-[300px] p-6 border border-gray-200">
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">Your Prescriptions</h2>

        <div className="space-y-2">
          <p className="text-sm text-gray-500">Medicines Taken</p>
          <ul className="list-disc list-inside text-base text-gray-700 ml-2">
            {takenMedicines.map((med, index) => (
              <li key={index}>{med}</li>
            ))}
          </ul>
        </div>

        <div className="space-y-1">
          <p className="text-sm text-gray-500">Possible Illness</p>
          <div className="bg-gray-100 p-3 rounded-md text-gray-700 text-base border border-gray-300">
            {possibleIllness}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Prescriptions;
