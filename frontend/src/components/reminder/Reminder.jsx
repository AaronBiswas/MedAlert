import React from "react";

function Reminder() {
  return (
    <div className="card bg-white shadow-lg rounded-2xl w-96 p-4 border border-gray-200 h-[370px]">
      <div className="card-body space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Medicine Reminder</h2>
        <div>
          <p className="text-sm text-gray-500">Dosage</p>
          <p className="text-base text-gray-700 font-medium">Paracetamol 500mg</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Scheduled Time</p>
          <p className="text-base text-gray-700 font-medium">02:00 PM</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Time Remaining</p>
          <p className="text-base text-gray-700 font-medium">1 hour 30 minutes</p>
        </div>
        <div className="card-actions justify-end">
          <button className="btn btn-primary btn-sm">Mark as Taken</button>
        </div>
      </div>
    </div>
  );
}

export default Reminder;
