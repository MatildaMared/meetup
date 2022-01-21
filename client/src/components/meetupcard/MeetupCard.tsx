import { MeetupContext } from "../../context/MeetupContext";
import { useEffect, useContext } from "react";
import { getSingleMeetup } from "../../services/meetupService";
import styled from "styled-components";

function MeetupCard() {
  const [context, updateContext] = useContext(MeetupContext);

  async function getMeetup(id: string) {
    const meetupInfo = await getSingleMeetup(id);
    updateContext({ singleMeetup: meetupInfo.meetup });
    console.log("hej äntligen har du lite info 🦄");
  }

  useEffect(() => {
    getMeetup(context.singleMeetupId);
  }, []);

  return (
    <div>
      {context.singleMeetup && (
        <div>
          <img src={context.singleMeetup.imgUrl} alt="" />
          <h3>{context.singleMeetup.title}</h3>
        </div>
      )}
    </div>
  );
}

export default MeetupCard;

export const StyledCard = styled.div`
  background-color: lightblue;
`;
