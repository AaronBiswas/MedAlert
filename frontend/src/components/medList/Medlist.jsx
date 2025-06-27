import React from "react";

function Medlist() {
  const medicines = [
    "Paracetamol – 2:00 PM",
    "Amoxicillin – 6:00 PM",
    "Vitamin D – 9:00 PM"
  ];

  return (
    <div className="card bg-white shadow-lg rounded-2xl w-96 p-4 border border-gray-200 h-[370px]">
      <div className="card-body space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Upcoming Medicines</h2>
        <ul className="space-y-2">
          {medicines.map((med, index) => (
            <li key={index} className="text-base text-gray-700 flex items-center gap-2">
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
