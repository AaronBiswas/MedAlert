import React from "react";
import Dashboard from "../components/Dashboard";
import Reminder from "../components/reminder/Reminder";
import Medlist from "../components/medList/Medlist";
import Prescriptions from "../components/Prescriptions";

const Home = () => {
  return (
    <div>
      <Dashboard />
      <div>
        <div>
          <Reminder />
        </div>
        <div>
          <Medlist />
        </div>
      </div>
      <Prescriptions />
    </div>
  );
};

export default Home;
