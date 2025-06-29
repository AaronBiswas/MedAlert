import React, { useEffect, useState } from "react";
import axios from "axios";

const Reminder = () => {
  const [next, setNext] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchReminders = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/data/reminder`, {
        withCredentials: true,
      });

      const now = new Date();
      const today = now.toISOString().split("T")[0];

      const upcoming = res.data
        .map((entry) => {
          const [hourStr, modifier] = entry.time.split(" ");
          let [hour, minute] = hourStr.split(":").map(Number);
          if (modifier === "PM" && hour !== 12) hour += 12;
          if (modifier === "AM" && hour === 12) hour = 0;

          const date = new Date(entry.startDate);
          date.setHours(hour, minute, 0, 0);

          return { ...entry, dateTime: date };
        })
        .filter((r) => {
          const rDay = new Date(r.startDate).toISOString().split("T")[0];
          const notTakenToday = !r.taken?.some(
            (t) => new Date(t).toISOString().split("T")[0] === today
          );
          return r.dateTime > now && rDay === today && notTakenToday;
        })
        .sort((a, b) => a.dateTime - b.dateTime)[0];

      setNext(upcoming || null);
    } catch (err) {
      console.error("Failed to load reminder", err);
    }
  };

  const markAsTaken = async () => {
    if (!next?._id) return;
    setLoading(true);
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/data/mark-taken/${next._id}`,
        {},
        { withCredentials: true }
      );
      await fetchReminders();
      localStorage.setItem("prescription-refresh", Date.now().toString()); // notify Prescriptions
    } catch (err) {
      console.error("Failed to mark as taken", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReminders();
  }, []);

  if (!next) {
    return (
      <div className="card bg-white shadow-lg rounded-2xl w-96 p-4 border border-gray-200 h-[370px] flex items-center justify-center">
        <p className="text-gray-500">No upcoming reminders</p>
      </div>
    );
  }

  const remaining = Math.max(0, (next.dateTime - new Date()) / 60000);
  const hours = Math.floor(remaining / 60);
  const minutes = Math.floor(remaining % 60);

  return (
    <div className="card bg-white shadow-lg rounded-2xl w-96 p-4 border border-gray-200 h-[370px]">
      <div className="card-body space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Medicine Reminder</h2>
        <div>
          <p className="text-sm text-gray-500">Dosage</p>
          <p className="text-base text-gray-700 font-medium">
            {next.medicine} {next.dosage}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Scheduled Time</p>
          <p className="text-base text-gray-700 font-medium">{next.time}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Time Remaining</p>
          <p className="text-base text-gray-700 font-medium">
            {hours} hour {minutes} minutes
          </p>
        </div>
        <div className="card-actions justify-end">
          <button
            className="btn btn-primary btn-sm"
            onClick={markAsTaken}
            disabled={loading}
          >
            {loading ? "Marking..." : "Mark as Taken"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reminder;
