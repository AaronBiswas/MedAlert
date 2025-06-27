import React from "react";
import Dashboard from "../components/Dashboard";
import Reminder from "../components/reminder/Reminder";
import Medlist from "../components/medList/Medlist";
import Prescriptions from "../components/Prescriptions";

const Home = () => {
  return (
    <div className="px-8 py-6 space-y-8 bg-gray-50 min-h-screen">
      <Dashboard />
      <div className="flex flex-col md:flex-row gap-6 justify-around">
        <Reminder />
        <Medlist />
      </div>
      <Prescriptions />
    </div>
  );
};

export default Home;
