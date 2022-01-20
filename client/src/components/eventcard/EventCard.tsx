import { Events } from "../../models/Events";
interface Props {
  event: Events;
}

function EventCard({ event }: Props) {
  return (
    <div>
      <h3>{event.name}</h3>
    </div>
  );
}

export default EventCard;
