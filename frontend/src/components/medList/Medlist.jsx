import React, { useEffect, useState } from "react";
import axios from "axios";

function Medlist() {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/data/reminder`, {
        withCredentials: true,
      })
      .then((res) => {
        const entries = res.data.map(
          (entry) => `${entry.medicine} – ${entry.time}`
        );
        setMedicines(entries);
      })
      .catch((err) => console.error("Failed to load medicines", err));
  }, []);

  return (
    <div className="card bg-white shadow-lg rounded-2xl w-96 p-4 border border-gray-200 h-[370px]">
      <div className="card-body space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Upcoming Medicines
        </h2>
        <ul className="space-y-2">
          {medicines.map((med, index) => (
            <li
              key={index}
              className="text-base text-gray-700 flex items-center gap-2"
            >
              <span className="w-2 h-2 bg-blue-500 rounded-full" />
              {med}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Medlist;
