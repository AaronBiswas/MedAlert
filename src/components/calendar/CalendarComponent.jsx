// CalendarComponent.jsx
import { Calendar, Views, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../../index.css"; // Import the Google Calendar styles

import enUS from "date-fns/locale/en-US";

const locales = { "en-US": enUS };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

const events = [
  {
    title: "10:00 AM - Reminder 1",
    start: new Date(2025, 5, 25, 10, 0),
    end: new Date(2025, 5, 25, 11, 0),
    className: "event-blue",
    allDay: false,
  },
  {
    title: "2:00 PM - Reminder 2", 
    start: new Date(2025, 5, 27, 14, 0),
    end: new Date(2025, 5, 27, 15, 0),
    className: "event-green",
    allDay: false,
  },
];

export default function CalendarComponent() {
  return (
    <div className="rounded-lg shadow-sm p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-medium mb-6 text-gray-900 dark:text-white font-['Google_Sans',_'Roboto',_sans-serif]">
        This Week
      </h2>
      <div className="h-[600px] rounded-lg overflow-hidden">
        <Calendar
          localizer={localizer}
          events={events}
          defaultView={Views.MONTH}
          views={["month"]}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "100%" }}
          eventPropGetter={(event) => ({
            className: event.className,
          })}
          formats={{
            eventTimeRangeFormat: () => "",
            timeGutterFormat: (date, culture, localizer) =>
              localizer.format(date, "h:mm A", culture),
          }}
        />
      </div>
    </div>
  );
}