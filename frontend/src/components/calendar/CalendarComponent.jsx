import { Calendar, Views, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState, useEffect } from "react";
import axios from "axios";

const locales = { "en-US": enUS };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

export default function CalendarComponent() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/data/reminder`, { withCredentials: true })
      .then((res) => {
        const reminders = res.data.map((entry) => ({
          title: `${entry.time} – ${entry.medicine}`,
          start: new Date(entry.startDate),
          end: new Date(entry.endDate),
          className: "event-blue",
          allDay: false,
        }));
        setEvents(reminders);
      })
      .catch((err) => console.error("Failed to load reminders", err));
  }, []);

  return (
    <div className="w-full bg-white shadow-lg rounded-2xl p-6 border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Calendar Overview
      </h2>
      <div className="h-[600px] overflow-hidden rounded-md border border-gray-100">
        <Calendar
          localizer={localizer}
          events={events}
          defaultView={Views.MONTH}
          views={["month"]}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "100%", backgroundColor: "white" }}
          eventPropGetter={(event) => ({
            className: event.className,
            style: {
              backgroundColor:
                event.className === "event-blue"
                  ? "#3b82f6"
                  : event.className === "event-green"
                  ? "#10b981"
                  : "#6366f1",
              color: "white",
              borderRadius: "6px",
              padding: "4px 8px",
              fontSize: "0.875rem",
            },
          })}
          formats={{
            eventTimeRangeFormat: () => "",
            timeGutterFormat: (date, culture, localizer) =>
              localizer.format(date, "h:mm a", culture),
          }}
        />
      </div>
    </div>
  );
}
