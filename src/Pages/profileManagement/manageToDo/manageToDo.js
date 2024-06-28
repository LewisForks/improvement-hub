import { Sidebar } from "../../../components/Layout/Sidebar/Sidebar";
import { ToDo } from "../../../components/profileManagement/manageToDo/toDo";
import { Profile } from "../../../components/dashboard/overview/right-section/profile/profile";
import { CustomCalendar } from "../../../components/calendar/calendar";

import React, { useState } from "react";

const ManageToDoPage = () => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (date) => {
    setDate(date);
  };

  return (
    <div className="manage-todo">
      <div className="dashboard-container">
        <Sidebar />
        <main>
          <ToDo selectedDate={date} />
        </main>
        <aside className="right-section">
          <Profile />
          <CustomCalendar onDateChange={handleDateChange} />
        </aside>
      </div>
    </div>
  );
};

export default ManageToDoPage;
