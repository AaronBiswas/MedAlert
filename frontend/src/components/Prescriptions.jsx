import React from "react";

function Prescriptions() {
  const takenMedicines = [
    "Paracetamol",
    "Amoxicillin",
    "Ibuprofen"
  ];

  const possibleIllness = "Likely viral fever or bacterial infection, based on common use of antipyretics and antibiotics.";

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
