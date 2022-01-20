import EventCard from "../../components/eventcard/EventCard";
import { Events } from "../../models/Events";

function EventPage() {
  const events: Events[] = [
    {
      name: "Hello",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam, rem?",
    },
  ];
  return (
    <div>
      <ul>
        {events.map((event) => (
          <EventCard event={event} />
        ))}
      </ul>
    </div>
  );
}

export default EventPage;
