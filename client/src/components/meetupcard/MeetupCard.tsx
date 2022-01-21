import { Meetups } from "../../models/Events";
interface Props {
  event: Meetups;
}

function EventCard({ event }: Props) {
  return (
    <div>
      <h3>{event.title}</h3>
    </div>
  );
}

export default EventCard;
