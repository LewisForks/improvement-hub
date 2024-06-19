import React, { useState } from 'react';
import Calendar from 'react-calendar';

import 'react-calendar/dist/Calendar.css';
import './calendar.css';

export const CustomCalendar = ({ onDateChange }) => {
    const [date, setDate] = useState(new Date());

    const handleDateChange = date => {
        setDate(date);
        onDateChange(date);
    };

    return (
        <Calendar onChange={handleDateChange} value={date} />
    );
};