import { MeetupContext } from "../../context/MeetupContext";
import { useEffect, useContext } from "react";
import { getSingleMeetup } from "../../services/meetupService";

function MeetupCard() {
  const [context, updateContext] = useContext(MeetupContext);

  async function getMeetup(id: string) {
    const meetupInfo = await getSingleMeetup(id);
    updateContext({ singleMeetup: meetupInfo.meetup });
  }

  useEffect(() => {
    getMeetup(context.singleMeetupId);
  }, []);

  return (
    <div>
      hello
      <h3>{context.singleMeetup.title}</h3>
    </div>
  );
}

export default MeetupCard;
