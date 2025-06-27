import { Calendar, Views, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";

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
    title: "10:00 AM – Reminder 1",
    start: new Date(2025, 5, 25, 10, 0),
    end: new Date(2025, 5, 25, 11, 0),
    className: "event-blue",
    allDay: false,
  },
  {
    title: "2:00 PM – Reminder 2",
    start: new Date(2025, 5, 27, 14, 0),
    end: new Date(2025, 5, 27, 15, 0),
    className: "event-green",
    allDay: false,
  },
];

export default function CalendarComponent() {
  return (
    <div className="w-full bg-white shadow-lg rounded-2xl p-6 border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Calendar Overview</h2>
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
